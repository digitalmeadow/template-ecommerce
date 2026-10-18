"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { useStore } from "@nanostores/react";
import Overlay from "@/layouts/Overlay";
import CartLineItem from "./CartLineItem";
import PriceDisplay from "@/blocks/PriceDisplay";
import type { CartLineFragment } from "shopify/generated/graphql";
import {
  $cartCount,
  $cartTotal,
  $checkoutUrl,
  $cartLines,
  $cartError,
  loadCart,
} from "@/stores/cart";
import { $cartOpen, setCartOpen } from "@/stores/ui";
import { cn } from "@/lib/utils";

interface Props {
  emptyMessage: ReactNode;
  note: ReactNode;
}

// The stored cart loads before hydration, so hydrate with the server's empty cart (stable reference).
const NO_LINES: CartLineFragment[] = [];

// Portable Text resolves links server-side, so it arrives pre-rendered.
export default function CartClient({ emptyMessage, note }: Props) {
  const count = useStore($cartCount, { ssr: () => 0 });
  const total = useStore($cartTotal, { ssr: () => null });
  const checkoutUrl = useStore($checkoutUrl, { ssr: () => null });
  const lines = useStore($cartLines, { ssr: () => NO_LINES });
  const error = useStore($cartError);
  const open = useStore($cartOpen);
  const isEmpty = lines.length === 0;

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = useCallback(() => {
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  }, [checkoutUrl]);

  return (
    <Overlay
      id="cart"
      open={open}
      onClose={() => setCartOpen(false)}
      layout="right"
      ariaLabel="Shopping Cart"
    >
      <div className="header mb-[var(--s40)]">
        <h2>
          Your Cart <span data-cart-count>({count})</span>
        </h2>
      </div>

      <div className="cart h-full" data-state={isEmpty ? "empty" : "loaded"}>
        <div className="cart-content flex h-full w-full flex-col gap-[var(--s40)]">
          <div className={isEmpty ? "block" : "hidden"}>{emptyMessage}</div>

          <ul className={cn("cart-line-items flex flex-col gap-[var(--s24)]", isEmpty && "hidden")}>
            {lines.map((line) => (
              <CartLineItem key={line.id} line={line} />
            ))}
          </ul>

          <div className={isEmpty ? "hidden" : ""}>
            <span>
              Total:{" "}
              {total ? <PriceDisplay amount={total.amount} currency={total.currencyCode} /> : null}
            </span>
          </div>

          <div className="footer mt-auto">
            {/* Always mounted so screen readers announce changes to it. */}
            <p role="alert" className="cart-error empty:hidden">
              {error}
            </p>

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
