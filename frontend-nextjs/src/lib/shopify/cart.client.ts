import { getStoredLocale } from "./locale.client";
import { getCurrency } from "./locale";

export function getCartStorageKey(suffix: string): string {
  const locale = getStoredLocale();
  const currency = getCurrency(locale);
  return `shopify_${locale}_${currency}_${suffix}`;
}
