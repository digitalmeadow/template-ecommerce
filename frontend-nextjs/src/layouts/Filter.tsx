"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { animate } from "motion";
import {
  easeOutCubicFn,
  prefersReducedMotion,
  transitionDefaultDuration,
} from "@/styles/animations";
import { cn } from "@/lib/utils";

export interface FilterFacet {
  name: string;
  label: string;
  allLabel?: string;
  options: { value: string; label: string }[];
}

export interface FilterItem {
  key: string;
  facets: Record<string, string[]>;
  search?: string;
  node: ReactNode;
}

interface Props {
  facets: FilterFacet[];
  items: FilterItem[];
  search?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
  empty?: ReactNode;
  className?: string;
  controlsClassName?: string;
  gridClassName?: string;
  itemClassName?: string;
}

const SEARCH_PARAM = "q";
const URL_CHANGE_EVENT = "filter:url-change";

// The query string is the source of truth, so filters survive reloads and shared links.
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(URL_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(URL_CHANGE_EVENT, callback);
  };
}
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

function writeUrl(values: Record<string, string>, query: string) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([facet, value]) => {
    if (value) params.set(facet, value);
  });
  if (query) params.set(SEARCH_PARAM, query);

  const search = params.toString();
  const { pathname } = window.location;
  window.history.replaceState(null, "", search ? `${pathname}?${search}` : pathname);
  window.dispatchEvent(new Event(URL_CHANGE_EVENT));
}

export default function Filter({
  facets,
  items,
  search = true,
  searchLabel = "Search",
  searchPlaceholder = "Search",
  empty,
  className,
  controlsClassName,
  gridClassName,
  itemClassName,
}: Props) {
  const baseId = useId();
  const params = new URLSearchParams(
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot),
  );
  const query = params.get(SEARCH_PARAM) ?? "";
  const applied: Record<string, string> = Object.fromEntries(
    facets.map((facet) => [facet.name, params.get(facet.name) ?? ""]),
  );

  // Radios reflect a change immediately while the grid is still fading out.
  const [pending, setPending] = useState<Record<string, string> | null>(null);
  const selected = pending ?? applied;
  const fadeRef = useRef<HTMLDivElement>(null);
  // Latest-wins guard so rapid changes don't leave the grid stuck faded out.
  const fadeToken = useRef(0);

  function setFacet(name: string, value: string) {
    const next = { ...selected, [name]: value };
    const fade = fadeRef.current;
    const token = ++fadeToken.current;

    if (!fade || prefersReducedMotion()) {
      writeUrl(next, query);
      return;
    }

    setPending(next);
    animate(fade, { opacity: 0 }, { duration: 0.15, ease: easeOutCubicFn }).finished.then(() => {
      if (token !== fadeToken.current) return;
      setPending(null);
      writeUrl(next, new URLSearchParams(window.location.search).get(SEARCH_PARAM) ?? "");
      animate(fade, { opacity: 1 }, { duration: transitionDefaultDuration, ease: easeOutCubicFn });
    });
  }

  const needle = query.trim().toLowerCase();
  const matches = (item: FilterItem) =>
    facets.every(
      (facet) =>
        !applied[facet.name] || (item.facets[facet.name] ?? []).includes(applied[facet.name]),
    ) &&
    (!needle || (item.search ?? "").toLowerCase().includes(needle));
  const anyVisible = items.some(matches);

  return (
    <div className={cn("filter", className)}>
      <div className={cn("filter-controls", controlsClassName)}>
        {facets.map((facet) => (
          <fieldset key={facet.name} className="filter-facet">
            <legend>{facet.label}</legend>
            {[{ value: "", label: facet.allLabel ?? "All" }, ...facet.options].map((option) => {
              const optionId = `${baseId}-${facet.name}-${option.value}`;
              return (
                <span key={option.value} className="filter-option">
                  <input
                    className="peer visually-hidden"
                    type="radio"
                    id={optionId}
                    name={`${baseId}-${facet.name}`}
                    value={option.value}
                    checked={selected[facet.name] === option.value}
                    onChange={() => setFacet(facet.name, option.value)}
                  />
                  <label
                    className="cursor-pointer opacity-50 transition-opacity duration-[var(--transition-default-duration)] peer-checked:opacity-100 peer-focus-visible:outline hover:opacity-100"
                    htmlFor={optionId}
                  >
                    {option.label}
                  </label>
                </span>
              );
            })}
          </fieldset>
        ))}

        {search && (
          <>
            <label className="visually-hidden" htmlFor={`${baseId}-search`}>
              {searchLabel}
            </label>
            {/* Instant while typing; only discrete facet changes crossfade. */}
            <input
              className="filter-search bg-transparent"
              id={`${baseId}-search`}
              type="search"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => writeUrl(applied, event.target.value)}
            />
          </>
        )}
      </div>

      <div ref={fadeRef} className="filter-fade">
        {!anyVisible && empty}
        <div className={cn("filter-grid", gridClassName)}>
          {items.map((item) => (
            <div key={item.key} className={itemClassName} hidden={!matches(item)}>
              {item.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
