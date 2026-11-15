import { shopifyServer } from "@lib/shopify/serverClient";
import { sanityClient } from "sanity/client";
import { type CollectionFragment as ShopifyCollectionFragment } from "shopify/generated/graphql";
import type { CollectionFragment as SanityCollectionFragment } from "sanity/generated/graphql";
import { collectionByHandleQuery as shopifyCollectionByHandleQuery } from "shopify/queries/collection";
import { collectionByHandleQuery as sanityCollectionByHandleQuery } from "sanity/queries/collection";
import { getLocale, type Locale } from "@lib/shopify/locale";
import { buildScopedByKey } from "@lib/cache";
import { PRODUCTS_PER_PAGE } from "@lib/shopify/filters";
import { fetchProductThumbnails, type ProductThumbnailShopifySanity } from "./productShopifySanity";

export type CollectionShopifySanity = {
  shopify: ShopifyCollectionFragment;
  sanity: SanityCollectionFragment;
  productThumbnails: ProductThumbnailShopifySanity[];
};

export type ShopifyCollectionWithThumbnails = {
  shopify: ShopifyCollectionFragment | null | undefined;
  productThumbnails: ProductThumbnailShopifySanity[];
};

// Collection sections repeat across pages; cached per `{locale}:{handle}` for the build.
const fetchShopifyCollectionWithThumbnailsByKey = buildScopedByKey(
  async (key): Promise<ShopifyCollectionWithThumbnails> => {
    const [localePath, handle] = key.split(":") as [string, string];
    const locale = getLocale(localePath);
    const { collection } = await shopifyServer.request(shopifyCollectionByHandleQuery, {
      handle,
      first: PRODUCTS_PER_PAGE,
      sortKey: "COLLECTION_DEFAULT",
      country: locale.country,
      language: locale.language,
    });
    return {
      shopify: collection,
      productThumbnails: await fetchProductThumbnails(collection?.products.nodes ?? []),
    };
  },
);

export function fetchShopifyCollectionWithThumbnails(
  handle: string,
  locale: Locale,
): Promise<ShopifyCollectionWithThumbnails> {
  return fetchShopifyCollectionWithThumbnailsByKey(`${locale.path}:${handle}`);
}

/** Pass `sanityCollectionData` when the caller already holds it (getStaticPaths) to skip a Sanity request. */
export async function fetchCollectionShopifySanity(
  handle: string,
  locale: Locale,
  sanityCollectionData?: SanityCollectionFragment,
): Promise<CollectionShopifySanity> {
  const [{ shopify: shopifyCollection, productThumbnails }, sanityCollection] = await Promise.all([
    fetchShopifyCollectionWithThumbnails(handle, locale),
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
