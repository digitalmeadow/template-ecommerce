import type {
  ProductCollectionSortKeys,
  ProductFilter,
  SearchSortKeys,
} from "shopify/generated/graphql";

// URLs use Shopify's Liquid filter and sort parameters (`filter.p.vendor=Acme`,
// `filter.v.price.gte=10`, `sort_by=price-ascending`), so links from a theme keep working.

export const PRODUCTS_PER_PAGE = 24;

type SortOption<Key> = { value: string; label: string; sortKey: Key; reverse: boolean };

export const COLLECTION_SORT_OPTIONS: SortOption<ProductCollectionSortKeys>[] = [
  { value: "manual", label: "Featured", sortKey: "COLLECTION_DEFAULT", reverse: false },
  { value: "best-selling", label: "Best selling", sortKey: "BEST_SELLING", reverse: false },
  { value: "price-ascending", label: "Price, low to high", sortKey: "PRICE", reverse: false },
  { value: "price-descending", label: "Price, high to low", sortKey: "PRICE", reverse: true },
  { value: "created-descending", label: "Newest", sortKey: "CREATED", reverse: true },
  { value: "title-ascending", label: "A–Z", sortKey: "TITLE", reverse: false },
];

export const SEARCH_SORT_OPTIONS: SortOption<SearchSortKeys>[] = [
  { value: "relevance", label: "Relevance", sortKey: "RELEVANCE", reverse: false },
  { value: "price-ascending", label: "Price, low to high", sortKey: "PRICE", reverse: false },
  { value: "price-descending", label: "Price, high to low", sortKey: "PRICE", reverse: true },
];

export function findSortOption<Key>(options: SortOption<Key>[], value: string | null) {
  return options.find((option) => option.value === value) ?? options[0]!;
}

/** The URL parameter that selects a facet value, from the value's `input` (a ProductFilter). */
export function filterToParam(filter: ProductFilter): [name: string, value: string] | null {
  if (filter.available != null) return ["filter.v.availability", filter.available ? "1" : "0"];
  if (filter.productVendor) return ["filter.p.vendor", filter.productVendor];
  if (filter.productType) return ["filter.p.product_type", filter.productType];
  if (filter.tag) return ["filter.p.tag", filter.tag];
  if (filter.category) return ["filter.p.category", filter.category.id];
  if (filter.variantOption) {
    return [`filter.v.option.${filter.variantOption.name}`, filter.variantOption.value];
  }
  if (filter.productMetafield) {
    const { namespace, key, value } = filter.productMetafield;
    return [`filter.p.m.${namespace}.${key}`, value];
  }
  if (filter.variantMetafield) {
    const { namespace, key, value } = filter.variantMetafield;
    return [`filter.v.m.${namespace}.${key}`, value];
  }
  return null;
}

/** Every filter in the URL. Unknown `filter.*` names are ignored. */
export function parseFilters(params: URLSearchParams): ProductFilter[] {
  const filters: ProductFilter[] = [];
  const price: { min?: number; max?: number } = {};

  for (const [name, value] of params) {
    if (!name.startsWith("filter.") || !value) continue;
    const [, scope, kind, ...rest] = name.split(".");
    const field = rest.join(".");

    if (name === "filter.v.price.gte" || name === "filter.v.price.lte") {
      // Plain decimals only; a locale-formatted "12,50" would silently mean something else.
      if (!/^\d+(\.\d+)?$/.test(value)) continue;
      price[name.endsWith("gte") ? "min" : "max"] = Number(value);
    } else if (name === "filter.v.availability") {
      filters.push({ available: value === "1" });
    } else if (name === "filter.p.vendor") {
      filters.push({ productVendor: value });
    } else if (name === "filter.p.product_type") {
      filters.push({ productType: value });
    } else if (name === "filter.p.tag") {
      filters.push({ tag: value });
    } else if (name === "filter.p.category") {
      filters.push({ category: { id: value } });
    } else if (scope === "v" && kind === "option" && field) {
      filters.push({ variantOption: { name: field, value } });
    } else if (kind === "m" && rest.length === 2) {
      const [namespace, key] = rest as [string, string];
      if (scope === "p") filters.push({ productMetafield: { namespace, key, value } });
      if (scope === "v") filters.push({ variantMetafield: { namespace, key, value } });
    }
  }

  if (price.min !== undefined || price.max !== undefined) filters.push({ price });
  return filters;
}

/** Whether the URL asks for more than a collection's default first page. */
export function hasBrowseParams(params: URLSearchParams): boolean {
  return [...params.keys()].some(
    (name) => name.startsWith("filter.") || name === "sort_by" || name === "q",
  );
}
