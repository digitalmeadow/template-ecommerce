import Link from "next/link";
import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import SanityMedia from "@/fields/SanityMedia";
import ProductPrice from "@/sections/product/ProductPrice";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductThumbnailShopifySanity | null | undefined;
  className?: string;
}

export default function ProductThumbnail({ productData, className }: Props) {
  if (!productData) return null;

  const handle = productData.sanity.shopify?.handle?.current ?? productData.shopify.handle;
  const href = resolveSanityHref("product", handle);

  return (
    <Link href={href} className="contents">
      <article
        className={cn(
          "product-thumbnail",
          "grid h-full w-full grid-cols-[100%] grid-rows-[1fr_auto_auto]",
          "transition-[filter] duration-[var(--transition-default-duration)]",
          "[&:hover]:grayscale-0! [.hover-group:hover_&]:grayscale",
          className,
        )}
        data-product-root
        data-prices={JSON.stringify(productData.pricesPerLocale)}
      >
        <div className="media w-full">
          <SanityMedia mediaData={productData.sanity.mediaThumbnail} layout="cover" />
        </div>
        <h3 className="title mt-[var(--s4)]">{productData.shopify?.title}</h3>
        <div className="price">
          <ProductPrice />
        </div>
      </article>
    </Link>
  );
}
