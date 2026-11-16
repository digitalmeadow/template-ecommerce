"use client";

import Link from "next/link";
import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import MuxVideoPlayer from "@/fields/MuxVideoPlayer";
import SanityImage from "@/fields/SanityImage";
import VimeoVideo from "@/fields/VimeoVideo";
import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { localizeHref } from "@/lib/shopify/locale";
import { useLocale } from "@/lib/shopify/useLocale";
import ProductPrice from "@/sections/product/ProductPrice";

interface Props {
  product: ProductThumbnailShopifySanity;
}

// Client-safe (ProductBrowser renders fetched pages in the browser), so no server-side video
// placeholders: Mux shows its poster, Vimeo sizes to the cover frame.
function ThumbnailMedia({ media }: { media: MediaFragment | null | undefined }) {
  if (media?.type === "image") return <SanityImage image={media.image} layout="cover" />;

  const playbackId = media?.type === "video" ? media.video?.asset?.playbackId : null;
  if (playbackId) {
    return (
      <MuxVideoPlayer
        playbackId={playbackId}
        aspectRatio={media?.video?.asset?.data?.aspect_ratio?.replace(":", "/") ?? "16/9"}
        posterUrl={`https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&time=0`}
        layout="cover"
      />
    );
  }

  if (media?.type === "vimeo" && media.vimeo?.url) {
    return <VimeoVideo url={media.vimeo.url} layout="cover" />;
  }

  return null;
}

export default function ProductThumbnail({ product }: Props) {
  const locale = useLocale();
  const handle = product.sanity.shopify?.handle?.current ?? product.shopify.handle;

  return (
    <Link href={localizeHref(resolveSanityHref("product", handle), locale)} className="contents">
      <article className="product-thumbnail grid size-full grid-cols-[100%] grid-rows-[1fr_auto_auto] transition-[filter] duration-[var(--duration-default)] ease-out hover:grayscale-0! [.hover-group:hover_&]:grayscale">
        <div className="relative w-full overflow-hidden">
          <ThumbnailMedia media={product.sanity.mediaThumbnail} />
        </div>
        <h3 className="g-heading-6 mt-1">{product.shopify.title}</h3>
        <ProductPrice
          priceRange={product.shopify.priceRange}
          compareAtPriceRange={product.shopify.compareAtPriceRange}
        />
      </article>
    </Link>
  );
}
