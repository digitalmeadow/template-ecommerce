import { LOCALE_CONFIG, type LocaleCode } from "@/lib/shopify/locale";

export const GEO_ENDPOINT = "/api/geo";
const GEO_SESSION_STORAGE_KEY = "geo-country";
const LOCATION_NOTICE_DISMISSED_STORAGE_KEY = "location-notice-dismissed";

// Once per session: the visitor's country doesn't change between pages.
async function fetchGeoCountry(): Promise<string | null> {
  const cached = sessionStorage.getItem(GEO_SESSION_STORAGE_KEY);
  if (cached !== null) return cached || null;

  try {
    const response = await fetch(GEO_ENDPOINT);
    if (!response.ok) return null;
    const { country } = (await response.json()) as { country: string | null };
    sessionStorage.setItem(GEO_SESSION_STORAGE_KEY, country ?? "");
    return country;
  } catch {
    return null;
  }
}

function localeForCountry(country: string): LocaleCode | null {
  const locales = Object.keys(LOCALE_CONFIG) as LocaleCode[];
  return (
    locales.find((locale) => LOCALE_CONFIG[locale].country === country) ?? null
  );
}

/** The store to suggest, or null when the visitor is in it, has no store, or said no to it. */
export async function suggestedLocale(
  current: LocaleCode,
): Promise<LocaleCode | null> {
  const country = await fetchGeoCountry();
  if (!country) return null;
  if (localStorage.getItem(LOCATION_NOTICE_DISMISSED_STORAGE_KEY) === country)
    return null;

  const locale = localeForCountry(country);
  return locale && locale !== current ? locale : null;
}

export function dismissLocationNotice(locale: LocaleCode) {
  localStorage.setItem(
    LOCATION_NOTICE_DISMISSED_STORAGE_KEY,
    LOCALE_CONFIG[locale].country,
  );
}

export function fillMarket(
  template: string | null | undefined,
  locale: LocaleCode,
): string {
  return (template ?? "").replaceAll("{market}", LOCALE_CONFIG[locale].label);
}
