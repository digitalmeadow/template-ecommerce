import { DEFAULT_LOCALE, isValidLocale } from "./locale";
import type { LocaleCode } from "./locale";

const LOCALE_STORAGE_KEY = "preferred-locale";

export function getStoredLocale(): LocaleCode {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale && isValidLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

export function setStoredLocale(locale: LocaleCode) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
