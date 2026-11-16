import Cart from "@/components/cart/Cart";
import { cart } from "../fixtures/settings";
import DemoCartOpen from "./DemoCartOpen";

// The drawer with this browser's real cart (from /api/cart), opened from a button as the header does.
export default function DemoCart() {
  return (
    <>
      <div className="g-page-margin g-section-md">
        <DemoCartOpen />
      </div>
      <Cart cart={cart} />
    </>
  );
}
