import type { CountryCode, LanguageCode } from "shopify/generated/graphql";
import { LOCALES } from "@config";

export interface Locale {
  path: string;
  country: CountryCode;
  language: LanguageCode;
  label: string;
}

// Configured locales minus any Shopify no longer sells to (filtered when the build starts).
export const LOCALE_LIST: readonly Locale[] = LOCALES.filter((locale) =>
  __SELLABLE_LOCALE_PATHS__.includes(locale.path),
);
export const DEFAULT_LOCALE: Locale = LOCALE_LIST[0]!;

/** From `Astro.currentLocale` or a URL segment; anything unknown is the default locale. */
export function getLocale(path: string | undefined): Locale {
  return LOCALE_LIST.find((locale) => locale.path === path?.toLowerCase()) ?? DEFAULT_LOCALE;
}

/** The current page's locale in the browser (PageLayout writes it to `<html data-locale>`). */
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
  return path === "/" ? `/${locale.path}/` : `/${locale.path}${path}`;
}

/** BCP 47 tag for `lang`, hreflang and `Intl`: `en-AU`. */
export function getHtmlLang(locale: Locale): string {
  return `${locale.language.toLowerCase()}-${locale.country}`;
}

/** Full navigation to the current page in `locale`: prices, links and the cart all follow the URL. */
export function switchLocale(locale: Locale) {
  const { pathname, search, hash } = window.location;
  window.location.assign(`${localizeHref(pathname, locale)}${search}${hash}`);
}

/** The locale a component renders in: the page's, or the one an on-demand partial was asked for. */
export function getRenderLocale(astro: {
  currentLocale?: string | undefined;
  locals: App.Locals;
}): Locale {
  return astro.locals.locale ?? getLocale(astro.currentLocale);
}
