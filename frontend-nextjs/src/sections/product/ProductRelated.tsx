"use client";

import { useRef } from "react";
import Carousel, { type CarouselApi } from "@/layouts/Carousel";
import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductThumbnail from "@/sections/product/ProductThumbnail";

interface Props {
  products: ProductThumbnailShopifySanity[] | null | undefined;
}

export default function ProductRelated({ products }: Props) {
  const carouselRef = useRef<CarouselApi>(null);
  if (!products?.length) return null;

  return (
    <section className="product-related g-page-margin g-section-md">
      <div className="mb-4 flex items-center justify-between gap-1">
        <h2 className="g-heading-5">Related Products</h2>

        <div className="flex gap-1">
          <button
            className="g-button-icon"
            type="button"
            aria-label="Previous related products"
            onClick={() => carouselRef.current?.scrollPrev()}
          >
            ←
          </button>
          <button
            className="g-button-icon"
            type="button"
            aria-label="Next related products"
            onClick={() => carouselRef.current?.scrollNext()}
          >
            →
          </button>
        </div>
      </div>

      <Carousel ref={carouselRef} id="product-related-carousel">
        {products.map((product) => (
          <div
            key={product.shopify.id}
            className="mr-[var(--gutter)] w-[calc(4*var(--column)+3*var(--gutter))] mobile:w-[calc(3*var(--column)+2*var(--gutter))]"
          >
            <ProductThumbnail product={product} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
