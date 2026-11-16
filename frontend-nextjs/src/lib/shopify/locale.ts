import type { CountryCode, LanguageCode } from "shopify/generated/graphql";
import { LOCALES } from "@/config";

export interface Locale {
  path: string;
  country: CountryCode;
  language: LanguageCode;
  label: string;
}

const SELLABLE_LOCALE_PATHS = (process.env.NEXT_PUBLIC_SELLABLE_LOCALE_PATHS ?? "").split(",");

// Configured locales minus any Shopify no longer sells to (filtered when the build starts).
export const LOCALE_LIST: readonly Locale[] = LOCALES.filter((locale) =>
  SELLABLE_LOCALE_PATHS.includes(locale.path),
);
export const DEFAULT_LOCALE: Locale = LOCALE_LIST[0]!;

/** From the `[locale]` route param or a URL segment; anything unknown is the default locale. */
export function getLocale(path: string | undefined): Locale {
  return LOCALE_LIST.find((locale) => locale.path === path?.toLowerCase()) ?? DEFAULT_LOCALE;
}

export function isLocalePath(path: string): boolean {
  return LOCALE_LIST.some((locale) => locale.path === path);
}

/** Cache key for per-locale lookups of a handle: `{locale}:{handle}`. */
export function localeHandleKey(locale: Locale, handle: string): string {
  return `${locale.path}:${handle}`;
}

export function parseLocaleHandleKey(key: string): { locale: Locale; handle: string } {
  const [localePath, handle] = key.split(":") as [string, string];
  return { locale: getLocale(localePath), handle };
}

/** The current page's locale in the browser (the layout writes it to `<html data-locale>`). */
export function getPageLocale(): Locale {
  return getLocale(document.documentElement.dataset.locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return (
    LOCALE_LIST.find((locale) => locale !== DEFAULT_LOCALE && locale.path === segment) ??
    DEFAULT_LOCALE
  );
}

/** The path without its locale prefix. */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  return pathname.slice(locale.path.length + 1) || "/";
}

/** An internal path in `locale`; external URLs, anchors and the like pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = stripLocale(href);
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale.path}` : `/${locale.path}${path}`;
}

/** BCP 47 tag for `lang`, hreflang and `Intl`: `en-AU`. */
export function getHtmlLang(locale: Locale): string {
  return `${locale.language.toLowerCase()}-${locale.country}`;
}

/** Full navigation to the current page in `locale`: prices, links and the cart all follow the URL. */
export function switchLocale(locale: Locale) {
  const { pathname, search, hash } = window.location;
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- a full load re-renders server-priced pages and the cart
  window.location.assign(`${localizeHref(pathname, locale)}${search}${hash}`);
}
