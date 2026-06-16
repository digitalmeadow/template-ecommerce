"use client";

import { useEffect, useCallback } from "react";
import { useStore } from "@nanostores/react";
import Overlay from "@/layouts/Overlay";
import CartLineItem from "./CartLineItem";
import PriceDisplay from "@/blocks/PriceDisplay";
import PortableText from "@/fields/PortableText";
import {
  $cartCount,
  $cartTotal,
  $checkoutUrl,
  $cartLines,
  loadCart,
} from "@/stores/cart";
import { cn } from "@/lib/utils";
import type { CartFragment } from "sanity-nextjs/generated/graphql";

interface Props {
  cartData: CartFragment | null;
}

export default function CartClient({ cartData }: Props) {
  const count = useStore($cartCount);
  const total = useStore($cartTotal);
  const checkoutUrl = useStore($checkoutUrl);
  const lines = useStore($cartLines);

  const isEmpty = lines.length === 0;

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = useCallback(() => {
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  }, [checkoutUrl]);

  return (
    <Overlay id="cart" layout="right" ariaLabel="Shopping Cart">
      <div className="header mb-[var(--s40)]">
        <h2>
          Your Cart <span data-cart-count>({count})</span>
        </h2>
      </div>

      <div className="cart h-full" data-state={isEmpty ? "empty" : "loaded"}>
        <div className="cart-content flex h-full w-full flex-col gap-[var(--s40)]">
          <div className={isEmpty ? "block" : "hidden"}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PortableText value={cartData?.emptyMessageRaw as any} />
          </div>

          <ul
            className={cn(
              "cart-line-items flex flex-col gap-[var(--s24)]",
              isEmpty && "hidden",
            )}
          >
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>

          <div className={isEmpty ? "hidden" : ""}>
            <span>
              Total:{" "}
              {total ? (
                <PriceDisplay
                  amount={total.amount}
                  currency={total.currencyCode}
                />
              ) : null}
            </span>
          </div>

          <div className="footer mt-auto">
            {!!cartData?.noteRaw && (
              <div data-cart-note>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <PortableText value={cartData.noteRaw as any} />
              </div>
            )}

            <button
              type="button"
              className={cn(
                "text-link checkout-button mt-[var(--s40)] self-start",
                !checkoutUrl && "cursor-not-allowed opacity-50",
              )}
              onClick={handleCheckout}
              disabled={!checkoutUrl}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
