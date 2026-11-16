import { predictiveSearchQuery } from "shopify/queries/search";
import { PRIVATE_CACHE_CONTROL } from "@/lib/responses";
import { getLocale } from "@/lib/shopify/locale";
import { createBuyerShopifyClient } from "@/lib/shopify/serverClient";

const RESULTS_PER_TYPE = 5;

// Results for the header search as you type (`?q=&locale=`).
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const locale = getLocale(url.searchParams.get("locale") ?? undefined);

  const { predictiveSearch } = query
    ? await createBuyerShopifyClient(request).request(predictiveSearchQuery, {
        query,
        limit: RESULTS_PER_TYPE,
        country: locale.country,
        language: locale.language,
      })
    : { predictiveSearch: null };

  return Response.json(
    {
      query,
      queries: predictiveSearch?.queries ?? [],
      products: predictiveSearch?.products ?? [],
      collections: predictiveSearch?.collections ?? [],
    },
    { headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
  );
}
