import { SHOPIFY_PRIVATE_API_TOKEN } from "astro:env/server";
import { SHOPIFY_STORE_DOMAIN } from "shopify/config";
import { PRIVATE_CACHE_CONTROL } from "@lib/responses";
import { getBuyerIp } from "@lib/shopify/serverClient";

const TIMEOUT_MS = 30_000;

// Allowlist: anything else the browser sends (including a token of its own) never reaches Shopify.
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "cookie",
  "origin",
  "referer",
  "user-agent",
  "sec-gpc",
  "shopify-storefront-consent-management",
  "x-shopify-uniquetoken",
  "x-shopify-visittoken",
];

const DROPPED_RESPONSE_HEADERS = [
  "content-encoding",
  "content-length",
  "server-timing",
  "access-control-allow-origin",
  "set-cookie",
];

/**
 * Forwards a browser Storefront API request to the store with the private token and buyer IP.
 * Shopify's session cookies are only passed back on POSTs that already hold a session or are
 * the consent script's explicit consent request, which is how Shopify expects cold sessions to start.
 */
export async function proxyStorefrontRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // JSONP would let another origin read Storefront responses.
  if (url.searchParams.has("callback")) return jsonError("JSONP is not supported", 400);

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set("Shopify-Storefront-Private-Token", SHOPIFY_PRIVATE_API_TOKEN);
  headers.set("Sec-Shopify-Storefront-Origin", url.origin);
  const buyerIp = getBuyerIp(request);
  if (buyerIp) headers.set("Shopify-Storefront-Buyer-IP", buyerIp);

  let upstream: Response;
  try {
    upstream = await fetch(`https://${SHOPIFY_STORE_DOMAIN}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: request.method === "POST" ? await request.arrayBuffer() : undefined,
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    console.error("Storefront API proxy request failed:", error);
    return jsonError("Storefront API unavailable", 502);
  }

  const responseHeaders = new Headers(upstream.headers);
  for (const name of DROPPED_RESPONSE_HEADERS) responseHeaders.delete(name);

  const cookies = upstream.headers.getSetCookie();
  const isConsentRequest = request.headers.get("shopify-storefront-consent-management") === "1";
  const hasSession = /(?:^|;\s*)_shopify_essential=/.test(request.headers.get("cookie") ?? "");
  if (request.method === "POST" && (isConsentRequest || hasSession)) {
    for (const cookie of cookies) responseHeaders.append("set-cookie", cookie);
  }
  if (cookies.length > 0 || isConsentRequest) {
    responseHeaders.set("cache-control", PRIVATE_CACHE_CONTROL);
  }

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json", "cache-control": PRIVATE_CACHE_CONTROL },
  });
}
