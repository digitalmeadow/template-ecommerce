"use client";

import { useEffect, useRef } from "react";
import { trackProductView, type AnalyticsProduct } from "@/lib/analytics/track";
import type { Variant } from "@/lib/shopify/variants";

interface Props {
  product: AnalyticsProduct;
  variant: Variant | undefined;
  // False until the URL's selection is applied, so the view reports the variant the page settles on.
  isReady: boolean;
}

// One product view per page.
export default function ProductAnalytics({ product, variant, isReady }: Props) {
  const isTracked = useRef(false);

  useEffect(() => {
    if (!isReady || !variant || isTracked.current) return;
    isTracked.current = true;
    trackProductView(product, variant);
  }, [product, variant, isReady]);

  return null;
}
