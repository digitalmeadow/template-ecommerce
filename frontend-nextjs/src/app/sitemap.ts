import type { MetadataRoute } from "next";
import { SITE_URL } from "@/meta/metadata";
import { getCollections, getPages, getProducts } from "@/lib/sanity/paths";
import { resolveSanityHref } from "@/lib/sanity/resolve";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_URL) return [];

  const [pages, products, collections] = await Promise.all([
    getPages(),
    getProducts(),
    getCollections(),
  ]);

  const paths = [
    resolveSanityHref("home"),
    ...pages.map((page) => resolveSanityHref("page", page.slug?.current)),
    ...products.map((product) => resolveSanityHref("product", product.shopify?.handle?.current)),
    ...collections.map((collection) =>
      resolveSanityHref("collection", collection.shopify?.handle?.current),
    ),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}
