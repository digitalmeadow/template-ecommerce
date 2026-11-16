"use client";

import Link from "next/link";
import type { CartLineFragment } from "shopify/generated/graphql";
import PriceDisplay from "@/blocks/PriceDisplay";
import QuantitySelector from "@/blocks/QuantitySelector";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import type { CartMessage } from "@/lib/shopify/cartActions";
import { localizeHref } from "@/lib/shopify/locale";
import { useLocale } from "@/lib/shopify/useLocale";
import { DEFAULT_VARIANT_TITLE } from "@/lib/shopify/variants";
import { cn } from "@/lib/utils";
import { removeLine, updateLineQuantity } from "@/stores/cart";

interface Props {
  line: CartLineFragment;
  messages: CartMessage[];
  isPending: boolean;
}

export default function CartLineItem({ line, messages, isPending }: Props) {
  const locale = useLocale();
  const { merchandise, quantity, cost, id } = line;
  const { product, title: variantTitle, image: variantImage, quantityAvailable } = merchandise;

  const href = localizeHref(resolveSanityHref("product", product.handle), locale);
  const imageUrl = variantImage?.thumbnailUrl ?? product.featuredImage?.thumbnailUrl;
  // Null when inventory isn't tracked or the token can't read it.
  const max =
    quantityAvailable != null && quantityAvailable > 0
      ? Math.max(quantityAvailable, quantity)
      : undefined;

  const compareAt = cost.compareAtAmountPerQuantity;
  const isDiscounted =
    !!compareAt && Number(compareAt.amount) > Number(cost.amountPerQuantity.amount);
  const message = messages.map((lineMessage) => lineMessage.message).join(" ");

  return (
    <div className="cart-line-item grid grid-cols-[auto_minmax(0,1fr)] gap-(--gutter)">
      <Link className="size-16 bg-surface" href={href}>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- Shopify's CDN already sizes it.
          <img className="size-full object-cover" src={imageUrl} alt="" />
        )}
      </Link>

      <div className="flex flex-col gap-1">
        <Link href={href}>
          <div className="flex flex-wrap gap-x-[1ch]">
            <span>{product.title}</span>
            {variantTitle !== DEFAULT_VARIANT_TITLE && (
              <span className="text-text-muted">{variantTitle}</span>
            )}
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <QuantitySelector
            key={`${quantity}:${max}`}
            initial={quantity}
            max={max}
            onChange={(value) => updateLineQuantity(id, value)}
          />
          <button
            className="self-start g-text-link g-underline-orange"
            type="button"
            aria-label="Remove item from cart"
            disabled={isPending}
            onClick={() => removeLine(id)}
          >
            Remove
          </button>
        </div>

        <p className="g-form-error empty:hidden" role="status">
          {message}
        </p>

        <div className={cn(isPending && "opacity-(--opacity-disabled)")}>
          {compareAt && isDiscounted && (
            <div>
              <PriceDisplay
                kind="compare-at"
                amount={String(Number(compareAt.amount) * quantity)}
                currency={compareAt.currencyCode}
              />
            </div>
          )}
          <PriceDisplay amount={cost.totalAmount.amount} currency={cost.totalAmount.currencyCode} />
        </div>
      </div>
    </div>
  );
}
