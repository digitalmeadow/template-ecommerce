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
import { selectDocument } from "../sanity/drafts";
import { LOCALE_CONFIG, type LocaleCode } from "../shopify/locale";

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
  const sanityProduct = selectDocument(sanityProductQuery.allProduct);

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
  pricesPerLocale: PricesPerLocale;
};

export async function fetchProductShopifySanity(handle: string): Promise<ProductShopifySanity> {
  const shopifyProductQuery = await shopifyClient.request(shopifyProductByHandleQuery, { handle });
  const shopifyProduct = shopifyProductQuery.productByHandle;

  const sanityProductQuery = await sanityClient.request(sanityProductByHandleQuery, { handle });
  const sanityProduct = selectDocument(sanityProductQuery.allProduct);

  if (!shopifyProduct || !sanityProduct)
    throw new Error(`Product with handle "${handle}" not found in Shopify or Sanity`);

  const pricesPerLocale = await fetchPricesPerLocale(handle);

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
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
