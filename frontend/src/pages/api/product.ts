import type { APIRoute } from "astro";
import { productLiveByHandleQuery } from "shopify/queries/product";
import { getLocale } from "@lib/shopify/locale";
import { createBuyerShopifyClient } from "@lib/shopify/serverClient";

export const prerender = false;

const CACHE_SECONDS = 60;

// Live price and stock for a static product page (`?handle=&locale=`). Edge-cached briefly, so a
// launch hitting one product makes one Storefront request a minute per data centre, not one per visit.
export const GET: APIRoute = async ({ request, url }) => {
  const handle = url.searchParams.get("handle");
  if (!handle) return Response.json({ error: "Missing handle" }, { status: 400 });

  const locale = getLocale(url.searchParams.get("locale") ?? undefined);
  const cache = (globalThis.caches as { default?: Cache } | undefined)?.default;
  const cacheKey = new Request(
    `${url.origin}${url.pathname}?handle=${encodeURIComponent(handle)}&locale=${locale.path}`,
  );

  const cached = await cache?.match(cacheKey);
  if (cached) return cached;

  try {
    const { product } = await createBuyerShopifyClient(request).request(productLiveByHandleQuery, {
      handle,
      country: locale.country,
      language: locale.language,
    });
    if (!product) return Response.json({ error: "Not found" }, { status: 404 });

    const response = Response.json(
      { availableForSale: product.availableForSale, variants: product.variants.nodes },
      { headers: { "cache-control": `public, max-age=${CACHE_SECONDS}` } },
    );
    await cache?.put(cacheKey, response.clone());
    return response;
  } catch (error) {
    console.error(`Live product lookup failed for ${handle}:`, error);
    return Response.json({ error: "Unavailable" }, { status: 502 });
  }
};
