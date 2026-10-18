"use client";

import { getStoredLocale } from "@/lib/shopify/locale.client";
import { DEFAULT_LOCALE, getCurrency } from "@/lib/shopify/locale";
import { useBrowserValue } from "@/lib/useBrowserValue";
import { cn } from "@/lib/utils";

interface Props {
  amount?: string;
  currency?: string;
  variant?: "standard" | "compare-at";
  prefix?: string;
  className?: string;
}

export default function PriceDisplay({
  amount,
  currency,
  variant = "standard",
  prefix,
  className,
}: Props) {
  const locale = useBrowserValue(getStoredLocale, DEFAULT_LOCALE);
  const currencyCode = currency || getCurrency(locale);

  const numericAmount = Number(amount || 0);

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "code",
  }).format(numericAmount);

  return (
    <span
      className={cn("inline-flex gap-[1ch]", className)}
      data-variant={variant}
      data-prefixed={prefix ? "true" : undefined}
    >
      {prefix && <span data-price-prefix>{prefix}</span>}
      <span data-price-value className={cn(variant === "compare-at" && "line-through opacity-70")}>
        {formatted}
      </span>
    </span>
  );
}
