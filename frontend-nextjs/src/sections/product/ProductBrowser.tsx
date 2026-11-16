"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductFilter } from "shopify/generated/graphql";
import { trackCollectionView, trackSearch, type AnalyticsListItem } from "@/lib/analytics/track";
import type { ProductBrowserResults, ProductBrowserSource } from "@/lib/fetches/productBrowser";
import {
  COLLECTION_SORT_OPTIONS,
  filterToParam,
  hasBrowseParams,
  SEARCH_SORT_OPTIONS,
} from "@/lib/shopify/filters";
import { useLocale } from "@/lib/shopify/useLocale";
import { useBrowserValue } from "@/lib/useBrowserValue";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";

interface Props {
  source: ProductBrowserSource;
  results: ProductBrowserResults;
  // Collection pages: reported with collection views.
  collectionId?: string;
}

const RESULTS_ENDPOINT = "/api/product-browser";

function readFilterInput(input: unknown): ProductFilter | null {
  try {
    return (typeof input === "string" ? JSON.parse(input) : input) as ProductFilter;
  } catch {
    return null;
  }
}

function toListItems(results: ProductBrowserResults): AnalyticsListItem[] {
  return results.products.map(({ shopify }) => ({
    id: shopify.id,
    title: shopify.title,
    price: shopify.priceRange.minVariantPrice.amount,
    currencyCode: shopify.priceRange.minVariantPrice.currencyCode,
  }));
}

function formParams(form: HTMLFormElement): URLSearchParams {
  const params = new URLSearchParams();
  for (const [name, value] of new FormData(form)) {
    if (typeof value === "string" && value.trim()) params.append(name, value.trim());
  }
  return params;
}

