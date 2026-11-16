import type { ShopifyClient } from "shopify/client";
import type { ProductFilterGroupFragment } from "shopify/generated/graphql";
import { collectionByHandleQuery } from "shopify/queries/collection";
import { searchProductsQuery } from "shopify/queries/search";
import {
  pairProductThumbnails,
  type ProductThumbnailShopifySanity,
  type SanityProductThumbnails,
} from "@lib/fetches/productShopifySanity";
import {
  COLLECTION_SORT_OPTIONS,
  findSortOption,
  parseFilters,
  PRODUCTS_PER_PAGE,
  SEARCH_SORT_OPTIONS,
} from "@lib/shopify/filters";
import type { Locale } from "@lib/shopify/locale";

export type ProductBrowserSource =
  { type: "collection"; handle: string } | { type: "search"; query: string };

export interface ProductBrowserResults {
  products: ProductThumbnailShopifySanity[];
  filters: ProductFilterGroupFragment[];
  hasNextPage: boolean;
  endCursor: string | null;
  totalCount?: number;
}

export const EMPTY_PRODUCT_BROWSER_RESULTS: ProductBrowserResults = {
  products: [],
  filters: [],
  hasNextPage: false,
  endCursor: null,
};

/** One page of a collection or search, filtered and sorted by the URL's Liquid parameters. */
export async function fetchProductBrowserResults(
  shopify: ShopifyClient,
  locale: Locale,
  source: ProductBrowserSource,
  params: URLSearchParams,
  sanityThumbnails: SanityProductThumbnails,
): Promise<ProductBrowserResults | null> {
  const page = {
    first: PRODUCTS_PER_PAGE,
    after: params.get("after"),
    filters: parseFilters(params),
    country: locale.country,
    language: locale.language,
  };

  if (source.type === "collection") {
    const { sortKey, reverse } = findSortOption(COLLECTION_SORT_OPTIONS, params.get("sort_by"));
    const { collection } = await shopify.request(collectionByHandleQuery, {
      ...page,
      handle: source.handle,
      sortKey,
      reverse,
    });
    if (!collection) return null;
    return {
      products: pairProductThumbnails(collection.products.nodes, sanityThumbnails),
      filters: collection.products.filters,
      hasNextPage: collection.products.pageInfo.hasNextPage,
      endCursor: collection.products.pageInfo.endCursor ?? null,
    };
  }

  if (!source.query) return EMPTY_PRODUCT_BROWSER_RESULTS;
  const { sortKey, reverse } = findSortOption(SEARCH_SORT_OPTIONS, params.get("sort_by"));
  const { search } = await shopify.request(searchProductsQuery, {
    ...page,
    query: source.query,
    sortKey,
    reverse,
  });
  const cards = search.nodes.flatMap((node) => (node.__typename === "Product" ? [node] : []));
  return {
    products: pairProductThumbnails(cards, sanityThumbnails),
    filters: search.productFilters,
    hasNextPage: search.pageInfo.hasNextPage,
    endCursor: search.pageInfo.endCursor ?? null,
    totalCount: search.totalCount,
  };
}
