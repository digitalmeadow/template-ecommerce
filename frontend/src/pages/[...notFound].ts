import type { APIRoute } from "astro";
import { respondNotFound } from "@lib/responses";
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  localizeHref,
  stripLocale,
} from "@lib/shopify/locale";
import { findShopifyRedirect, findStandardPathRedirect } from "@lib/shopify/redirects";
import { createBuyerShopifyClient } from "@lib/shopify/serverClient";

export const prerender = false;

// Every path no page claims. Prerendered dynamic routes fall through here for unknown params too.
export const GET: APIRoute = async (context) => {
  const { url, request } = context;

  // The default locale is only served unprefixed.
  const defaultPrefix = `/${DEFAULT_LOCALE.path}`;
  if (url.pathname === defaultPrefix || url.pathname.startsWith(`${defaultPrefix}/`)) {
    return context.redirect(`${url.pathname.slice(defaultPrefix.length) || "/"}${url.search}`, 301);
  }

  const locale = getLocaleFromPathname(url.pathname);
  const path = stripLocale(url.pathname);

  const standardPath = findStandardPathRedirect(path);
  if (standardPath)
    return context.redirect(withSearch(localizeHref(standardPath, locale), url), 301);

  const target = await findShopifyRedirect(path, createBuyerShopifyClient(request));
  if (target) return context.redirect(withSearch(localizeHref(target, locale), url), 301);

  return respondNotFound(context);
};

function withSearch(target: string, url: URL): string {
  if (!url.search) return target;
  const redirect = new URL(target, url);
  url.searchParams.forEach((value, key) => redirect.searchParams.append(key, value));
  return redirect.origin === url.origin ? `${redirect.pathname}${redirect.search}` : redirect.href;
}
