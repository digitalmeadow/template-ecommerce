import React from "react";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "frontend/config";

export function pluralize(word: string, count: number) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

type PortableTextChild = { _type?: string; text?: string };
type PortableTextBlock = { _type?: string; children?: PortableTextChild[] };

export function previewText(value: unknown, max = 80): string {
  if (!Array.isArray(value)) return "";
  const text = (value as PortableTextBlock[])
    .filter((block) => block._type === "block")
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

// `media` must be selected via these paths: selecting the object alone leaves the Mux asset a bare reference.
export function mediaSelection(prefix = "") {
  return {
    mediaType: `${prefix}type`,
    mediaImage: `${prefix}image`,
    mediaPlaybackId: `${prefix}video.asset.playbackId`,
  };
}

interface MediaSelection {
  mediaType?: string;
  mediaImage?: unknown;
  mediaPlaybackId?: string;
}

export function previewMedia({ mediaType, mediaImage, mediaPlaybackId }: MediaSelection) {
  if (mediaType === "video" && mediaPlaybackId) {
    return (
      <img
        src={`https://image.mux.com/${mediaPlaybackId}/thumbnail.jpg`}
        style={{ objectFit: "cover" }}
        alt=""
      />
    );
  }
  if (mediaType === "image" && mediaImage) return mediaImage as React.ReactNode;
  return undefined;
}

export function linkSelection(prefix = "") {
  return {
    linkType: `${prefix}type`,
    linkUrl: `${prefix}url`,
    linkSection: `${prefix}section`,
    linkEmail: `${prefix}email`,
    linkPhone: `${prefix}phone`,
    linkFileName: `${prefix}file.asset.originalFilename`,
    linkPageType: `${prefix}page._type`,
    linkPageSlug: `${prefix}page.slug.current`,
    linkPageHandle: `${prefix}page.shopify.handle.current`,
  };
}

type LinkSelection = Partial<Record<keyof ReturnType<typeof linkSelection>, string>>;

export function linkSubtitle(link: LinkSelection): string | undefined {
  const anchor = link.linkSection ? `#${link.linkSection}` : "";

  switch (link.linkType) {
    case "page": {
      const pattern = link.linkPageType && SANITY_DOCUMENT_ROUTE_PATTERNS[link.linkPageType];
      if (!pattern) return "No page selected";
      const slug = link.linkPageSlug ?? link.linkPageHandle ?? "";
      return pattern.replace("[slug]", slug) + anchor;
    }
    case "url":
      return link.linkUrl;
    case "section":
      return anchor || undefined;
    case "email":
      return link.linkEmail && `mailto:${link.linkEmail}`;
    case "phone":
      return link.linkPhone && `tel:${link.linkPhone}`;
    case "file":
      return link.linkFileName;
    default:
      return undefined;
  }
}
