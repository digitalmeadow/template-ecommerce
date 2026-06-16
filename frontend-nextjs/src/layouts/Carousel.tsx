"use client";

import { forwardRef, useImperativeHandle } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
type EmblaCarouselType = ReturnType<typeof useEmblaCarousel>[1];

export interface CarouselApi {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  emblaApi: EmblaCarouselType;
}

interface Props {
  id?: string;
  className?: string;
  align?: EmblaOptionsType["align"];
  dragFree?: boolean;
  loop?: boolean;
  skipSnaps?: boolean;
  slidesToScroll?: EmblaOptionsType["slidesToScroll"];
  children: React.ReactNode;
}

const Carousel = forwardRef<CarouselApi, Props>(function Carousel(
  {
    id,
    className,
    align = "start",
    dragFree,
    loop,
    skipSnaps,
    slidesToScroll,
    children,
  },
  ref,
) {
  const options: EmblaOptionsType = {
    align,
    dragFree,
    loop,
    skipSnaps,
    slidesToScroll: slidesToScroll === "auto" ? "auto" : (slidesToScroll ?? 1),
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useImperativeHandle(ref, () => ({
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    scrollTo: (index: number) => emblaApi?.scrollTo(index),
    emblaApi,
  }));

  return (
    <div id={id} className={cn("overflow-hidden", className)} ref={emblaRef}>
      <div className="flex cursor-grab active:cursor-grabbing [&>*]:flex-shrink-0">
        {children}
      </div>
    </div>
  );
});

export default Carousel;
