import type { OrganisationSettingsFragment } from "sanity/generated/graphql";
import type { ProductShopifySanity } from "@lib/fetches/productShopifySanity";
import { getHtmlLang, localizeHref, type Locale } from "@lib/shopify/locale";
import { isSingleDefaultVariant } from "@lib/shopify/variants";
import { resolveSanityHref } from "./resolve";

export type JsonLdSchema = Record<string, unknown>;

// Strips null/empty branches; validators read `"name": null` as an assertion the value is empty.
function compact(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value.map(compact).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => [key, compact(item)] as const)
      .filter(([, item]) => item !== undefined);

    // A node carrying nothing but its @type describes nothing; an @id reference still points somewhere.
    if (!entries.length) return undefined;
    if (entries.length === 1 && entries[0]![0] === "@type") return undefined;

    return Object.fromEntries(entries);
  }

  if (value === null || value === "") return undefined;
  return value;
}

const absoluteUrl = (path: string | null | undefined, site: URL | undefined) =>
  path ? new URL(path, site).href : undefined;

/** Every page carries the organisation node, so page schemas point at it by @id rather than repeating it. */
const organisationId = (site: URL | undefined) => absoluteUrl("/#organisation", site);

const organisationRef = (site: URL | undefined) => ({ "@id": organisationId(site) });

export function buildOrganisationSchema(
  organisation: OrganisationSettingsFragment | null | undefined,
  site: URL | undefined,
): JsonLdSchema | undefined {
  if (!organisation?.name) return undefined;

  return compact({
    "@context": "https://schema.org",
    // Editor-chosen, so the same settings document works for a store, a studio or a sole trader.
    "@type": organisation.type || "Organization",
    "@id": organisationId(site),
    name: organisation.name,
    url: site?.href,
    logo: organisation.logo?.asset?.url,
    description: organisation.description,
    foundingDate: organisation.foundingDate,
    founder: (organisation.founders ?? []).map((name) => ({ "@type": "Person", name })),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: organisation.numberOfEmployees,
    },
    telephone: organisation.telephone,
    // Text, not Country — "Worldwide" is as valid an answer as a country name.
    areaServed: organisation.areaServed,
    address: {
      "@type": "PostalAddress",
      streetAddress: organisation.address?.streetAddress,
      addressLocality: organisation.address?.addressLocality,
      addressRegion: organisation.address?.addressRegion,
      postalCode: organisation.address?.postalCode,
      addressCountry: organisation.address?.addressCountry,
    },
    knowsAbout: organisation.knowsAbout,
    sameAs: organisation.sameAs,
  }) as JsonLdSchema | undefined;
}

export function buildWebSiteSchema(
  organisation: OrganisationSettingsFragment | null | undefined,
  site: URL | undefined,
  locale: Locale,
): JsonLdSchema | undefined {
  if (!site) return undefined;

  return compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website", site),
    url: site.href,
    name: organisation?.name,
    inLanguage: getHtmlLang(locale),
    publisher: organisationRef(site),
  }) as JsonLdSchema | undefined;
}

/** Breadcrumb trail from the unprefixed URL path; the last crumb takes the page's own title. */
export function buildBreadcrumbSchema(
  pathname: string,
  title: string | null | undefined,
  site: URL | undefined,
  locale: Locale,
): JsonLdSchema | undefined {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return undefined;

  const crumbs = [
    { name: "Home", url: absoluteUrl(localizeHref("/", locale), site) },
    ...segments.map((segment, index) => ({
      name: index === segments.length - 1 && title ? title : segment.replace(/-/g, " "),
      url: absoluteUrl(localizeHref(`/${segments.slice(0, index + 1).join("/")}`, locale), site),
    })),
  ];

  return compact({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }) as JsonLdSchema | undefined;
}

// Option names Google reads as `variesBy` / variant properties; other options are left out.
const SCHEMA_VARIANT_PROPERTIES: Record<string, string> = {
  color: "color",
  colour: "color",
  size: "size",
  material: "material",
  pattern: "pattern",
};

const AVAILABILITY = {
  inStock: "https://schema.org/InStock",
  outOfStock: "https://schema.org/OutOfStock",
};

/** `ProductGroup` with one `Product` + `Offer` per variant; a plain `Product` when there's one. */
export function buildProductSchema(
  product: ProductShopifySanity,
  description: string | null | undefined,
  site: URL | undefined,
  locale: Locale,
): JsonLdSchema | undefined {
  const { shopify, sanity } = product;
  if (!shopify.title) return undefined;

  const url = absoluteUrl(localizeHref(resolveSanityHref("product", shopify.handle), locale), site);
  const images = [
    sanity.mediaThumbnail?.image,
    ...(sanity.mediaGallery ?? []).map((media) => media?.image),
  ]
    .map((image) => image?.asset?.url)
    .filter(Boolean);
  const variants = shopify.variants.nodes;

  const variantSchema = (variant: (typeof variants)[number]) => {
    const variantUrl = url ? new URL(url) : undefined;
    for (const { name, value } of variant.selectedOptions)
      variantUrl?.searchParams.set(name, value);
    const properties = Object.fromEntries(
      variant.selectedOptions.flatMap(({ name, value }) => {
        const property = SCHEMA_VARIANT_PROPERTIES[name.toLowerCase()];
        return property ? [[property, value]] : [];
      }),
    );
    return {
      "@type": "Product",
      name: isSingleDefaultVariant(variants)
        ? shopify.title
        : `${shopify.title} – ${variant.title}`,
      sku: variant.sku,
      gtin: variant.barcode,
      image: variant.image?.url ?? images[0],
      ...properties,
      offers: {
        "@type": "Offer",
        url: variantUrl?.href,
        price: variant.price.amount,
        priceCurrency: variant.price.currencyCode,
        availability: variant.availableForSale ? AVAILABILITY.inStock : AVAILABILITY.outOfStock,
        itemCondition: "https://schema.org/NewCondition",
      },
    };
  };

  const shared = {
    "@context": "https://schema.org",
    "@id": url ? `${url}#product` : undefined,
    name: shopify.title,
    description,
    url,
    image: images,
    brand: organisationRef(site),
  };

  if (isSingleDefaultVariant(variants) && variants[0]) {
    return compact({ ...variantSchema(variants[0]), ...shared, "@type": "Product" }) as
      JsonLdSchema | undefined;
  }

  return compact({
    ...shared,
    "@type": "ProductGroup",
    productGroupID: shopify.handle,
    variesBy: [
      ...new Set(
        shopify.options.flatMap((option) => {
          const property = SCHEMA_VARIANT_PROPERTIES[option.name.toLowerCase()];
          return property ? [`https://schema.org/${property}`] : [];
        }),
      ),
    ],
    hasVariant: variants.map(variantSchema),
  }) as JsonLdSchema | undefined;
}
