import { SANITY_PROJECT_ID, SANITY_DATASET } from "astro:env/client";
import type { LinkFragment } from "sanity/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@config";
import { sanityClientGroq } from "sanity/client";
import { resolveSanityHref } from "./resolve";
import { buildScoped } from "./cache";

export { resolveSanityHref };

interface ReferenceTarget {
  _id: string;
  _type: string;
  slug: string | null;
}

// One lookup table beats a query per link: the same handful of targets recur across every page.
const getReferenceMap = buildScoped(async () => {
  const documents = await sanityClientGroq.fetch<ReferenceTarget[]>(
    `*[_type in $types]{
      _type,
      _id,
      "slug": coalesce(slug.current, shopify.handle.current)
    }`,
    { types: Object.keys(SANITY_DOCUMENT_ROUTE_PATTERNS) },
  );

  return new Map(documents.map((document) => [document._id, document]));
});

// This is only required because GraphQL doesn't resolve references in Portable Text
async function resolveLinkReference(linkData: LinkFragment): Promise<LinkFragment | null> {
  if (linkData?.type === "page" && linkData.page?._type === "reference") {
    if (!("_ref" in linkData.page) || !linkData.page._ref) {
      throw new Error("Page reference is missing _ref");
    }

    const referenceMap = await getReferenceMap();
    const resolved = referenceMap.get(linkData.page._ref as string);

    if (resolved) {
      return {
        ...linkData,
        page: {
          __typename: "Page",
          _type: resolved._type,
          _id: resolved._id,
          slug: { __typename: "Slug", current: resolved.slug },
        },
      };
    }
  }

  // Already resolved or not a page link
  return linkData;
}

export async function resolveLinkHref(linkData: LinkFragment): Promise<string | undefined> {
  if (!linkData) return undefined;

  const resolvedLink = await resolveLinkReference(linkData);
  if (!resolvedLink) return undefined;

  if (resolvedLink.type === "section")
    return resolvedLink.section ? `#${resolvedLink.section}` : "";
  if (resolvedLink.type === "url") return resolvedLink.url ?? "";
  if (resolvedLink.type === "page") {
    const href = resolveReferenceHref(resolvedLink.page);
    if (href === undefined) return undefined;
    return resolvedLink.section ? `${href}#${resolvedLink.section}` : href;
  }
  if (resolvedLink.type === "email") return `mailto:${resolvedLink.email}`;
  if (resolvedLink.type === "phone") return `tel:${resolvedLink.phone}`;
  if (resolvedLink.type === "file") {
    if (
      resolvedLink.file?.asset &&
      "_ref" in resolvedLink.file.asset &&
      resolvedLink.file.asset._ref
    ) {
      return sanityFileUrlFromRef(resolvedLink.file.asset._ref as string);
    }
    if (resolvedLink.file?.asset?.url) {
      return resolvedLink.file.asset.url;
    }
  }
  return undefined;
}

// Unresolvable targets (unpublished or deleted documents) must degrade to no link, not fail the build.
function resolveReferenceHref(reference: LinkFragment["page"]): string | undefined {
  if (!reference?._type) {
    console.warn("Link target is unpublished or deleted; rendering without a link.");
    return undefined;
  }

  if (!(reference._type in SANITY_DOCUMENT_ROUTE_PATTERNS)) {
    console.warn(
      `Link target _type "${reference._type}" has no route pattern; rendering without a link.`,
    );
    return undefined;
  }

  // Products and collections route by their Shopify handle rather than a slug.
  const slug =
    "slug" in reference && reference.slug
      ? reference.slug.current
      : "shopify" in reference
        ? reference.shopify?.handle?.current
        : undefined;

  return resolveSanityHref(reference._type, slug);
}

function sanityFileUrlFromRef(source: string | undefined): string {
  if (!source) return "";

  if (source.startsWith("file-")) {
    source = source.slice(5);
  }

  const lastDashIndex = source.lastIndexOf("-");
  const sourceUrl = source.slice(0, lastDashIndex) + "." + source.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${sourceUrl}`;
}
