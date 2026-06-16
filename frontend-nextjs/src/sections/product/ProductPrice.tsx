"use client";

import { useRef, useEffect } from "react";
import type { PricesPerLocale } from "@/lib/fetches/productShopifySanity";
import { getStoredLocale } from "@/lib/shopify/locale.client";
import PriceDisplay from "@/blocks/PriceDisplay";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function ProductPrice({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const productRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const productRoot = element.closest(
      "[data-product-root]",
    ) as HTMLElement | null;
    if (!productRoot) throw new Error("ProductPrice: missing [data-product-root]");

    productRootRef.current = productRoot;

    const priceElement = element.querySelector(
      "[data-price]",
    ) as HTMLElement | null;
    const compareAtElement = element.querySelector(
      "[data-price-compare-at]",
    ) as HTMLElement | null;

    const pricesPerLocale = JSON.parse(
      productRoot.dataset.prices!,
    ) as PricesPerLocale;

    function renderPrice(variantId?: string) {
      const locale = getStoredLocale();
      const priceData = pricesPerLocale[locale];
      if (!priceData?.variants?.edges?.length) return;

      const variants = priceData.variants.edges.map((e) => e.node);

      let variant = null;
      if (variantId) {
        variant = variants.find((v) => v.id === variantId) ?? null;
      }

      if (variant) {
        if (priceElement) {
          priceElement.setAttribute("data-amount", variant.price.amount);
          priceElement.removeAttribute("data-prefix");
        }
        if (compareAtElement) {
          const cmp = variant.compareAtPrice;
          if (
            cmp &&
            parseFloat(cmp.amount) > parseFloat(variant.price.amount)
          ) {
            compareAtElement.setAttribute("data-amount", cmp.amount);
            compareAtElement.style.display = "";
          } else {
            compareAtElement.style.display = "none";
          }
        }
      } else {
        variants.sort(
          (a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount),
        );
        const cheapest = variants[0];
        const mostExpensive = variants[variants.length - 1];

        if (priceElement) {
          priceElement.setAttribute("data-amount", cheapest.price.amount);
          if (
            parseFloat(mostExpensive.price.amount) >
            parseFloat(cheapest.price.amount)
          ) {
            priceElement.setAttribute("data-prefix", "from");
          } else {
            priceElement.removeAttribute("data-prefix");
          }
        }
        if (compareAtElement) {
          const cmp = cheapest.compareAtPrice;
          if (
            cmp &&
            parseFloat(cmp.amount) > parseFloat(cheapest.price.amount)
          ) {
            compareAtElement.setAttribute("data-amount", cmp.amount);
            compareAtElement.style.display = "";
          } else {
            compareAtElement.style.display = "none";
          }
        }
      }
    }

    function handleVariantChange(event: Event) {
      const { variantId } = (event as CustomEvent).detail;
      if (!variantId)
        throw new Error("ProductPrice: missing variantId in variant-change event");
      renderPrice(variantId);
    }

    renderPrice();

    productRoot.addEventListener(
      "product:variant-change",
      handleVariantChange as EventListener,
    );
    productRoot.dispatchEvent(
      new CustomEvent("product:request-variant-update", { bubbles: true }),
    );

    return () => {
      productRoot.removeEventListener(
        "product:variant-change",
        handleVariantChange as EventListener,
      );
    };
  }, []);

  return (
    <div ref={rootRef} className={cn("product-price", className)}>
      <PriceDisplay variant="compare-at" data-price-compare-at />
      <PriceDisplay data-price />
    </div>
  );
}
