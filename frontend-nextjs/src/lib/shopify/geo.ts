import { LOCALE_LIST, type Locale } from "@/lib/shopify/locale";

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

function localeForCountry(country: string): Locale | null {
  return LOCALE_LIST.find((locale) => locale.country === country) ?? null;
}

/** The store to suggest, or null when the visitor is in it, has no store, or said no to it. */
export async function suggestedLocale(current: Locale): Promise<Locale | null> {
  const country = await fetchGeoCountry();
  if (!country) return null;
  if (localStorage.getItem(LOCATION_NOTICE_DISMISSED_STORAGE_KEY) === country) return null;

  const locale = localeForCountry(country);
  return locale && locale !== current ? locale : null;
}

export function dismissLocationNotice(locale: Locale) {
  localStorage.setItem(LOCATION_NOTICE_DISMISSED_STORAGE_KEY, locale.country);
}

export function fillMarket(template: string | null | undefined, locale: Locale): string {
  return (template ?? "").replaceAll("{market}", locale.label);
}
