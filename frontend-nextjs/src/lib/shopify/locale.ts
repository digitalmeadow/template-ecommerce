import type { CountryCode, CurrencyCode, LanguageCode } from "shopify/generated/graphql";

export const LOCALE_CONFIG = {
  "en-NZ": {
    language: "EN" as LanguageCode,
    country: "NZ" as CountryCode,
    currency: "NZD" as CurrencyCode,
    label: "New Zealand",
    pathPrefix: null,
  },
  "en-AU": {
    language: "EN" as LanguageCode,
    country: "AU" as CountryCode,
    currency: "AUD" as CurrencyCode,
    label: "Australia",
    pathPrefix: "/",
  },
  "en-US": {
    language: "EN" as LanguageCode,
    country: "US" as CountryCode,
    currency: "USD" as CurrencyCode,
    label: "United States",
    pathPrefix: "/",
  },
} as const;

export const DEFAULT_LOCALE: LocaleCode = "en-AU";

export type LocaleCode = keyof typeof LOCALE_CONFIG;

export function getCountryCode(locale: LocaleCode = DEFAULT_LOCALE): CountryCode {
  return LOCALE_CONFIG[locale].country;
}

export function getCurrency(locale: LocaleCode = DEFAULT_LOCALE): CurrencyCode {
  return LOCALE_CONFIG[locale].currency;
}

export function isValidLocale(locale: string): locale is LocaleCode {
  return locale in LOCALE_CONFIG;
}
