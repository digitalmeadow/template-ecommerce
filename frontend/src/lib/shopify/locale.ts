import type { CountryCode, CurrencyCode, LanguageCode } from "shopify/generated/graphql";

export const LOCALE_CONFIG = {
  "en-NZ": {
    language: "EN" as LanguageCode,
    country: "NZ" as CountryCode,
    currency: "NZD" as CurrencyCode,
    label: "New Zealand",
  },
  "en-AU": {
    language: "EN" as LanguageCode,
    country: "AU" as CountryCode,
    currency: "AUD" as CurrencyCode,
    label: "Australia",
  },
  "en-US": {
    language: "EN" as LanguageCode,
    country: "US" as CountryCode,
    currency: "USD" as CurrencyCode,
    label: "United States",
  },
} as const;

export const DEFAULT_LOCALE: LocaleCode = "en-AU";
export const LOCALE_STORAGE_KEY = "preferred-locale";

export type LocaleCode = keyof typeof LOCALE_CONFIG;

export function getStoredLocale(): LocaleCode {
  if (typeof localStorage === "undefined") return DEFAULT_LOCALE;

  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale && isValidLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

export function getCountryCode(): CountryCode {
  return LOCALE_CONFIG[getStoredLocale()].country;
}

export function getCurrency(): CurrencyCode {
  return LOCALE_CONFIG[getStoredLocale()].currency;
}

export function isValidLocale(locale: string): locale is LocaleCode {
  return locale in LOCALE_CONFIG;
}
