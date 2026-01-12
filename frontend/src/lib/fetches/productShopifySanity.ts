import { shopifyClient } from "shopify/client";
import { sanityClient } from "sanity/client";
import { type ProductFragment as ShopifyProductFragment } from "shopify/generated/graphql";
import type {
  ProductFragment as SanityProductFragment,
  ProductThumbnailFragment as SanityProductThumbnailFragment,
} from "sanity/generated/graphql";
import { productByHandleQuery as shopifyProductByHandleQuery } from "shopify/queries/product";
import {
  productByHandleQuery as sanityProductByHandleQuery,
  productThumbnailByHandleQuery as sanityProductThumbnailByHandleQuery,
} from "sanity/queries/product";
import { selectDocument } from "../sanity/drafts";

export type ProductThumbnailShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductThumbnailFragment;
};

export async function fetchProductThumbnailShopifySanity(
  handle: string
): Promise<ProductThumbnailShopifySanity> {
  const shopifyProductQuery = await shopifyClient.request(
    shopifyProductByHandleQuery,
    { handle }
  );
  const shopifyProduct = shopifyProductQuery.productByHandle;

  const sanityProductQuery = await sanityClient.request(
    sanityProductThumbnailByHandleQuery,
    { handle }
  );
  const sanityProduct = selectDocument(sanityProductQuery.allProduct);

  if (!shopifyProduct || !sanityProduct) {
    throw new Error(
      `Product with handle "${handle}" not found in Shopify or Sanity`
    );
  }

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
  };
}

export type ProductShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductFragment;
};

export async function fetchProductShopifySanity(
  handle: string
): Promise<ProductShopifySanity> {
  const shopifyProductQuery = await shopifyClient.request(
    shopifyProductByHandleQuery,
    { handle }
  );
  const shopifyProduct = shopifyProductQuery.productByHandle;

  const sanityProductQuery = await sanityClient.request(
    sanityProductByHandleQuery,
    { handle }
  );
  const sanityProduct = selectDocument(sanityProductQuery.allProduct);

  if (!shopifyProduct || !sanityProduct) {
    throw new Error(
      `Product with handle "${handle}" not found in Shopify or Sanity`
    );
  }

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
  };
}
