import type { ShopifyClient } from "shopify/client";
import { urlRedirectByPathQuery } from "shopify/queries/urlRedirects";

const REDIRECT_CACHE_SECONDS = 60 * 60;

// Shopify's default storefront paths, so links from old Liquid themes and Shopify emails still land.
const STANDARD_PATHS: [RegExp, (match: RegExpMatchArray) => string][] = [
  [/^\/pages\/([^/]+)\/?$/, (match) => `/${match[1]}`],
  [/^\/collections\/[^/]+\/products\/([^/]+)\/?$/, (match) => `/products/${match[1]}`],
];

export function findStandardPathRedirect(pathname: string): string | null {
  for (const [pattern, toPath] of STANDARD_PATHS) {
    const match = pathname.match(pattern);
    if (match) return toPath(match);
  }
  return null;
}

/**
 * The store's URL redirects (Shopify admin → Navigation → URL redirects). Cached per path at the
 * edge, misses included, so a burst of 404s doesn't become a burst of Storefront requests.
 */
export async function findShopifyRedirect(
  pathname: string,
  shopify: ShopifyClient,
): Promise<string | null> {
  const path = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const cache = (globalThis.caches as { default?: Cache } | undefined)?.default;
  const cacheKey = new Request(`https://url-redirects.internal${path}`);

  const cached = await cache?.match(cacheKey);
  if (cached) return (await cached.json()) as string | null;

  let target: string | null;
  try {
    const { urlRedirects } = await shopify.request(urlRedirectByPathQuery, {
      query: `path:${path}`,
    });
    target = urlRedirects.nodes[0]?.target ?? null;
  } catch (error) {
    console.error(`URL redirect lookup failed for ${path}:`, error);
    return null;
  }

  await cache?.put(
    cacheKey,
    new Response(JSON.stringify(target), {
      headers: { "cache-control": `max-age=${REDIRECT_CACHE_SECONDS}` },
    }),
  );
  return target;
}
