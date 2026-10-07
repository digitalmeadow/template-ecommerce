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
import { buildScopedByKey } from "@lib/sanity/cache";

export type PricesPerLocale = Record<LocaleCode, ShopifyProductPriceFragment>;

export type ProductThumbnailShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductThumbnailFragment;
  pricesPerLocale: PricesPerLocale;
};

// Thumbnails recur across related products and collections; cached per handle for the build.
export const fetchProductThumbnailShopifySanity = buildScopedByKey(
  async (handle): Promise<ProductThumbnailShopifySanity> => {
    const [shopifyProductQuery, sanityProductQuery, pricesPerLocale] = await Promise.all([
      shopifyClient.request(shopifyProductByHandleQuery, { handle }),
      sanityClient.request(sanityProductThumbnailByHandleQuery, { handle }),
      fetchPricesPerLocale(handle),
    ]);
    const shopifyProduct = shopifyProductQuery.productByHandle;
    const sanityProduct = sanityProductQuery.allProduct[0];

    if (!shopifyProduct || !sanityProduct) {
      throw new Error(`Product with handle "${handle}" not found in Shopify or Sanity`);
    }

    return {
      shopify: shopifyProduct,
      sanity: sanityProduct,
      pricesPerLocale,
    };
  },
);

export type ProductShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductFragment;
  relatedProducts: Array<ProductThumbnailShopifySanity>;
  pricesPerLocale: PricesPerLocale;
};

/** Pass `sanityProduct` when the caller already holds it (getStaticPaths) to skip a Sanity request. */
export async function fetchProductShopifySanity(
  handle: string,
  sanityProductData?: SanityProductFragment,
): Promise<ProductShopifySanity> {
  const [shopifyProductQuery, sanityProduct, pricesPerLocale] = await Promise.all([
    shopifyClient.request(shopifyProductByHandleQuery, { handle }),
    sanityProductData ??
      sanityClient
        .request(sanityProductByHandleQuery, { handle })
        .then((result) => result.allProduct[0]),
    fetchPricesPerLocale(handle),
  ]);
  const shopifyProduct = shopifyProductQuery.productByHandle;

  if (!shopifyProduct || !sanityProduct)
    throw new Error(`Product with handle "${handle}" not found in Shopify or Sanity`);

  const relatedHandles = (sanityProduct.relatedProducts ?? [])
    .map((relatedProduct) => relatedProduct?.shopify?.handle?.current)
    .filter((relatedHandle): relatedHandle is string => Boolean(relatedHandle));
  const relatedProducts = await Promise.all(relatedHandles.map(fetchProductThumbnailShopifySanity));

  return {
    shopify: shopifyProduct,
    sanity: sanityProduct,
    relatedProducts,
    pricesPerLocale,
  };
}

const fetchPricesPerLocale = buildScopedByKey(async (handle): Promise<PricesPerLocale> => {
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
});
