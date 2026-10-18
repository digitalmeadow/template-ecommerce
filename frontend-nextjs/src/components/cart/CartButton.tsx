"use client";

import { useStore } from "@nanostores/react";
import { $cartCount } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";

export default function CartButton() {
  // The stored cart is read before hydration; render the server's empty count until hydrated.
  const count = useStore($cartCount, { ssr: () => 0 });

  return (
    <button
      type="button"
      className="cart-button inline-flex items-center gap-[1ch] justify-self-end"
      aria-label="Toggle cart"
      onClick={() => setCartOpen(true)}
    >
      Cart<span className="cart-count">({count})</span>
    </button>
  );
}
