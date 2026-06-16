"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { CartLineFragment } from "shopify/generated/graphql";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { getStoredLocale } from "@/lib/shopify/locale.client";
import { getCurrency } from "@/lib/shopify/locale";
import { updateLineQuantity, removeLine } from "@/stores/cart";
import QuantitySelector from "@/blocks/QuantitySelector";
import PriceDisplay from "@/blocks/PriceDisplay";
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
    variantTitle === "Default Title" &&
    product.variants?.edges?.length === 1;

  const variantImage =
    merchandise.image ?? product.variants?.edges?.[0]?.node?.image;
  const imageUrl = variantImage?.url
    ? `${variantImage.url}?w=120&h=120&fit=crop&auto=format`
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

  const compareAtAmount = compareAtPrice
    ? Number(compareAtPrice.amount) * quantity
    : null;

  return (
    <li
      className={cn(
        "cart-line-item",
        "grid grid-cols-[auto_1fr] gap-[var(--gutter)] w-full",
        isRemoving && "opacity-50 pointer-events-none",
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
            className="w-16 h-16 object-cover bg-[var(--color-text)]"
          />
        ) : (
          <div className="w-16 h-16 bg-[var(--color-text)]" />
        )}
      </Link>

      <div className="info flex flex-col gap-[var(--s4)]">
        <Link href={productHref} className="text-link-wrapper">
          <div>
            <span className="product-title">{product.title}</span>
            <span
              className={cn(
                "variant-title",
                isSingleDefaultVariant && "hidden",
              )}
            >
              {" "}
              {variantTitle}
            </span>
          </div>
        </Link>

        <div className="inventory flex items-center gap-[var(--s16)] flex-wrap">
          <div
            {...(isUpdating ? { "data-state": "updating" } : {})}
          >
            <QuantitySelector
              initial={quantity}
              onChange={handleQuantityChange}
            />
          </div>
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
              currency={compareAtPrice?.currencyCode ?? getCurrency(getStoredLocale())}
              variant="compare-at"
            />
          )}
          <PriceDisplay
            amount={String(cost.totalAmount.amount ?? 0)}
            currency={cost.totalAmount.currencyCode ?? getCurrency(getStoredLocale())}
          />
        </div>
      </div>
    </li>
  );
}
