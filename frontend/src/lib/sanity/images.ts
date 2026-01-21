import type { SanityImageFragment } from "sanity/generated/graphql";

export function getSanityImageProps({
  sanityImage,
  sizes = [100, 100, 100],
  dpr = typeof window !== "undefined" ? window.devicePixelRatio : 2,
}: {
  sanityImage: SanityImageFragment | null | undefined;
  sizes?: [number, number, number];
  dpr?: number;
}) {
  if (!sanityImage?.asset?.url) throw new Error("Invalid Sanity image data");

  const [desktop, tablet, mobile] = sizes;
  const sizesAttr = `(min-width: 800px) ${desktop}vw, (min-width: 500px) ${tablet}vw, ${mobile}vw`;
  const widths = [400, 600, 800, 1000, 1400, 1800, 2200];

  const srcset = widths
    .map((w) => {
      let url = `${sanityImage.asset!.url}?w=${w}&fit=max&auto=format`;
      if (dpr) url += `&dpr=${dpr}`;
      return `${url} ${w}w`;
    })
    .join(", ");

  const fallbackWidth = 1000;
  const src = `${sanityImage.asset.url}?w=${fallbackWidth}&fit=max&dpr=${dpr}&auto=format`;

  return {
    src,
    srcset,
    sizes: sizesAttr,
    alt: sanityImage.asset.altText ?? "",
    blurhash: sanityImage.asset.metadata?.lqip,
  };
}
