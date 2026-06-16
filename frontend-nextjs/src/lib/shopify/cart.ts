import type { LocaleCode } from "./locale";
import type { CurrencyCode } from "shopify/generated/graphql";

export const CART_ID_STORAGE_KEY_SUFFIX = "cart-id";
export const CART_DATA_STORAGE_KEY_SUFFIX = "cart-data";

export function getStorageKey(
  suffix: string,
  locale: LocaleCode,
  currency: CurrencyCode,
): string {
  return `shopify_${locale}_${currency}_${suffix}`;
}
