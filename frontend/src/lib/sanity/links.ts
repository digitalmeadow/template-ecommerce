import { SANITY_PROJECT_ID } from "sanity/config";
import type { LinkFragment } from "sanity/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@config";

export function resolveLinkHref(linkData: LinkFragment): string {
  if (!linkData) return "";
  if (linkData.type === "section") return linkData.section ?? "";
  if (linkData.type === "url") return linkData.url ?? "";
  if (linkData.type === "page") return resolveReferenceHref(linkData.page) ?? "";
  if (linkData.type === "email") return `mailto:${linkData.email}`;
  if (linkData.type === "phone") return `tel:${linkData.phone}`;
  if (linkData.type === "file") {
    if (linkData.file?.asset && "_ref" in linkData.file?.asset && linkData.file?.asset?._ref) {
      return sanityFileUrlFromRef(linkData.file?.asset?._ref as string);
    }
    if (linkData.file?.asset?.url) {
      return linkData.file.asset.url;
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
  if (!reference?._type || !(reference._type in SANITY_DOCUMENT_ROUTE_PATTERNS)) {
    throw new Error("Invalid reference type");
  }

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
  let sourceUrl = source.slice(0, lastDashIndex) + "." + source.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${sourceUrl}`;
}
