import { getStoredLocale } from "./locale.client";
import { getCurrency } from "./locale";

// Carts are priced in one market, so each locale/currency keeps its own.
export function getCartStorageKey(): string {
  const locale = getStoredLocale();
  return `shopify_${locale}_${getCurrency(locale)}_cart`;
}
