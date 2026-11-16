import { cartCheckoutUrlQuery } from "shopify/queries/cart";
import { PRIVATE_CACHE_CONTROL } from "@/lib/responses";
import { readCartId } from "@/lib/shopify/cartCookie";
import { createBuyerShopifyClient } from "@/lib/shopify/serverClient";

// Fetched fresh on every visit: Shopify's checkout URL can change with the cart and with consent.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const home = () => Response.redirect(new URL("/", url), 302);

  const cartId = readCartId(request.headers.get("cookie"));
  if (!cartId) return home();

  try {
    const { cart } = await createBuyerShopifyClient(request).request(cartCheckoutUrlQuery, {
      cartId,
    });
    if (!cart || cart.totalQuantity === 0) return home();

    const checkoutUrl = new URL(cart.checkoutUrl);
    url.searchParams.forEach((value, key) => checkoutUrl.searchParams.set(key, value));
    return new Response(null, {
      status: 302,
      headers: { location: checkoutUrl.href, "cache-control": PRIVATE_CACHE_CONTROL },
    });
  } catch (error) {
    console.error("Checkout redirect failed:", error);
    return new Response("Checkout is unavailable. Please try again.", {
      status: 502,
      headers: { "cache-control": PRIVATE_CACHE_CONTROL },
    });
  }
}
