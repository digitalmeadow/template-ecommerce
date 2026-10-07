import { sanityClient } from "sanity-nextjs/client.server";
import { homeQuery } from "sanity-nextjs/queries/home";
import { pagesQuery } from "sanity-nextjs/queries/page";
import { productsQuery } from "sanity-nextjs/queries/product";
import { collectionsQuery } from "sanity-nextjs/queries/collection";
import { buildScoped } from "./cache";

/**
 * Next can't pass props from generateStaticParams, so pages look their document up in the same
 * cached bulk query instead of issuing a second per-slug request.
 */

export const getHome = buildScoped(async () => {
  const result = await sanityClient.request(homeQuery);
  return result.allHome[0] ?? null;
});

export const getPages = buildScoped(async () => {
  const result = await sanityClient.request(pagesQuery);
  return result.allPage.filter((page) => page.slug?.current);
});

export const getProducts = buildScoped(async () => {
  const result = await sanityClient.request(productsQuery);
  return result.allProduct.filter(
    (product) =>
      product.shopify?.status === "active" && product.shopify.handle?.current,
  );
});

export const getCollections = buildScoped(async () => {
  const result = await sanityClient.request(collectionsQuery);
  return result.allCollection.filter(
    (collection) => collection.shopify?.handle?.current,
  );
});

export async function getPage(slug: string) {
  const pages = await getPages();
  return pages.find((page) => page.slug?.current === slug) ?? null;
}

export async function getProduct(handle: string) {
  const products = await getProducts();
  return (
    products.find((product) => product.shopify?.handle?.current === handle) ??
    null
  );
}

export async function getCollection(handle: string) {
  const collections = await getCollections();
  return (
    collections.find(
      (collection) => collection.shopify?.handle?.current === handle,
    ) ?? null
  );
}
