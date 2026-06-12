"use client";

import { useState } from "react";
import Image from "next/image";
import type { SanityImageFragment } from "sanity-nextjs/generated/graphql";
import { sanityImageLoader, getSizesAttr } from "@/lib/sanity/images";
import { cn } from "@/lib/utils";

interface Props {
  imageData: SanityImageFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
  mediaId?: string | null;
}

export default function SanityImage({
  imageData,
  layout = "width",
  sizes = [100, 100, 100],
  loading = "lazy",
  mediaId,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  if (!imageData?.asset?.url) return null;

  const { url, altText, metadata } = imageData.asset;
  const dimensions = metadata?.dimensions;
  const lqip = metadata?.lqip;
  const alt = altText ?? "";
  const sizesAttr = getSizesAttr(sizes);

  const isFill = layout === "cover" || layout === "contain";
  const objectFit = layout === "contain" ? "contain" : "cover";
  const hasDimensions = !!dimensions?.width && !!dimensions?.height;
  const dimW: number | undefined = hasDimensions
    ? dimensions.width!
    : undefined;
  const dimH: number | undefined = hasDimensions
    ? dimensions.height!
    : undefined;

  const imgClasses = cn(
    "relative transition-opacity duration-300 ease-in-out",
    loaded ? "opacity-100" : "opacity-0",
    isFill
      ? objectFit === "contain"
        ? "object-contain"
        : "object-cover"
      : layout === "height"
        ? "h-full w-auto"
        : "w-full h-auto",
  );

  return (
    <div className="sanity-image relative overflow-hidden">
      {lqip && (
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <Image
        src={url}
        alt={alt}
        fill={isFill || !hasDimensions}
        width={!isFill ? dimW : undefined}
        height={!isFill ? dimH : undefined}
        sizes={sizesAttr}
        loading={loading}
        loader={sanityImageLoader}
        onLoad={() => setLoaded(true)}
        className={imgClasses}
        data-media-id={mediaId ?? undefined}
      />
    </div>
  );
}
