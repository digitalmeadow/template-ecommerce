import { shopifyClient, shopifyRequestWithContext } from "shopify/client";
import { sanityClient } from "sanity/client";
import {
  type ProductFragment as ShopifyProductFragment,
  type ProductPriceFragment as ShopifyProductPriceFragment,
  type CountryCode,
} from "shopify/generated/graphql";
import type {
  ProductFragment as SanityProductFragment,
  ProductThumbnailFragment as SanityProductThumbnailFragment,
} from "sanity/generated/graphql";
import {
  productByHandleQuery as shopifyProductByHandleQuery,
  productPricesQuery as shopifyProductPricesQuery,
} from "shopify/queries/product";
import {
  productByHandleQuery as sanityProductByHandleQuery,
  productThumbnailByHandleQuery as sanityProductThumbnailByHandleQuery,
} from "sanity/queries/product";

import { LOCALE_CONFIG, type LocaleCode } from "@lib/shopify/locale";
import { buildScopedByKey } from "@lib/sanity/cache";

// Locales whose market Shopify doesn't serve are omitted; readers fall back to the default locale.
export type PricesPerLocale = Partial<Record<LocaleCode, ShopifyProductPriceFragment>>;

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
    const shopifyProduct = shopifyProductQuery.product;
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
  const shopifyProduct = shopifyProductQuery.product;

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

function fetchProductPricesPage(countryCode: CountryCode, cursor: string | null) {
  return shopifyRequestWithContext(shopifyProductPricesQuery, { countryCode, cursor });
}

// Every product's prices for one market, paged; shared by every page in the build.
const fetchProductPricesForLocale = buildScopedByKey(
  async (locale): Promise<Map<string, ShopifyProductPriceFragment>> => {
    const countryCode = LOCALE_CONFIG[locale as LocaleCode].country;
    const prices = new Map<string, ShopifyProductPriceFragment>();
    let cursor: string | null = null;

    do {
      const { data, context } = await fetchProductPricesPage(countryCode, cursor);

      if (context.country && context.country !== countryCode) {
        console.warn(`Shopify has no market for ${countryCode}; omitting ${locale} prices.`);
        return new Map();
      }

      for (const { node } of data.products.edges) prices.set(node.handle, node);
      const { hasNextPage, endCursor } = data.products.pageInfo;
      cursor = hasNextPage ? (endCursor ?? null) : null;
    } while (cursor);

    return prices;
  },
);

async function fetchPricesPerLocale(handle: string): Promise<PricesPerLocale> {
  const localeCodes = Object.keys(LOCALE_CONFIG) as LocaleCode[];
  const entries = await Promise.all(
    localeCodes.map(async (locale) => {
      const prices = await fetchProductPricesForLocale(locale);
      return [locale, prices.get(handle)] as const;
    }),
  );
  return Object.fromEntries(entries.filter(([, prices]) => prices));
}
