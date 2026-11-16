import type { APIRoute } from "astro";
import { cartCheckoutUrlQuery } from "shopify/queries/cart";
import { PRIVATE_CACHE_CONTROL } from "@lib/responses";
import { readCartId } from "@lib/shopify/cartCookie";
import { createBuyerShopifyClient } from "@lib/shopify/serverClient";

export const prerender = false;

// Fetched fresh on every visit: Shopify's checkout URL can change with the cart and with consent.
export const GET: APIRoute = async ({ request, url, redirect }) => {
  const cartId = readCartId(request.headers.get("cookie"));
  if (!cartId) return redirect("/", 302);

  try {
    const { cart } = await createBuyerShopifyClient(request).request(cartCheckoutUrlQuery, {
      cartId,
    });
    if (!cart || cart.totalQuantity === 0) return redirect("/", 302);

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
};
