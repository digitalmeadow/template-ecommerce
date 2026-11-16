import { ShopifyError } from "shopify/client";
import { PRIVATE_CACHE_CONTROL } from "@/lib/responses";
import { parseCartForm, type CartRequestBody, type CartResult } from "@/lib/shopify/cartActions";
import {
  readCartId,
  serializeCartCookie,
  serializeExpiredCartCookie,
} from "@/lib/shopify/cartCookie";
import { performCartAction } from "@/lib/shopify/cartServer";
import { getLocale } from "@/lib/shopify/locale";
import { createBuyerShopifyClient } from "@/lib/shopify/serverClient";

// The current cart, moved to `?locale=`'s market if it was created in another.
export function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale") ?? "";
  return respond(request, { locale }, false);
}

// One cart action, as JSON from the cart store or a native form post (redirects back).
export async function POST(request: Request) {
  const isForm = !request.headers.get("content-type")?.includes("application/json");
  // Next has no built-in origin check: a cross-site form post could otherwise edit the buyer's cart.
  if (isForm && !isSameOrigin(request)) {
    return Response.json(
      { error: "Cross-site cart request" },
      { status: 403, headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
    );
  }

  let body: CartRequestBody;
  try {
    body = isForm
      ? parseCartForm(await request.formData())
      : ((await request.json()) as CartRequestBody);
  } catch {
    return Response.json(
      { error: "Malformed cart request" },
      { status: 400, headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
    );
  }
  return respond(request, body, isForm);
}

async function respond(
  request: Request,
  body: CartRequestBody,
  isForm: boolean,
): Promise<Response> {
  const url = new URL(request.url);
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

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

function sameOriginReferer(request: Request, url: URL): string {
  const referer = request.headers.get("referer");
  if (!referer) return "/";
  const refererUrl = new URL(referer, url);
  return refererUrl.origin === url.origin ? `${refererUrl.pathname}${refererUrl.search}` : "/";
}
