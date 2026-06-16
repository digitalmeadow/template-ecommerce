"use client";

import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $cartCount, loadCart } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";

export default function CartButton() {
  const count = useStore($cartCount);

  useEffect(() => {
    loadCart();
  }, []);

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
