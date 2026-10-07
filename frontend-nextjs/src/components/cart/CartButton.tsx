"use client";

import { useStore } from "@nanostores/react";
import { $cartCount } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";

export default function CartButton() {
  const count = useStore($cartCount);

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
