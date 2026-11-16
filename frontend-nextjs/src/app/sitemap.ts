import type { MetadataRoute } from "next";
import { isProductInShopify } from "@/lib/fetches/productShopifySanity";
import { getCollections, getPages, getProducts } from "@/lib/sanity/paths";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { DEFAULT_LOCALE, getHtmlLang, LOCALE_LIST, localizeHref } from "@/lib/shopify/locale";
import { getShopPolicies } from "@/lib/shopify/shop";
import { SITE_URL } from "@/meta/metadata";

// Default-locale URLs, each listing every locale's URL as an hreflang alternate.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, products, collections, policies] = await Promise.all([
    getPages(),
    getProducts(),
    getCollections(),
    getShopPolicies(DEFAULT_LOCALE),
  ]);

  const productHandles = products.map((product) => product.shopify!.handle!.current!);
  const inShopify = await Promise.all(productHandles.map(isProductInShopify));

  const paths = [
    resolveSanityHref("home"),
    ...pages.map((page) => resolveSanityHref("page", page.slug?.current)),
    ...productHandles
      .filter((_, index) => inShopify[index])
      .map((handle) => resolveSanityHref("product", handle)),
    ...collections.map((collection) =>
      resolveSanityHref("collection", collection.shopify?.handle?.current),
    ),
    ...policies.map((policy) => `/policies/${policy.handle}`),
  ];

  const lastModified = new Date();

  return paths.map((path) => ({
    url: new URL(path, SITE_URL).href,
    lastModified,
    alternates:
      LOCALE_LIST.length > 1
        ? {
            languages: Object.fromEntries(
              LOCALE_LIST.map((locale) => [
                getHtmlLang(locale),
                new URL(localizeHref(path, locale), SITE_URL).href,
              ]),
            ),
          }
        : undefined,
  }));
}
