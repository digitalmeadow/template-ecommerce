"use client";

import { useRef, type ReactNode } from "react";
import Carousel, { type CarouselApi } from "@/layouts/Carousel";

interface Props {
  children: ReactNode;
}

export default function ProductRelatedCarousel({ children }: Props) {
  const carouselRef = useRef<CarouselApi>(null);

  return (
    <>
      <div className="top mb-[var(--s16)] flex items-center justify-between gap-x-[var(--s4)]">
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

      <Carousel ref={carouselRef} id="product-related-carousel">
        {children}
      </Carousel>
    </>
  );
}
