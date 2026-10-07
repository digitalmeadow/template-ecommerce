import { shopifyClient } from "shopify/client";
import { sanityClient } from "sanity-nextjs/client.server";
import { type CollectionFragment as ShopifyCollectionFragment } from "shopify/generated/graphql";
import type { CollectionFragment as SanityCollectionFragment } from "sanity-nextjs/generated/graphql";
import { collectionByHandleQuery as shopifyCollectionByHandleQuery } from "shopify/queries/collection";
import { collectionByHandleQuery as sanityCollectionByHandleQuery } from "sanity-nextjs/queries/collection";
import {
  fetchProductThumbnailShopifySanity,
  type ProductThumbnailShopifySanity,
} from "./productShopifySanity";

export type CollectionShopifySanity = {
  shopify: ShopifyCollectionFragment;
  sanity: SanityCollectionFragment;
  productThumbnails: ProductThumbnailShopifySanity[];
};

/** Pass `sanityCollection` when the caller already holds it (cached bulk query) to skip a Sanity request. */
export async function fetchCollectionShopifySanity(
  handle: string,
  sanityCollectionData?: SanityCollectionFragment,
): Promise<CollectionShopifySanity> {
  const [shopifyCollectionQuery, sanityCollection] = await Promise.all([
    shopifyClient.request(shopifyCollectionByHandleQuery, { handle }),
    sanityCollectionData ??
      sanityClient
        .request(sanityCollectionByHandleQuery, { handle })
        .then((result) => result.allCollection[0]),
  ]);
  const shopifyCollection = shopifyCollectionQuery.collectionByHandle;

  const productHandles =
    shopifyCollection?.products?.edges.map((edge) => edge.node.handle) || [];
  const productThumbnails = (
    await Promise.all(
      productHandles.map((productHandle) =>
        fetchProductThumbnailShopifySanity(productHandle).catch((error) => {
          console.error(
            `Error fetching product thumbnail for handle "${productHandle}":`,
            error,
          );
          return null;
        }),
      ),
    )
  ).filter((thumbnail): thumbnail is ProductThumbnailShopifySanity =>
    Boolean(thumbnail),
  );

  if (!shopifyCollection || !sanityCollection)
    throw new Error(
      `Collection with handle "${handle}" not found in Shopify or Sanity`,
    );

  return {
    shopify: shopifyCollection,
    sanity: sanityCollection,
    productThumbnails,
  };
}
