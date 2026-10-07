import type { OrganisationSettingsFragment } from "sanity-nextjs/generated/graphql";
import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import { resolveSanityHref } from "./resolve";

export type JsonLdSchema = Record<string, unknown>;

/**
 * Strips null, undefined and empty branches. Without it every unfilled CMS field would emit
 * `"name": null`, which validators read as an assertion that the value is genuinely empty.
 */
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
const organisationId = (site: URL | undefined) =>
  absoluteUrl("/#organisation", site);

const organisationRef = (site: URL | undefined) => ({
  "@id": organisationId(site),
});

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
    founder: (organisation.founders ?? []).map((name) => ({
      "@type": "Person",
      name,
    })),
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
  locale: string,
): JsonLdSchema | undefined {
  if (!site) return undefined;

  return compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website", site),
    url: site.href,
    name: organisation?.name,
    inLanguage: locale,
    publisher: organisationRef(site),
  }) as JsonLdSchema | undefined;
}

/** Breadcrumb trail from the URL path; the last crumb takes the page's own title. */
export function buildBreadcrumbSchema(
  pathname: string,
  title: string | null | undefined,
  site: URL | undefined,
): JsonLdSchema | undefined {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return undefined;

  const crumbs = [
    { name: "Home", url: absoluteUrl("/", site) },
    ...segments.map((segment, index) => ({
      name:
        index === segments.length - 1 && title
          ? title
          : segment.replace(/-/g, " "),
      url: absoluteUrl(`/${segments.slice(0, index + 1).join("/")}`, site),
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

export function buildProductSchema(
  product: ProductShopifySanity,
  description: string | null | undefined,
  site: URL | undefined,
): JsonLdSchema | undefined {
  const { shopify, sanity } = product;
  if (!shopify.title) return undefined;

  const url = absoluteUrl(resolveSanityHref("product", shopify.handle), site);
  const { minVariantPrice, maxVariantPrice } = shopify.priceRange;

  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url ? `${url}#product` : undefined,
    name: shopify.title,
    description,
    url,
    image: [
      sanity.mediaThumbnail?.image,
      ...(sanity.mediaGallery ?? []).map((m) => m?.image),
    ]
      .map((image) => image?.asset?.url)
      .filter(Boolean),
    brand: organisationRef(site),
    offers: {
      "@type": "AggregateOffer",
      url,
      priceCurrency: minVariantPrice.currencyCode,
      lowPrice: minVariantPrice.amount,
      highPrice: maxVariantPrice.amount,
      offerCount: shopify.variants.edges.length,
      availability: shopify.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }) as JsonLdSchema | undefined;
}
