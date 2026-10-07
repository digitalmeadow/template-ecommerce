"use client";

import { useRef, useEffect, useState } from "react";
import type { PricesPerLocale } from "@/lib/fetches/productShopifySanity";
import { getStoredLocale } from "@/lib/shopify/locale.client";
import PriceDisplay from "@/blocks/PriceDisplay";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

interface PriceState {
  amount: string;
  compareAt?: string;
  prefix?: string;
}

function resolvePrice(pricesPerLocale: PricesPerLocale, variantId?: string): PriceState | null {
  const variants = pricesPerLocale[getStoredLocale()]?.variants?.edges?.map((edge) => edge.node);
  if (!variants?.length) return null;

  const withCompareAt = (variant: (typeof variants)[number]) => {
    const compareAt = variant.compareAtPrice?.amount;
    return compareAt && parseFloat(compareAt) > parseFloat(variant.price.amount)
      ? compareAt
      : undefined;
  };

  const selected = variantId ? variants.find((variant) => variant.id === variantId) : undefined;
  if (selected) return { amount: selected.price.amount, compareAt: withCompareAt(selected) };

  const sorted = [...variants].sort(
    (a, b) => parseFloat(a.price.amount) - parseFloat(b.price.amount),
  );
  const cheapest = sorted[0];
  const isRange =
    parseFloat(sorted[sorted.length - 1].price.amount) > parseFloat(cheapest.price.amount);

  return {
    amount: cheapest.price.amount,
    compareAt: withCompareAt(cheapest),
    prefix: isRange ? "from" : undefined,
  };
}

export default function ProductPrice({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [price, setPrice] = useState<PriceState | null>(null);

  useEffect(() => {
    const productRoot = rootRef.current?.closest<HTMLElement>("[data-product-root]");
    if (!productRoot) throw new Error("ProductPrice: missing [data-product-root]");

    const pricesPerLocale = JSON.parse(productRoot.dataset.prices!) as PricesPerLocale;

    function handleVariantChange(event: Event) {
      const { variantId } = (event as CustomEvent<{ variantId?: string }>).detail;
      setPrice(resolvePrice(pricesPerLocale, variantId));
    }

    // Locale lives in localStorage, so prices can only resolve after mount.
    setPrice(resolvePrice(pricesPerLocale));

    productRoot.addEventListener("product:variant-change", handleVariantChange);
    productRoot.dispatchEvent(new CustomEvent("product:request-variant-update", { bubbles: true }));

    return () => productRoot.removeEventListener("product:variant-change", handleVariantChange);
  }, []);

  return (
    <div ref={rootRef} className={cn("product-price", "inline-flex gap-[1ch]", className)}>
      {price?.compareAt && <PriceDisplay variant="compare-at" amount={price.compareAt} />}
      {price && <PriceDisplay amount={price.amount} prefix={price.prefix} />}
    </div>
  );
}
