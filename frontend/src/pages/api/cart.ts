import type { APIContext, APIRoute } from "astro";
import { ShopifyError } from "shopify/client";
import { PRIVATE_CACHE_CONTROL } from "@lib/responses";
import { parseCartForm, type CartRequestBody, type CartResult } from "@lib/shopify/cartActions";
import {
  readCartId,
  serializeCartCookie,
  serializeExpiredCartCookie,
} from "@lib/shopify/cartCookie";
import { performCartAction } from "@lib/shopify/cartServer";
import { getLocale } from "@lib/shopify/locale";
import { createBuyerShopifyClient } from "@lib/shopify/serverClient";

export const prerender = false;

// The current cart, moved to `?locale=`'s market if it was created in another.
export const GET: APIRoute = (context) => {
  const locale = context.url.searchParams.get("locale") ?? "";
  return respond(context, { locale }, false);
};

// One cart action, as JSON from the cart store or a native form post (redirects back).
export const POST: APIRoute = async (context) => {
  const isForm = !context.request.headers.get("content-type")?.includes("application/json");
  let body: CartRequestBody;
  try {
    body = isForm
      ? parseCartForm(await context.request.formData())
      : ((await context.request.json()) as CartRequestBody);
  } catch {
    return Response.json(
      { error: "Malformed cart request" },
      { status: 400, headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
    );
  }
  return respond(context, body, isForm);
};

async function respond(
  context: APIContext,
  body: CartRequestBody,
  isForm: boolean,
): Promise<Response> {
  const { request, url } = context;
  const cartId = readCartId(request.headers.get("cookie"));

  let result: CartResult;
  try {
    result = await performCartAction(
      createBuyerShopifyClient(request),
      getLocale(body.locale),
      cartId,
      body.action,
    );
  } catch (error) {
    console.error("Cart request failed:", error);
    const status = error instanceof ShopifyError && error.status === 429 ? 429 : 502;
    return Response.json(
      { error: "Cart unavailable" },
      { status, headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
    );
  }

  const headers = new Headers({ "cache-control": PRIVATE_CACHE_CONTROL });
  if (result.cart && result.cart.id !== cartId) {
    headers.append("set-cookie", serializeCartCookie(result.cart.id, url));
  } else if (!result.cart && cartId) {
    headers.append("set-cookie", serializeExpiredCartCookie());
  }

  if (isForm) {
    headers.set("location", sameOriginReferer(request, url));
    return new Response(null, { status: 303, headers });
  }
  return Response.json(result, { headers });
}

function sameOriginReferer(request: Request, url: URL): string {
  const referer = request.headers.get("referer");
  if (!referer) return "/";
  const refererUrl = new URL(referer, url);
  return refererUrl.origin === url.origin ? `${refererUrl.pathname}${refererUrl.search}` : "/";
}