// The static page holds the default first page; filtering, sorting, paging and search fetch
// results from the server and render them here. Without JS the controls are a GET form.
export default function ProductBrowser({ source, results: initialResults, collectionId }: Props) {
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [params, setParams] = useState(() => new URLSearchParams());
  const [results, setResults] = useState(initialResults);
  const urlQuery = useBrowserValue(
    () => new URLSearchParams(window.location.search).get("q") ?? "",
    source.type === "search" ? source.query : "",
  );
  const [typedQuery, setTypedQuery] = useState<string | null>(null);
  const query = typedQuery ?? urlQuery;

  const sortOptions = source.type === "collection" ? COLLECTION_SORT_OPTIONS : SEARCH_SORT_OPTIONS;
  const selectedSort = params.get("sort_by") ?? sortOptions[0]!.value;
  const facets = results.filters.map((filter) => ({
    ...filter,
    values: filter.values.flatMap((value) => {
      const filterInput = readFilterInput(value.input);
      const param = filterInput && filterToParam(filterInput);
      if (!param) return [];
      const [name, paramValue] = param;
      return [{ ...value, name, paramValue, checked: params.getAll(name).includes(paramValue) }];
    }),
  }));
  const nextParams = new URLSearchParams(params);
  if (results.endCursor) nextParams.set("after", results.endCursor);

  function trackView(viewParams: URLSearchParams, viewResults: ProductBrowserResults) {
    const searchTerm = viewParams.get("q");
    if (source.type === "collection" && collectionId) {
      trackCollectionView({ id: collectionId, handle: source.handle }, toListItems(viewResults));
    }
    if (source.type === "search" && searchTerm) trackSearch(searchTerm, toListItems(viewResults));
  }

  async function fetchResults(fetchParams: URLSearchParams): Promise<ProductBrowserResults | null> {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const search = new URLSearchParams(fetchParams);
    search.set("locale", locale.path);
    if (source.type === "collection") search.set("handle", source.handle);
    // An attribute, like Astro's, so a fetch never costs a render of its own.
    rootRef.current?.setAttribute("data-loading", "");
    try {
      const response = await fetch(`${RESULTS_ENDPOINT}?${search}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Product browser responded ${response.status}`);
      return (await response.json()) as ProductBrowserResults;
    } catch (error) {
      if (!controller.signal.aborted) console.error(error);
      return null;
    } finally {
      if (controllerRef.current === controller) rootRef.current?.removeAttribute("data-loading");
    }
  }

  function showResults(renderParams: URLSearchParams, fresh: ProductBrowserResults | null) {
    if (!fresh) return;
    setParams(renderParams);
    setResults(fresh);
    trackView(renderParams, fresh);
  }

  function render(renderParams: URLSearchParams) {
    fetchResults(renderParams).then((fresh) => showResults(renderParams, fresh));
  }

  async function loadMore() {
    const fresh = await fetchResults(nextParams);
    if (!fresh) return;
    setResults((current) => ({
      ...fresh,
      products: [...current.products, ...fresh.products],
    }));
  }

  function apply() {
    if (!formRef.current) return;
    const applied = formParams(formRef.current);
    const url = new URL(window.location.href);
    url.search = applied.toString();
    history.replaceState(history.state, "", url);
    render(applied);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (hasBrowseParams(urlParams)) {
      fetchResults(urlParams).then((fresh) => showResults(urlParams, fresh));
    } else {
      trackView(urlParams, initialResults);
    }
    return () => controllerRef.current?.abort();
    // Runs once: the URL decides whether the static first page stands.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Controls are uncontrolled (the native change listener reads them), so URL-driven renders set them here.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    for (const control of form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
      "input, select",
    )) {
      if (control instanceof HTMLInputElement && control.type === "checkbox") {
        control.checked = params.getAll(control.name).includes(control.value);
      } else if (control.name === "sort_by") {
        control.value = selectedSort;
      } else if (control.name.startsWith("filter.v.price.")) {
        control.value = params.get(control.name) ?? "";
      }
    }
  }, [params, selectedSort, results]);

  // Native `change`, not React's per-keystroke onChange: number fields apply on commit.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    function handleChange(event: Event) {
      // Search text applies on submit, not on every keystroke.
      if ((event.target as HTMLInputElement).name === "q") return;
      apply();
    }
    form.addEventListener("change", handleChange);
    return () => form.removeEventListener("change", handleChange);
  });

  const isEmptySearch = source.type === "search" && !query;

  return (
    <div ref={rootRef} className="product-browser">
      <form
        ref={formRef}
        className="flex flex-wrap items-start gap-6"
        method="get"
        onSubmit={(event) => {
          event.preventDefault();
          apply();
        }}
      >
        {source.type === "search" && (
          <label className="g-form-field">
            <span>Search</span>
            <input
              type="search"
              name="q"
              value={query}
              placeholder="Search"
              onChange={(event) => setTypedQuery(event.target.value)}
            />
          </label>
        )}

        <label className="g-form-field">
          <span>Sort</span>
          <span className="g-select">
            <select name="sort_by" defaultValue={selectedSort}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
        </label>

        {facets.map((facet) => (
          <fieldset key={facet.id} className="g-form-field">
            <legend>{facet.label}</legend>
            {facet.type === "PRICE_RANGE" ? (
              <div className="flex gap-3">
                <label className="g-form-field">
                  <span>Min</span>
                  <input
                    className="w-[6em]"
                    type="number"
                    name="filter.v.price.gte"
                    min="0"
                    step="1"
                    inputMode="decimal"
                    defaultValue={params.get("filter.v.price.gte") ?? undefined}
                  />
                </label>
                <label className="g-form-field">
                  <span>Max</span>
                  <input
                    className="w-[6em]"
                    type="number"
                    name="filter.v.price.lte"
                    min="0"
                    step="1"
                    inputMode="decimal"
                    defaultValue={params.get("filter.v.price.lte") ?? undefined}
                  />
                </label>
              </div>
            ) : (
              facet.values.map((value) => (
                <label key={`${value.name}=${value.paramValue}`} className="g-form-choice">
                  <input
                    type="checkbox"
                    name={value.name}
                    value={value.paramValue}
                    defaultChecked={value.checked}
                    disabled={value.count === 0 && !value.checked}
                  />
                  {value.label} <span className="text-text-subtle">({value.count})</span>
                </label>
              ))
            )}
          </fieldset>
        ))}

        {/* Filters apply as they change once JS is running. */}
        <button className="g-button in-data-js:hidden" type="submit">
          Apply
        </button>
      </form>

      <div
        className="mt-10 transition-opacity duration-[var(--duration-default)] ease-out in-data-loading:opacity-[var(--opacity-disabled)]"
        aria-live="polite"
      >
        {results.totalCount !== undefined && (
          <p className="text-text-muted">
            {results.totalCount} {results.totalCount === 1 ? "result" : "results"}
          </p>
        )}
        {results.products.length ? (
          <ProductThumbnailsGrid products={results.products} />
        ) : (
          <p>{isEmptySearch ? "Enter a search term." : "No products found."}</p>
        )}
        {results.hasNextPage && (
          <a
            className="mt-10 inline-block g-text-link"
            href={`?${nextParams}`}
            onClick={(event) => {
              event.preventDefault();
              loadMore();
            }}
          >
            Load more
          </a>
        )}
      </div>
    </div>
  );
}
