"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { useStore } from "@nanostores/react";
import Overlay from "@/layouts/Overlay";
import CartLineItem from "./CartLineItem";
import PriceDisplay from "@/blocks/PriceDisplay";
import {
  $cartCount,
  $cartTotal,
  $checkoutUrl,
  $cartLines,
  loadCart,
} from "@/stores/cart";
import { cn } from "@/lib/utils";

interface Props {
  emptyMessage: ReactNode;
  note: ReactNode;
}

// Portable Text resolves links server-side, so it arrives pre-rendered.
export default function CartClient({ emptyMessage, note }: Props) {
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
          <div className={isEmpty ? "block" : "hidden"}>{emptyMessage}</div>

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
            {note && <div data-cart-note>{note}</div>}

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
