import { SANITY_PROJECT_ID } from "astro:env/client";
import type { LinkFragment } from "../generated/graphql";

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
  if (!reference) return "";
  if (reference._type === "home") return "/";
  if (reference._type === "page" && reference.__typename === "Page")
    return `/${reference.slug?.current}`;
  if (reference._type === "register") return "/register";

  return "";
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
