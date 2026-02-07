import { shopifyClient } from "shopify/client";
import { sanityClient } from "sanity/client";
import {
  type ProductFragment as ShopifyProductFragment,
  type ProductPriceFragment as ShopifyProductPriceFragment,
} from "shopify/generated/graphql";
import type {
  ProductFragment as SanityProductFragment,
  ProductThumbnailFragment as SanityProductThumbnailFragment,
} from "sanity/generated/graphql";
import {
  productByHandleQuery as shopifyProductByHandleQuery,
  productPriceByHandleQuery as shopifyProductPriceByHandleQuery,
} from "shopify/queries/product";
import {
  productByHandleQuery as sanityProductByHandleQuery,
  productThumbnailByHandleQuery as sanityProductThumbnailByHandleQuery,
} from "sanity/queries/product";

import { LOCALE_CONFIG, type LocaleCode } from "@lib/shopify/locale";

export type PricesPerLocale = Record<LocaleCode, ShopifyProductPriceFragment>;

export type ProductThumbnailShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductThumbnailFragment;
  pricesPerLocale: PricesPerLocale;
};

export async function fetchProductThumbnailShopifySanity(
  handle: string,
): Promise<ProductThumbnailShopifySanity> {
  const shopifyProductQuery = await shopifyClient.request(shopifyProductByHandleQuery, { handle });
  const shopifyProduct = shopifyProductQuery.productByHandle;

  const sanityProductQuery = await sanityClient.request(sanityProductThumbnailByHandleQuery, {
    handle,
  });
  const sanityProduct = sanityProductQuery.allProduct[0];

  if (!shopifyProduct || !sanityProduct) {
    throw new Error(`Product with handle "${handle}" not found in Shopify or Sanity`);
  }

  const pricesPerLocale = await fetchPricesPerLocale(handle);

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
    pricesPerLocale,
  };
}

export type ProductShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductFragment;
  relatedProducts: Array<ProductThumbnailShopifySanity>;
  pricesPerLocale: PricesPerLocale;
};

export async function fetchProductShopifySanity(handle: string): Promise<ProductShopifySanity> {
  const shopifyProductQuery = await shopifyClient.request(shopifyProductByHandleQuery, { handle });
  const shopifyProduct = shopifyProductQuery.productByHandle;

  const sanityProductQuery = await sanityClient.request(sanityProductByHandleQuery, { handle });
  const sanityProduct = sanityProductQuery.allProduct[0];

  if (!shopifyProduct || !sanityProduct)
    throw new Error(`Product with handle "${handle}" not found in Shopify or Sanity`);

  const relatedProducts: Array<ProductThumbnailShopifySanity> = [];
  for (const relatedProduct of sanityProduct.relatedProducts || []) {
    if (!relatedProduct) continue;

    const relatedHandle = relatedProduct.shopify?.handle?.current;
    if (!relatedHandle) continue;

    const relatedProductData = await fetchProductThumbnailShopifySanity(relatedHandle);
    relatedProducts.push(relatedProductData);
  }

  const pricesPerLocale = await fetchPricesPerLocale(handle);

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
    relatedProducts,
    pricesPerLocale,
  };
}

async function fetchPricesPerLocale(handle: string): Promise<PricesPerLocale> {
  const prices: Record<LocaleCode, ShopifyProductPriceFragment> = {} as Record<
    LocaleCode,
    ShopifyProductPriceFragment
  >;

  const localeCodes = Object.keys(LOCALE_CONFIG) as LocaleCode[];

  await Promise.all(
    localeCodes.map(async (locale) => {
      const countryCode = LOCALE_CONFIG[locale].country;

      const shopifyProductPriceQuery = await shopifyClient.request(
        shopifyProductPriceByHandleQuery,
        { handle, countryCode },
      );
      const shopifyProduct = shopifyProductPriceQuery.productByHandle;

      if (!shopifyProduct)
        throw new Error(`Error: Price data for handle: "${handle}", locale: "${locale}"`);
      prices[locale] = shopifyProduct;
    }),
  );

  return prices;
}
