"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { CartLineFragment } from "shopify/generated/graphql";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { updateLineQuantity, removeLine } from "@/stores/cart";
import QuantitySelector from "@/blocks/QuantitySelector";
import PriceDisplay from "@/blocks/PriceDisplay";
import { DEFAULT_VARIANT_TITLE } from "@/lib/shopify/variants";
import { cn } from "@/lib/utils";

interface Props {
  line: CartLineFragment;
  className?: string;
}

export default function CartLineItem({ line, className }: Props) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { merchandise, quantity, cost, id } = line;
  const { product, title: variantTitle, compareAtPrice } = merchandise;

  const isSingleDefaultVariant =
    variantTitle === DEFAULT_VARIANT_TITLE && product.variants?.edges?.length === 1;

  const variantImage = merchandise.image ?? product.variants?.edges?.[0]?.node?.image;
  // Shopify CDN resize params; imgix-style ones are ignored
  const imageUrl = variantImage?.url
    ? `${variantImage.url}${variantImage.url.includes("?") ? "&" : "?"}width=128&height=128&crop=center`
    : undefined;

  const productHref = resolveSanityHref("product", product.handle);

  const handleQuantityChange = useCallback(
    async (newQuantity: number) => {
      setIsUpdating(true);
      document.body.style.cursor = "wait";
      try {
        await updateLineQuantity(id, newQuantity);
      } catch (error) {
        console.error("Failed to update cart quantity", error);
      } finally {
        document.body.style.cursor = "";
        setIsUpdating(false);
      }
    },
    [id],
  );

  const handleRemove = useCallback(async () => {
    setIsRemoving(true);
    document.body.style.cursor = "wait";
    try {
      await removeLine(id);
    } catch (error) {
      console.error("Failed to remove cart line", error);
      setIsRemoving(false);
    } finally {
      document.body.style.cursor = "";
    }
  }, [id]);

  const compareAtAmount = compareAtPrice ? Number(compareAtPrice.amount) * quantity : null;

  return (
    <li
      className={cn(
        "cart-line-item",
        "grid w-full grid-cols-[auto_1fr] gap-[var(--gutter)]",
        isRemoving && "pointer-events-none opacity-50",
        className,
      )}
    >
      <Link href={productHref} className="thumbnail">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 bg-foreground object-cover"
          />
        ) : (
          <div className="h-16 w-16 bg-foreground" />
        )}
      </Link>

      <div className="info flex flex-col gap-[var(--s4)]">
        <Link href={productHref} className="text-link-wrapper">
          <div className="titles flex flex-wrap gap-x-[1ch]">
            <span className="product-title">{product.title}</span>
            <span className={cn("variant-title", isSingleDefaultVariant && "hidden")}>
              {variantTitle}
            </span>
          </div>
        </Link>

        <div className="inventory flex flex-wrap items-center gap-[var(--s16)]">
          <QuantitySelector
            initial={quantity}
            updating={isUpdating}
            onChange={handleQuantityChange}
          />
          <button
            type="button"
            className="text-link underline-color-orange remove-button self-start"
            aria-label="Remove item from cart"
            onClick={handleRemove}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing" : "Remove"}
          </button>
        </div>

        <div className="prices">
          {compareAtAmount != null && (
            <PriceDisplay
              amount={String(compareAtAmount)}
              currency={compareAtPrice?.currencyCode}
              variant="compare-at"
            />
          )}
          <PriceDisplay
            amount={String(cost.totalAmount.amount ?? 0)}
            currency={cost.totalAmount.currencyCode}
          />
        </div>
      </div>
    </li>
  );
}
