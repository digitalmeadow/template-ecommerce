import { sanityClientGroq } from "sanity-nextjs/client.server";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@/config";
import { resolveSanityHref, sanityFileUrlFromRef } from "./resolve";

export { resolveSanityHref, sanityFileUrlFromRef } from "./resolve";

async function resolveLinkReference(
  linkData: LinkFragment,
): Promise<LinkFragment | null> {
  if (linkData?.type === "page" && linkData.page?._type === "reference") {
    if (!("_ref" in linkData.page) || !linkData.page._ref) {
      throw new Error("Page reference is missing _ref");
    }

    const refId = linkData.page._ref;

    const resolved = await sanityClientGroq.fetch(
      `*[_id == $refId][0]{
        _type,
        _id,
        "slug": slug.current
      }`,
      { refId },
    );

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

  return linkData;
}

export async function resolveLinkHref(
  linkData: LinkFragment | Record<string, unknown>,
): Promise<string | undefined> {
  if (!linkData) return undefined;

  const resolvedLink = await resolveLinkReference(linkData as LinkFragment);
  if (!resolvedLink) return undefined;

  if (resolvedLink.type === "section") return resolvedLink.section ?? "";
  if (resolvedLink.type === "url") return resolvedLink.url ?? "";
  if (resolvedLink.type === "page")
    return resolveReferenceHref(resolvedLink.page) ?? "";
  if (resolvedLink.type === "email") return `mailto:${resolvedLink.email}`;
  if (resolvedLink.type === "phone") return `tel:${resolvedLink.phone}`;
  if (resolvedLink.type === "file") {
    if (
      resolvedLink.file?.asset &&
      "_ref" in resolvedLink.file?.asset &&
      resolvedLink.file?.asset?._ref
    ) {
      return sanityFileUrlFromRef(resolvedLink.file?.asset?._ref as string);
    }
    if (resolvedLink.file?.asset?.url) {
      return resolvedLink.file.asset.url;
    }
  }
  return undefined;
}

function resolveReferenceHref(reference: LinkFragment["page"]): string {
  if (!reference?._type) {
    throw new Error("Reference is missing _type");
  }

  if (
    reference?._type &&
    !(reference._type in SANITY_DOCUMENT_ROUTE_PATTERNS)
  ) {
    throw new Error(
      `_type: ${reference?._type} not found in SANITY_DOCUMENT_ROUTE_PATTERNS`,
    );
  }

  const slug =
    "slug" in reference && reference.slug ? reference.slug.current : undefined;

  return resolveSanityHref(reference._type, slug);
}
