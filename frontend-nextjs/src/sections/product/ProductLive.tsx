"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/shopify/locale";
import type { LiveVariant } from "@/lib/shopify/variants";

export interface ProductLiveData {
  availableForSale: boolean;
  variants: LiveVariant[];
}

interface Props {
  handle: string;
  locale: Locale;
  onLiveData: (data: ProductLiveData) => void;
}

// Product pages are static; this swaps in live price and stock for the page's market. The
// built values stay on screen until it lands (and if it fails), so nothing flashes.
export default function ProductLive({ handle, locale, onLiveData }: Props) {
  useEffect(() => {
    const controller = new AbortController();
    const search = new URLSearchParams({ handle, locale: locale.path });

    fetch(`/api/product?${search}`, { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<ProductLiveData>) : null))
      .then((data) => data && onLiveData(data))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error("Live product data failed:", error);
      });

    return () => controller.abort();
  }, [handle, locale, onLiveData]);

  return null;
}
