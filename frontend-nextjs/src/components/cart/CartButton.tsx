"use client";

import { useStore } from "@nanostores/react";
import { $cartCount } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";

export default function CartButton() {
  // The snapshot is read from localStorage before hydration; render the server's empty count until then.
  const count = useStore($cartCount, { ssr: () => 0 });

  return (
    <button
      className="cart-button inline-flex items-center gap-[1ch] justify-self-end"
      type="button"
      aria-label="Toggle cart"
      onClick={() => setCartOpen(true)}
    >
      Cart<span>({count})</span>
    </button>
  );
}
