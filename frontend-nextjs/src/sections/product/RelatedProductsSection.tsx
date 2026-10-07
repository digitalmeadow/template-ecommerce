import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import RelatedProductsCarousel from "@/sections/product/RelatedProductsCarousel";
import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { cn } from "@/lib/utils";

interface Props {
  productsData: ProductThumbnailShopifySanity[] | null | undefined;
  className?: string;
}

// Server component: thumbnails render server-side (SanityMedia is async) and slot into the client carousel.
export default function RelatedProductsSection({ productsData, className }: Props) {
  if (!productsData?.length) return null;

  return (
    <section className={cn("u-container mt-[var(--s80)]", className)}>
      <RelatedProductsCarousel>
        {productsData.map((productData) => (
          <div
            key={productData.shopify.id}
            className={cn(
              "carousel-item",
              "w-[calc(4*var(--column)+3*var(--gutter))] mr-[var(--gutter)]",
              "max-lg:w-[calc(8*var(--column)+7*var(--gutter))]",
            )}
          >
            <ProductThumbnail productData={productData} />
          </div>
        ))}
      </RelatedProductsCarousel>
    </section>
  );
}
