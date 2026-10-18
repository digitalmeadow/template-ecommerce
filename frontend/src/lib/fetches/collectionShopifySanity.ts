import { shopifyClient } from "shopify/client";
import { sanityClient } from "sanity/client";
import { type CollectionFragment as ShopifyCollectionFragment } from "shopify/generated/graphql";
import type { CollectionFragment as SanityCollectionFragment } from "sanity/generated/graphql";
import { collectionByHandleQuery as shopifyCollectionByHandleQuery } from "shopify/queries/collection";
import { collectionByHandleQuery as sanityCollectionByHandleQuery } from "sanity/queries/collection";
import { buildScopedByKey } from "@lib/cache";
import {
  fetchProductThumbnailsShopifySanity,
  type ProductThumbnailShopifySanity,
} from "./productShopifySanity";

export type CollectionShopifySanity = {
  shopify: ShopifyCollectionFragment;
  sanity: SanityCollectionFragment;
  productThumbnails: ProductThumbnailShopifySanity[];
};

export type ShopifyCollectionWithThumbnails = {
  shopify: ShopifyCollectionFragment | null | undefined;
  productThumbnails: ProductThumbnailShopifySanity[];
};

// Collection sections repeat across pages; cached per handle for the build.
export const fetchShopifyCollectionWithThumbnails = buildScopedByKey(
  async (handle): Promise<ShopifyCollectionWithThumbnails> => {
    const shopifyCollectionResult = await shopifyClient.request(shopifyCollectionByHandleQuery, {
      handle,
    });
    const shopifyCollection = shopifyCollectionResult.collection;
    const productHandles = shopifyCollection?.products?.edges.map((edge) => edge.node.handle) ?? [];

    return {
      shopify: shopifyCollection,
      productThumbnails: await fetchProductThumbnailsShopifySanity(productHandles),
    };
  },
);

/** Pass `sanityCollectionData` when the caller already holds it (getStaticPaths) to skip a Sanity request. */
export async function fetchCollectionShopifySanity(
  handle: string,
  sanityCollectionData?: SanityCollectionFragment,
): Promise<CollectionShopifySanity> {
  const [{ shopify: shopifyCollection, productThumbnails }, sanityCollection] = await Promise.all([
    fetchShopifyCollectionWithThumbnails(handle),
    sanityCollectionData ??
      sanityClient
        .request(sanityCollectionByHandleQuery, { handle })
        .then((result) => result.allCollection[0]),
  ]);

  if (!shopifyCollection || !sanityCollection)
    throw new Error(`Collection with handle "${handle}" not found in Shopify or Sanity`);

  return {
    shopify: shopifyCollection,
    sanity: sanityCollection,
    productThumbnails,
  };
}
