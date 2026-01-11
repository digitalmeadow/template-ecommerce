import { SANITY_PROJECT_ID } from "sanity/config";
import type { LinkFragment } from "sanity/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "../../../config";

export function resolveLinkHref(linkData: LinkFragment): string {
  if (!linkData) return "";
  if (linkData.type === "anchor") return linkData.anchor ?? "";
  if (linkData.type === "external") return linkData.href ?? "";
  if (linkData.type === "internal")
    return resolveReferenceHref(linkData.reference) ?? "";
  if (linkData.type === "email") return `mailto:${linkData.email}`;
  if (linkData.type === "phone") return `tel:${linkData.phone}`;
  if (linkData.type === "file") {
    if (
      linkData.file?.asset &&
      "_ref" in linkData.file?.asset &&
      linkData.file?.asset?._ref
    ) {
      return sanityFileUrlFromRef(linkData.file?.asset?._ref as string);
    }
    if (linkData.file?.asset?.url) {
      return linkData.file.asset.url;
    }
  }
  return "";
}

function resolveReferenceHref(reference: LinkFragment["reference"]): string {
  if (
    !reference?._type ||
    !(reference._type in SANITY_DOCUMENT_ROUTE_PATTERNS)
  ) {
    throw new Error("Invalid reference type");
  }

  const pattern = SANITY_DOCUMENT_ROUTE_PATTERNS[reference._type]!;

  if (
    !pattern.includes("[slug]") ||
    !("slug" in reference) ||
    !reference.slug?.current
  ) {
    return pattern;
  }

  return pattern.replace("[slug]", reference.slug.current);
}

function sanityFileUrlFromRef(source: string | undefined): string {
  if (!source) return "";

  // Remove the leading "image-" prefix if it exists
  if (source.startsWith("file-")) {
    source = source.slice(5);
  }

  // Replace the final - with a dot to get the extension
  const lastDashIndex = source.lastIndexOf("-");
  let sourceUrl =
    source.slice(0, lastDashIndex) + "." + source.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${sourceUrl}`;
}
