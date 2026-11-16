"use client";

import { setCartOpen } from "@/stores/ui";

export default function DemoCartOpen() {
  return (
    <button className="g-button" type="button" onClick={() => setCartOpen(true)}>
      Open cart
    </button>
  );
}
