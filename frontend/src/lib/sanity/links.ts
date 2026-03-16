import { SANITY_PROJECT_ID } from "sanity/config";
import type { LinkFragment } from "sanity/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@config";
import { sanityClientGroq } from "sanity/client";

// This is only required because GraphQL doesn't resolve references in Portable Text
async function resolveLinkReference(linkData: LinkFragment): Promise<LinkFragment | null> {
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

  // Already resolved or not a page link
  return linkData;
}

export async function resolveLinkHref(linkData: LinkFragment | any): Promise<string> {
  if (!linkData) return "";

  const resolvedLink = await resolveLinkReference(linkData);
  if (!resolvedLink) return "";

  if (resolvedLink.type === "section") return resolvedLink.section ?? "";
  if (resolvedLink.type === "url") return resolvedLink.url ?? "";
  if (resolvedLink.type === "page") return resolveReferenceHref(resolvedLink.page) ?? "";
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
  return "";
}

export function resolveSanityHref(documentType: string, slug?: string | null): string {
  if (!(documentType in SANITY_DOCUMENT_ROUTE_PATTERNS)) {
    throw new Error("Invalid document type");
  }

  const pattern = SANITY_DOCUMENT_ROUTE_PATTERNS[documentType]!;

  if (!pattern.includes("[slug]")) {
    return pattern;
  }

  if (slug) {
    return pattern.replace("[slug]", slug);
  }

  return pattern.replace("[slug]", "");
}

function resolveReferenceHref(reference: LinkFragment["page"]): string {
  if (!reference?._type) {
    throw new Error("Reference is missing _type");
  }

  if (reference?._type && !(reference._type in SANITY_DOCUMENT_ROUTE_PATTERNS)) {
    throw new Error(`_type: ${reference?._type} not found in SANITY_DOCUMENT_ROUTE_PATTERNS`);
  }

  const slug = "slug" in reference && reference.slug ? reference.slug.current : undefined;

  return resolveSanityHref(reference._type, slug);
}

function sanityFileUrlFromRef(source: string | undefined): string {
  if (!source) return "";

  if (source.startsWith("file-")) {
    source = source.slice(5);
  }

  const lastDashIndex = source.lastIndexOf("-");
  let sourceUrl = source.slice(0, lastDashIndex) + "." + source.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${sourceUrl}`;
}
