import { sanityClient } from "sanity-nextjs/client.server";
import { homeQuery } from "sanity-nextjs/queries/home";
import { pageQuery, pagesQuery } from "sanity-nextjs/queries/page";
import { productByHandleQuery, productsQuery } from "sanity-nextjs/queries/product";
import { collectionByHandleQuery, collectionsQuery } from "sanity-nextjs/queries/collection";
import { buildCacheEnabled, buildScoped, buildScopedByKey } from "@/lib/cache";

// Next can't pass props from generateStaticParams, so build-time pages look up their document in a cached bulk query.
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
    (product) => product.shopify?.status === "active" && product.shopify.handle?.current,
  );
});

export const getCollections = buildScoped(async () => {
  const result = await sanityClient.request(collectionsQuery);
  return result.allCollection.filter((collection) => collection.shopify?.handle?.current);
});

// Outside the build the bulk queries aren't shared, so a request fetches only its own document.
const getPageBySlug = buildScopedByKey(async (slug) => {
  const result = await sanityClient.request(pageQuery, { slug });
  return result.allPage[0] ?? null;
});

const getProductByHandle = buildScopedByKey(async (handle) => {
  const result = await sanityClient.request(productByHandleQuery, { handle });
  const product = result.allProduct[0];
  return product?.shopify?.status === "active" ? product : null;
});

const getCollectionByHandle = buildScopedByKey(async (handle) => {
  const result = await sanityClient.request(collectionByHandleQuery, {
    handle,
  });
  return result.allCollection[0] ?? null;
});

export async function getPage(slug: string) {
  if (!buildCacheEnabled) return getPageBySlug(slug);
  const pages = await getPages();
  return pages.find((page) => page.slug?.current === slug) ?? null;
}

export async function getProduct(handle: string) {
  if (!buildCacheEnabled) return getProductByHandle(handle);
  const products = await getProducts();
  return products.find((product) => product.shopify?.handle?.current === handle) ?? null;
}

export async function getCollection(handle: string) {
  if (!buildCacheEnabled) return getCollectionByHandle(handle);
  const collections = await getCollections();
  return collections.find((collection) => collection.shopify?.handle?.current === handle) ?? null;
}
