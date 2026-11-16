"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { ProductCardFragment } from "shopify/generated/graphql";
import PriceDisplay from "@/blocks/PriceDisplay";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { localizeHref } from "@/lib/shopify/locale";
import { useLocale } from "@/lib/shopify/useLocale";

interface PredictiveSearchResults {
  query: string;
  queries: { text: string }[];
  products: ProductCardFragment[];
  collections: { handle: string; title: string }[];
}

const RESULTS_ENDPOINT = "/api/predictive-search";
const DEBOUNCE_MS = 150;
const RESULTS_ID = "predictive-search-results";

// Plain GET to /search without JS; with it, results appear as you type.
export default function SearchForm() {
  const locale = useLocale();
  const rootRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [results, setResults] = useState<PredictiveSearchResults | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const searchHref = localizeHref("/search", locale);
  const searchHrefFor = (text: string) => `${searchHref}?q=${encodeURIComponent(text)}`;

  useEffect(() => {
    if (!isOpen) return;
    function handleDocumentClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isOpen]);

  useEffect(
    () => () => {
      controllerRef.current?.abort();
      clearTimeout(timerRef.current);
    },
    [],
  );

  async function search(query: string) {
    controllerRef.current?.abort();
    if (!query) return setIsOpen(false);
    const controller = new AbortController();
    controllerRef.current = controller;
    const params = new URLSearchParams({ q: query, locale: locale.path });
    try {
      const response = await fetch(`${RESULTS_ENDPOINT}?${params}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Predictive search responded ${response.status}`);
      setResults((await response.json()) as PredictiveSearchResults);
      setIsOpen(true);
    } catch (error) {
      if (!controller.signal.aborted) console.error(error);
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value.trim();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), DEBOUNCE_MS);
  }

  const hasResults =
    !!results &&
    (results.products.length > 0 || results.collections.length > 0 || results.queries.length > 0);

  return (
    <div
      ref={rootRef}
      className="search-form relative"
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <form method="get" action={searchHref} role="search">
        <label className="g-form-field">
          <span className="g-sr-only">Search products</span>
          <input
            type="search"
            name="q"
            placeholder="Search"
            autoComplete="off"
            role="combobox"
            aria-controls={RESULTS_ID}
            aria-expanded={isOpen}
            onChange={handleInput}
          />
        </label>
      </form>
      <div
        id={RESULTS_ID}
        className="absolute top-[calc(100%+var(--size-2))] left-0 z-20 w-[max(100%,var(--max-w-80))] border border-rule bg-background p-4 [&_li_a]:flex [&_li_a]:justify-between [&_li_a]:gap-3 [&_ul]:mb-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2"
        hidden={!isOpen}
      >
        {hasResults ? (
          <>
            {results.queries.length > 0 && (
              <ul>
                {results.queries.map((suggestion) => (
                  <li key={suggestion.text}>
                    <a href={searchHrefFor(suggestion.text)}>{suggestion.text}</a>
                  </li>
                ))}
              </ul>
            )}
            {results.products.length > 0 && (
              <ul>
                {results.products.map((product) => (
                  <li key={product.id}>
                    <a href={localizeHref(resolveSanityHref("product", product.handle), locale)}>
                      <span>{product.title}</span>
                      <PriceDisplay
                        amount={product.priceRange.minVariantPrice.amount}
                        currency={product.priceRange.minVariantPrice.currencyCode}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {results.collections.length > 0 && (
              <ul>
                {results.collections.map((collection) => (
                  <li key={collection.handle}>
                    <a
                      href={localizeHref(
                        resolveSanityHref("collection", collection.handle),
                        locale,
                      )}
                    >
                      {collection.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <a className="g-text-link" href={searchHrefFor(results.query)}>
              View all results
            </a>
          </>
        ) : (
          results?.query && <p>No results for “{results.query}”.</p>
        )}
      </div>
    </div>
  );
}
