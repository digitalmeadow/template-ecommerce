"use client";

import Image, { type ImageLoader } from "next/image";
import { useState } from "react";
import type { SanityImageFragment } from "sanity-nextjs/generated/graphql";
import { getSanityImageFocalPoint, getSanityImageProps } from "@/lib/sanity/images";
import { cn } from "@/lib/utils";

interface Props {
  image: SanityImageFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
  /** Above-the-fold images: skips lazy loading and preloads for LCP. */
  priority?: boolean;
}

// The CDN URL already carries the crop rect and format; Next only picks the width.
const sanityImageLoader: ImageLoader = ({ src, width }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  return url.href;
};

const LAYOUT_CLASSES = {
  width: "w-full",
  height: "h-full",
  cover: "h-full w-full object-cover",
  contain: "h-full w-full object-contain",
};

export default function SanityImage({
  image,
  layout = "width",
  sizes = [100, 100, 100],
  loading = "lazy",
  priority = false,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageProps = getSanityImageProps({ sanityImage: image, sizes });
  const placeholderSrc = image?.asset?.metadata?.lqip;
  const focalPoint = getSanityImageFocalPoint(image);
  const isIntrinsic = layout === "width" || layout === "height";
  const aspectRatio =
    imageProps?.width && imageProps.height ? imageProps.width / imageProps.height : undefined;

  return (
    <div
      className={cn(
        "sanity-image relative grid overflow-hidden *:min-h-0 *:min-w-0 *:[grid-area:1/1]",
        LAYOUT_CLASSES[layout],
      )}
      style={aspectRatio && isIntrinsic ? { aspectRatio } : undefined}
    >
      {placeholderSrc && (
        <img
          className={cn(
            "placeholder pointer-events-none blur-[100px] transition-opacity duration-(--duration-media) ease-out",
            isIntrinsic ? "absolute inset-0 h-full w-full object-cover" : LAYOUT_CLASSES[layout],
            isLoaded && "opacity-0",
          )}
          src={placeholderSrc}
          alt=""
          loading="eager"
          aria-hidden="true"
        />
      )}

      {imageProps && (
        <Image
          className={cn(
            "image opacity-0 transition-opacity duration-(--duration-media) ease-out",
            LAYOUT_CLASSES[layout],
            layout === "width" && "h-auto",
            layout === "height" && "w-auto",
            isLoaded && "opacity-(--media-opacity,1)",
          )}
          loader={sanityImageLoader}
          src={imageProps.src}
          width={imageProps.width}
          height={imageProps.height}
          sizes={imageProps.sizes}
          style={focalPoint ? { objectPosition: focalPoint } : undefined}
          alt={image?.asset?.altText ?? ""}
          loading={priority ? "eager" : loading}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          data-loaded={isLoaded ? "" : undefined}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
