import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@/config";

export type LinkKind =
  "internal" | "anchor" | "external" | "email" | "phone" | "download";

export interface ResolvedLink {
  href: string;
  kind: LinkKind;
  newTab: boolean;
  download?: string;
}

export function resolveSanityHref(
  documentType: string,
  slug?: string | null,
): string {
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

export function sanityFileUrlFromRef(source: string | undefined): string {
  if (!source) return "";

  let id = source;
  if (id.startsWith("file-")) {
    id = id.slice(5);
  }

  const lastDashIndex = id.lastIndexOf("-");
  const sourceUrl =
    id.slice(0, lastDashIndex) + "." + id.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${sourceUrl}`;
}

/** Pure, so it runs anywhere; page references must already be resolved (`resolveSanityLink`). */
export function resolveLink(
  link: LinkFragment | null | undefined,
): ResolvedLink | null {
  if (!link) return null;
  const newTab = !!link.newTab;

  switch (link.type) {
    case "page": {
      const href = resolveReferenceHref(link.page);
      if (href === undefined) return null;
      const anchor = link.section ? `#${link.section}` : "";
      return { href: href + anchor, kind: "internal", newTab };
    }
    case "section":
      return link.section
        ? { href: `#${link.section}`, kind: "anchor", newTab: false }
        : null;
    case "url":
      return link.url
        ? { href: link.url, kind: urlKind(link.url), newTab }
        : null;
    case "email":
      return link.email
        ? { href: `mailto:${link.email}`, kind: "email", newTab: false }
        : null;
    case "phone": {
      // Editors type numbers as they read them: "+61 (0)4 1234 5678".
      const number = link.phone?.replace(/\(0\)|[^\d+]/g, "");
      return number
        ? { href: `tel:${number}`, kind: "phone", newTab: false }
        : null;
    }
    case "file": {
      const href = fileHref(link.file);
      if (!href) return null;
      const download = link.file?.asset?.originalFilename ?? undefined;
      return { href, kind: "download", newTab, download };
    }
    default:
      return null;
  }
}

export function anchorAttributes({ kind, newTab, download }: ResolvedLink) {
  return {
    target: newTab ? "_blank" : undefined,
    rel: newTab ? "noopener noreferrer" : undefined,
    download: kind === "download" ? download : undefined,
  };
}

function urlKind(url: string): LinkKind {
  if (url.startsWith("#")) return "anchor";
  return /^([a-z][a-z\d+.-]*:|\/\/)/i.test(url) ? "external" : "internal";
}

function fileHref(file: LinkFragment["file"]): string | undefined {
  const asset = file?.asset;
  if (!asset) return undefined;
  if ("_ref" in asset && asset._ref) {
    return sanityFileUrlFromRef(asset._ref as string);
  }
  return asset.url ?? undefined;
}

// Unresolvable targets (unpublished or deleted documents) must degrade to no link, not fail the build.
function resolveReferenceHref(
  reference: LinkFragment["page"],
): string | undefined {
  if (!reference?._type) {
    console.warn(
      "Link target is unpublished or deleted; rendering without a link.",
    );
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
