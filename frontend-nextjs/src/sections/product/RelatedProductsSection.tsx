"use client";

import { useRef } from "react";
import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import Carousel, { type CarouselApi } from "@/layouts/Carousel";
import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { cn } from "@/lib/utils";

interface Props {
  productsData: ProductThumbnailShopifySanity[] | null | undefined;
  className?: string;
}

export default function RelatedProductsSection({
  productsData,
  className,
}: Props) {
  const carouselRef = useRef<CarouselApi>(null);

  if (!productsData?.length) return null;

  return (
    <section
      className={cn(
        "w-[var(--container-width)] mx-auto mt-[var(--s80)]",
        className,
      )}
    >
      <div className="top flex justify-between items-center mb-[var(--s16)] gap-x-[var(--s4)]">
        <h2>Related Products</h2>

        <div className="carousel-controls flex gap-[var(--s4)]">
          <button
            type="button"
            aria-label="Previous related products"
            onClick={() => carouselRef.current?.scrollPrev()}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next related products"
            onClick={() => carouselRef.current?.scrollNext()}
          >
            →
          </button>
        </div>
      </div>

      <Carousel ref={carouselRef} id="related-products-carousel">
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
      </Carousel>
    </section>
  );
}
