import { shopifyClient } from "shopify/client";
import { sanityClient } from "sanity/client";
import { type CollectionFragment as ShopifyCollectionFragment } from "shopify/generated/graphql";
import type { CollectionFragment as SanityCollectionFragment } from "sanity/generated/graphql";
import { collectionByHandleQuery as shopifyCollectionByHandleQuery } from "shopify/queries/collection";
import { collectionByHandleQuery as sanityCollectionByHandleQuery } from "sanity/queries/collection";
import {
  fetchProductThumbnailShopifySanity,
  type ProductThumbnailShopifySanity,
} from "./productShopifySanity";

export type CollectionShopifySanity = {
  shopify: ShopifyCollectionFragment;
  sanity: SanityCollectionFragment;
  productThumbnails: ProductThumbnailShopifySanity[];
};

export async function fetchCollectionShopifySanity(
  handle: string,
): Promise<CollectionShopifySanity> {
  const shopifyCollectionQuery = await shopifyClient.request(shopifyCollectionByHandleQuery, {
    handle,
  });
  const shopifyCollection = shopifyCollectionQuery.collectionByHandle;

  const sanityCollectionQuery = await sanityClient.request(sanityCollectionByHandleQuery, {
    handle,
  });
  const sanityCollection = sanityCollectionQuery.allCollection[0];

  // Fetch combined product thumbnails for the collection's products
  const productHandles = shopifyCollection?.products?.edges.map((edge) => edge.node.handle) || [];
  const productThumbnails: ProductThumbnailShopifySanity[] = [];
  for (const productHandle of productHandles) {
    try {
      const productThumbnail = await fetchProductThumbnailShopifySanity(productHandle);
      productThumbnails.push(productThumbnail);
    } catch (error) {
      console.error(`Error fetching product thumbnail for handle "${productHandle}":`, error);
    }
  }

  if (!shopifyCollection || !sanityCollection)
    throw new Error(`Collection with handle "${handle}" not found in Shopify or Sanity`);

  return {
    shopify: shopifyCollection,
    sanity: sanityCollection,
    productThumbnails,
  };
}
