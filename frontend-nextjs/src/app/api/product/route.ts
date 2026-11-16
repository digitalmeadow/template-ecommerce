import { productLiveByHandleQuery } from "shopify/queries/product";
import { getLocale } from "@/lib/shopify/locale";
import { createBuyerShopifyClient } from "@/lib/shopify/serverClient";

const CACHE_SECONDS = 60;

// Live price and stock for a static product page (`?handle=&locale=`). CDN-cached briefly, so a
// launch hitting one product makes one Storefront request a minute per region, not one per visit.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const handle = url.searchParams.get("handle");
  if (!handle) return Response.json({ error: "Missing handle" }, { status: 400 });

  const locale = getLocale(url.searchParams.get("locale") ?? undefined);

  try {
    const { product } = await createBuyerShopifyClient(request).request(productLiveByHandleQuery, {
      handle,
      country: locale.country,
      language: locale.language,
    });
    if (!product) return Response.json({ error: "Not found" }, { status: 404 });

    return Response.json(
      { availableForSale: product.availableForSale, variants: product.variants.nodes },
      {
        headers: {
          "cache-control": `public, max-age=${CACHE_SECONDS}`,
          "cdn-cache-control": `public, s-maxage=${CACHE_SECONDS}`,
        },
      },
    );
  } catch (error) {
    console.error(`Live product lookup failed for ${handle}:`, error);
    return Response.json({ error: "Unavailable" }, { status: 502 });
  }
}
