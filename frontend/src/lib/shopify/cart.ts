import { getCurrency, getStoredLocale } from "@lib/shopify/locale";

// Carts are priced in one market, so each locale/currency keeps its own.
export function getCartStorageKey(): string {
  return `shopify_${getStoredLocale()}_${getCurrency()}_cart`;
}
