import type { ProductThumbnailFragment } from "sanity-nextjs/generated/graphql";
import { loadBuildJson } from "@/lib/buildAssets";
import {
  fetchProductBrowserResults,
  type ProductBrowserSource,
} from "@/lib/fetches/productBrowser";
import { PRIVATE_CACHE_CONTROL } from "@/lib/responses";
import { getLocale } from "@/lib/shopify/locale";
import { createBuyerShopifyClient } from "@/lib/shopify/serverClient";

// A collection (`?handle=`) or search (`?q=`) page filtered by the URL's Liquid parameters, for
// ProductBrowser to render. Never calls Sanity: thumbnails come from the build's JSON.
export async function GET(request: Request) {
  const params = new URLSearchParams(new URL(request.url).searchParams);
  const handle = params.get("handle");
  const locale = getLocale(params.get("locale") ?? undefined);
  for (const name of ["handle", "locale"]) params.delete(name);

  const source: ProductBrowserSource = handle
    ? { type: "collection", handle }
    : { type: "search", query: params.get("q")?.trim() ?? "" };

  const thumbnails = await loadBuildJson<Record<string, ProductThumbnailFragment>>(
    "/product-thumbnails.json",
    request.url,
  );
  const results = await fetchProductBrowserResults(
    createBuyerShopifyClient(request),
    locale,
    source,
    params,
    new Map(Object.entries(thumbnails)),
  );
  if (!results) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(results, { headers: { "cache-control": PRIVATE_CACHE_CONTROL } });
}
