import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductRelatedCarousel from "@/sections/product/ProductRelatedCarousel";
import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { cn } from "@/lib/utils";

interface Props {
  productsData: ProductThumbnailShopifySanity[] | null | undefined;
  className?: string;
}

// Server component: thumbnails render server-side (SanityMedia is async) and slot into the client carousel.
export default function ProductRelated({ productsData, className }: Props) {
  if (!productsData?.length) return null;

  return (
    <section className={cn("product-related mt-[var(--s80)] u-container", className)}>
      <ProductRelatedCarousel>
        {productsData.map((productData) => (
          <div
            key={productData.shopify.id}
            className={cn(
              "carousel-item",
              "mr-[var(--gutter)] w-[calc(4*var(--column)+3*var(--gutter))]",
              "max-lg:w-[calc(8*var(--column)+7*var(--gutter))]",
            )}
          >
            <ProductThumbnail productData={productData} />
          </div>
        ))}
      </ProductRelatedCarousel>
    </section>
  );
}
