import { sanityClient } from "sanity/client";
import { pagesQuery } from "sanity/queries/page";
import { productsQuery } from "sanity/queries/product";
import { collectionsQuery } from "sanity/queries/collection";

/**
 * Detail-route path builders. These live outside the pages because Astro evaluates
 * `getStaticPaths` in its own module scope, so it can only reach values it imports. Importing them
 * also lets the preview site reuse the same shape at request time, where getStaticPaths never runs.
 */

export async function buildPagePaths() {
  const pagesQueryResult = await sanityClient.request(pagesQuery);

  return pagesQueryResult.allPage
    .filter((page) => page.slug?.current)
    .map((page) => ({
      params: { slug: page.slug!.current! },
      props: { pageData: page },
    }));
}

export async function buildProductPaths() {
  const productsQueryResult = await sanityClient.request(productsQuery);

  return productsQueryResult.allProduct
    .filter((product) => product.shopify?.status === "active" && product.shopify.handle?.current)
    .map((product) => ({
      params: { slug: product.shopify!.handle!.current! },
      props: { sanityProductData: product },
    }));
}

export async function buildCollectionPaths() {
  const collectionsQueryResult = await sanityClient.request(collectionsQuery);

  return collectionsQueryResult.allCollection
    .filter((collection) => collection.shopify?.handle?.current)
    .map((collection) => ({
      params: { slug: collection.shopify!.handle!.current! },
      props: { sanityCollectionData: collection },
    }));
}
