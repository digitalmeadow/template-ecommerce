"use client";

import { useState } from "react";
import Image from "next/image";
import type { SanityImageFragment } from "sanity-nextjs/generated/graphql";
import {
  sanityImageLoader,
  getSizesAttr,
  getSanityImageProps,
  getSanityImageFocalPoint,
} from "@/lib/sanity/images";
import { cn } from "@/lib/utils";

interface Props {
  imageData: SanityImageFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
  // Above-the-fold images: preloads, skips lazy loading and raises fetch priority for LCP.
  priority?: boolean;
  mediaId?: string | null;
}

export default function SanityImage({
  imageData,
  layout = "width",
  sizes = [100, 100, 100],
  loading = "lazy",
  priority = false,
  mediaId,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const imageProps = getSanityImageProps(imageData);
  if (!imageProps) return null;

  const alt = imageData?.asset?.altText ?? "";
  const placeholderSrc = imageData?.asset?.metadata?.lqip;
  const focalPoint = getSanityImageFocalPoint(imageData);

  const isFillLayout = layout === "cover" || layout === "contain";
  const hasDimensions = !!imageProps.width && !!imageProps.height;

  // Cover/contain keep intrinsic dimensions (as in Astro); Next `fill` only when dimensions are unknown.
  const fillsParent = !hasDimensions;

  const imgClasses = cn(
    "relative transition-opacity duration-300 ease-in-out",
    loaded ? "opacity-100" : "opacity-0",
    isFillLayout
      ? cn("w-full h-full", layout === "contain" ? "object-contain" : "object-cover")
      : layout === "height"
        ? "h-full w-auto"
        : "w-full h-auto",
  );

  return (
    <div
      className={cn("sanity-image relative grid overflow-hidden", isFillLayout && "h-full w-full")}
    >
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="placeholder absolute inset-0 h-full w-full object-cover"
        />
      )}
      <Image
        src={imageProps.src}
        alt={alt}
        fill={fillsParent}
        width={fillsParent ? undefined : imageProps.width!}
        height={fillsParent ? undefined : imageProps.height!}
        sizes={getSizesAttr(sizes)}
        loading={priority ? "eager" : loading}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loader={sanityImageLoader}
        onLoad={() => setLoaded(true)}
        className={imgClasses}
        style={focalPoint ? { objectPosition: focalPoint } : undefined}
        data-media-id={mediaId ?? undefined}
      />
    </div>
  );
}
