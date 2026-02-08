import { CountryCode, CurrencyCode, LanguageCode } from "shopify/generated/graphql";

export const LOCALE_CONFIG = {
  "en-NZ": {
    language: LanguageCode.En,
    country: CountryCode.Nz,
    currency: CurrencyCode.Nzd,
    label: "New Zealand",
    pathPrefix: null,
  },
  "en-AU": {
    language: LanguageCode.En,
    country: CountryCode.Au,
    currency: CurrencyCode.Aud,
    label: "Australia",
    pathPrefix: "/",
  },
  "en-US": {
    language: LanguageCode.En,
    country: CountryCode.Us,
    currency: CurrencyCode.Usd,
    label: "United States",
    pathPrefix: "/",
  },
} as const;

const DEFAULT_LOCALE: LocaleCode = "en-AU";
const LOCALE_STORAGE_KEY = "preferred-locale";

export type LocaleCode = keyof typeof LOCALE_CONFIG;

// Server
export function getLocaleFromPath(pathname: string): LocaleCode {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Find locale by matching path
  for (const [locale, config] of Object.entries(LOCALE_CONFIG)) {
    if (config.pathPrefix && config.pathPrefix !== "/") {
      // Remove leading/trailing slashes for comparison
      // @ts-expect-error
      const configPath = config.pathPrefix.replace(/^\/|\/$/, "");
      if (firstSegment === configPath) {
        return locale as LocaleCode;
      }
    }
  }

  return DEFAULT_LOCALE;
}

// Client
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
