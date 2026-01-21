import { getCurrency, getStoredLocale } from "@lib/shopify/locale";

export const CART_ID_STORAGE_KEY_SUFFIX = "cart-id";
export const CART_DATA_STORAGE_KEY_SUFFIX = "cart-data";

export function getStorageKey(suffix: string): string {
  const locale = getStoredLocale();
  const currency = getCurrency();
  return `shopify_${locale}_${currency}_${suffix}`;
}
