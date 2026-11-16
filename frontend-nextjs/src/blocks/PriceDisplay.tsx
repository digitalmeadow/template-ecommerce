"use client";

import { getHtmlLang } from "@/lib/shopify/locale";
import { formatMoney } from "@/lib/shopify/money";
import { useLocale } from "@/lib/shopify/useLocale";
import { cn } from "@/lib/utils";

interface Props {
  kind?: "standard" | "compare-at";
  amount?: string;
  currency?: string;
  prefix?: string;
  className?: string;
}

export default function PriceDisplay({
  kind = "standard",
  amount,
  currency,
  prefix,
  className,
}: Props) {
  const locale = useLocale();
  const formatted = amount && currency ? formatMoney(amount, currency, getHtmlLang(locale)) : "";

  return (
    <span
      className={cn(
        "price-display inline-flex gap-x-[1ch]",
        kind === "compare-at" && "text-text-muted line-through",
        className,
      )}
      data-kind={kind}
    >
      {prefix && <span>{prefix}</span>}
      <span>{formatted}</span>
    </span>
  );
}
