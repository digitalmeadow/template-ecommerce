import type { LinkFragment } from "sanity/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@config";
import { sanityClientGroq } from "sanity/client";
import { resolveLink, type ResolvedLink } from "./resolve";
import { buildScoped } from "@lib/cache";

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

// GraphQL doesn't resolve references inside Portable Text, so those arrive as bare `_ref`s.
async function resolveLinkReference(linkData: LinkFragment): Promise<LinkFragment | null> {
  if (linkData?.type === "page" && linkData.page?._type === "reference") {
    if (!("_ref" in linkData.page) || !linkData.page._ref) {
      console.warn("Link reference is missing _ref; rendering without a link.");
      return null;
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

    return { ...linkData, page: null };
  }

  return linkData;
}

export async function resolveSanityLink(
  linkData: LinkFragment | null | undefined,
): Promise<ResolvedLink | null> {
  if (!linkData) return null;
  return resolveLink(await resolveLinkReference(linkData));
}
