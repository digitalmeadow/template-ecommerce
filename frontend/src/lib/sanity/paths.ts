import { sanityClient } from "sanity/client";
import { pageQuery, pagesQuery } from "sanity/queries/page";
import { productByHandleQuery, productsQuery } from "sanity/queries/product";
import { collectionByHandleQuery, collectionsQuery } from "sanity/queries/collection";

// Outside the pages: getStaticPaths only reaches imports. load* serve request time (preview, dev).

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

export async function loadPageProps(slug: string) {
  const { allPage } = await sanityClient.request(pageQuery, { slug });
  const page = allPage[0];
  return page ? { pageData: page } : null;
}

export async function loadProductProps(handle: string) {
  const { allProduct } = await sanityClient.request(productByHandleQuery, { handle });
  const product = allProduct[0];
  return product?.shopify?.status === "active" ? { sanityProductData: product } : null;
}

export async function loadCollectionProps(handle: string) {
  const { allCollection } = await sanityClient.request(collectionByHandleQuery, { handle });
  const collection = allCollection[0];
  return collection ? { sanityCollectionData: collection } : null;
}
