import type { SanityImageFragment } from "sanity/generated/graphql";

// The Studio stores a crop as the fraction trimmed off each edge; the CDN takes a pixel rect.
function getCropRect(sanityImage: SanityImageFragment) {
  const dimensions = sanityImage.asset?.metadata?.dimensions;
  const crop = sanityImage.crop;
  if (!crop || !dimensions?.width || !dimensions?.height) return null;

  const left = crop.left ?? 0;
  const top = crop.top ?? 0;
  const rect = {
    left: Math.round(dimensions.width * left),
    top: Math.round(dimensions.height * top),
    width: Math.round(dimensions.width * (1 - left - (crop.right ?? 0))),
    height: Math.round(dimensions.height * (1 - top - (crop.bottom ?? 0))),
  };

  return rect.width > 0 && rect.height > 0 ? rect : null;
}

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

// Hotspot coordinates are relative to the whole asset, so they shift once a crop is applied.
export function getSanityImageFocalPoint(sanityImage: SanityImageFragment | null | undefined) {
  const hotspot = sanityImage?.hotspot;
  if (typeof hotspot?.x !== "number" || typeof hotspot?.y !== "number") return null;

  const crop = sanityImage?.crop;
  const left = crop?.left ?? 0;
  const top = crop?.top ?? 0;
  const width = 1 - left - (crop?.right ?? 0);
  const height = 1 - top - (crop?.bottom ?? 0);
  if (width <= 0 || height <= 0) return null;

  const x = clamp((hotspot.x - left) / width);
  const y = clamp((hotspot.y - top) / height);

  return `${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`;
}

export function getSanityImageProps({
  sanityImage,
  sizes = [100, 100, 100],
}: {
  sanityImage: SanityImageFragment | null | undefined;
  sizes?: [number, number, number];
}) {
  if (!sanityImage?.asset?.url) return null;

  const [desktop, tablet, mobile] = sizes;
  const sizesAttr = `(min-width: 64rem) ${desktop}vw, (min-width: 32rem) ${tablet}vw, ${mobile}vw`;
  const widths = [64, 96, 128, 192, 256, 400, 600, 800, 1000, 1400, 1800, 2200];

  const rect = getCropRect(sanityImage);
  const crop = rect ? `&rect=${rect.left},${rect.top},${rect.width},${rect.height}` : "";

  const srcset = widths
    .map((w) => `${sanityImage.asset!.url}?w=${w}&fit=max&auto=format${crop} ${w}w`)
    .join(", ");

  const fallbackWidth = 1000;
  const src = `${sanityImage.asset.url}?w=${fallbackWidth}&fit=max&auto=format${crop}`;

  const dimensions = sanityImage.asset.metadata?.dimensions;

  return {
    src,
    srcset,
    sizes: sizesAttr,
    width: rect?.width ?? dimensions?.width ?? undefined,
    height: rect?.height ?? dimensions?.height ?? undefined,
  };
}
