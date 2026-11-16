import type { MoneyFragment } from "shopify/generated/graphql";

// Shopify's title for the one variant of a product with no options.
export const DEFAULT_VARIANT_TITLE = "Default Title";

export type Selection = Record<string, string>;

/** The slice of a variant the browser needs; live data replaces the stock and price fields. */
export interface Variant {
  id: string;
  title: string;
  selectedOptions: Array<{ name: string; value: string }>;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: MoneyFragment;
  compareAtPrice?: MoneyFragment | null;
}

export type LiveVariant = Pick<
  Variant,
  "id" | "availableForSale" | "quantityAvailable" | "price" | "compareAtPrice"
>;

export function isSingleDefaultVariant(variants: Pick<Variant, "selectedOptions">[]): boolean {
  return variants.length === 1 && variants[0]?.selectedOptions[0]?.value === DEFAULT_VARIANT_TITLE;
}

/** What a product page opens on: Shopify's "first available", else the first variant. */
export function getInitialVariant<T extends Pick<Variant, "availableForSale">>(
  variants: T[],
): T | undefined {
  return variants.find((variant) => variant.availableForSale) ?? variants[0];
}

export function toSelection(variant: Pick<Variant, "selectedOptions">): Selection {
  return Object.fromEntries(variant.selectedOptions.map(({ name, value }) => [name, value]));
}

export function findVariant<T extends Pick<Variant, "selectedOptions">>(
  variants: T[],
  selection: Selection,
): T | undefined {
  return variants.find((variant) =>
    variant.selectedOptions.every(({ name, value }) => selection[name] === value),
  );
}

/**
 * The variant to land on when `optionName` changes to `value`: the exact combination if it
 * exists, else the variant with that value sharing most of the current selection, preferring
 * ones in stock. So picking any value always lands on a real variant.
 */
export function resolveVariant<T extends Pick<Variant, "selectedOptions" | "availableForSale">>(
  variants: T[],
  selection: Selection,
  optionName: string,
  value: string,
): T | undefined {
  const target = { ...selection, [optionName]: value };
  const exact = findVariant(variants, target);
  if (exact) return exact;

  const score = (variant: T) =>
    variant.selectedOptions.filter(({ name, value: optionValue }) => target[name] === optionValue)
      .length + (variant.availableForSale ? 0.5 : 0);
  return variants
    .filter((variant) => toSelection(variant)[optionName] === value)
    .sort((first, second) => score(second) - score(first))[0];
}
