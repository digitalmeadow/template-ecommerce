import { shopifyServer } from "@lib/shopify/serverClient";
import { sanityClient } from "sanity/client";
import type {
  ProductCardFragment as ShopifyProductCardFragment,
  ProductFragment as ShopifyProductFragment,
} from "shopify/generated/graphql";
import type {
  ProductFragment as SanityProductFragment,
  ProductThumbnailFragment as SanityProductThumbnailFragment,
} from "sanity/generated/graphql";
import {
  productByHandleQuery as shopifyProductByHandleQuery,
  productCardByHandleQuery as shopifyProductCardByHandleQuery,
} from "shopify/queries/product";
import {
  productByHandleQuery as sanityProductByHandleQuery,
  productThumbnailsQuery as sanityProductThumbnailsQuery,
} from "sanity/queries/product";
import { DEFAULT_LOCALE, getLocale, type Locale } from "@lib/shopify/locale";
import { buildScoped, buildScopedByKey } from "@lib/cache";

export type SanityProductThumbnails = Map<string, SanityProductThumbnailFragment>;

export type ProductThumbnailShopifySanity = {
  shopify: ShopifyProductCardFragment;
  sanity: SanityProductThumbnailFragment;
};

export type ProductShopifySanity = {
  shopify: ShopifyProductFragment;
  sanity: SanityProductFragment;
  relatedProducts: Array<ProductThumbnailShopifySanity>;
};

// Keyed `{locale}:{handle}`: each market's build of a page shares one request per product.
const fetchShopifyProductByKey = buildScopedByKey(async (key) => {
  const [localePath, handle] = key.split(":") as [string, string];
  const locale = getLocale(localePath);
  const { data, context } = await shopifyServer.requestWithContext(shopifyProductByHandleQuery, {
    handle,
    country: locale.country,
    language: locale.language,
  });
  if (context.country && context.country !== locale.country) {
    console.warn(
      `Shopify has no market for ${locale.country}; ${locale.path} shows primary-market prices.`,
    );
  }
  return data.product;
});

const fetchShopifyProductCardByKey = buildScopedByKey(async (key) => {
  const [localePath, handle] = key.split(":") as [string, string];
  const locale = getLocale(localePath);
  const { product } = await shopifyServer.request(shopifyProductCardByHandleQuery, {
    handle,
    country: locale.country,
    language: locale.language,
  });
  return product;
});

/** Every product's Sanity thumbnail by handle, in one request for the whole build. */
export const fetchSanityProductThumbnails = buildScoped(
  async (): Promise<SanityProductThumbnails> => {
    const { allProduct } = await sanityClient.request(sanityProductThumbnailsQuery);
    return new Map(
      allProduct.flatMap((product) => {
        const handle = product.shopify?.handle?.current;
        return handle ? [[handle, product] as const] : [];
      }),
    );
  },
);

/**
 * Whether a Sanity-active product is published to the Headless channel. Products that aren't
 * are left out of the build with a warning rather than failing it.
 */
export async function isProductInShopify(handle: string): Promise<boolean> {
  const product = await fetchShopifyProductByKey(`${DEFAULT_LOCALE.path}:${handle}`);
  if (!product) {
    console.warn(
      `Product "${handle}" is active in Sanity but not in Shopify's Headless channel; skipping.`,
    );
  }
  return Boolean(product);
}

/** Pairs Shopify cards with their Sanity thumbnails; a product missing from Sanity is skipped. */
export function pairProductThumbnails(
  cards: Array<ShopifyProductCardFragment | null | undefined>,
  sanityThumbnails: SanityProductThumbnails,
): ProductThumbnailShopifySanity[] {
  return cards.flatMap((card) => {
    const sanity = card && sanityThumbnails.get(card.handle);
    return card && sanity ? [{ shopify: card, sanity }] : [];
  });
}

export async function fetchProductThumbnails(
  cards: Array<ShopifyProductCardFragment | null | undefined>,
): Promise<ProductThumbnailShopifySanity[]> {
  return pairProductThumbnails(cards, await fetchSanityProductThumbnails());
}

export async function fetchProductThumbnailsByHandle(
  handles: string[],
  locale: Locale,
): Promise<ProductThumbnailShopifySanity[]> {
  const cards = await Promise.all(
    handles.map((handle) =>
      fetchShopifyProductCardByKey(`${locale.path}:${handle}`).catch((error) => {
        console.error(`Error fetching product card for handle "${handle}":`, error);
        return null;
      }),
    ),
  );
  return fetchProductThumbnails(cards);
}

/**
 * Null when Shopify doesn't have the product. Pass `sanityProductData` when the caller already
 * holds it (getStaticPaths) to skip a Sanity request.
 */
export async function fetchProductShopifySanity(
  handle: string,
  locale: Locale,
  sanityProductData?: SanityProductFragment,
): Promise<ProductShopifySanity | null> {
  const [shopifyProduct, sanityProduct] = await Promise.all([
    fetchShopifyProductByKey(`${locale.path}:${handle}`),
    sanityProductData ??
      sanityClient
        .request(sanityProductByHandleQuery, { handle })
        .then((result) => result.allProduct[0]),
  ]);

  if (!shopifyProduct || !sanityProduct) return null;

  const relatedHandles = (sanityProduct.relatedProducts ?? [])
    .map((relatedProduct) => relatedProduct?.shopify?.handle?.current)
    .filter((relatedHandle): relatedHandle is string => Boolean(relatedHandle));
  const relatedProducts = await fetchProductThumbnailsByHandle(relatedHandles, locale);

  return { shopify: shopifyProduct, sanity: sanityProduct, relatedProducts };
}
