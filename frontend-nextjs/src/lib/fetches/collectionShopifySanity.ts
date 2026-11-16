import { sanityClient } from "sanity-nextjs/client.server";
import type { CollectionFragment as SanityCollectionFragment } from "sanity-nextjs/generated/graphql";
import { collectionByHandleQuery as sanityCollectionByHandleQuery } from "sanity-nextjs/queries/collection";
import type { CollectionFragment as ShopifyCollectionFragment } from "shopify/generated/graphql";
import { collectionByHandleQuery as shopifyCollectionByHandleQuery } from "shopify/queries/collection";
import { buildScopedByKey } from "@/lib/cache";
import { PRODUCTS_PER_PAGE } from "@/lib/shopify/filters";
import { localeHandleKey, parseLocaleHandleKey, type Locale } from "@/lib/shopify/locale";
import { shopifyServer } from "@/lib/shopify/serverClient";
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
    const { locale, handle } = parseLocaleHandleKey(key);
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
  return fetchShopifyCollectionWithThumbnailsByKey(localeHandleKey(locale, handle));
}

/** Pass `prefetchedSanityCollection` when the caller already holds it (getStaticPaths) to skip a Sanity request. */
export async function fetchCollectionShopifySanity(
  handle: string,
  locale: Locale,
  prefetchedSanityCollection?: SanityCollectionFragment,
): Promise<CollectionShopifySanity> {
  const [{ shopify: shopifyCollection, productThumbnails }, sanityCollection] = await Promise.all([
    fetchShopifyCollectionWithThumbnails(handle, locale),
    prefetchedSanityCollection ??
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
