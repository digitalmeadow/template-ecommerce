import type { ShopPolicyFragment } from "shopify/generated/graphql";
import { shopPoliciesQuery, shopQuery } from "shopify/queries/shop";
import { shopifyIdFromGid } from "shopify/utils/ids";
import { buildScoped, buildScopedByKey } from "@lib/cache";
import { getLocale, type Locale } from "@lib/shopify/locale";
import { shopifyServer } from "@lib/shopify/serverClient";

export const getShop = buildScoped(async () => {
  const { shop } = await shopifyServer.request(shopQuery);
  return shop;
});

/** Shopify-hosted customer accounts: the vanity domain when configured, else Shopify's URL. */
export async function getCustomerAccountUrl(): Promise<string> {
  const shop = await getShop();
  return shop.customerAccountUrl ?? `https://shopify.com/${shopifyIdFromGid(shop.id)}/account`;
}

const getShopPoliciesByLocalePath = buildScopedByKey(async (localePath) => {
  const { shop } = await shopifyServer.request(shopPoliciesQuery, {
    language: getLocale(localePath).language,
  });
  return [shop.privacyPolicy, shop.refundPolicy, shop.shippingPolicy, shop.termsOfService].filter(
    (policy): policy is ShopPolicyFragment => Boolean(policy),
  );
});

/** The policies the store has written, in Shopify admin order. */
export function getShopPolicies(locale: Locale): Promise<ShopPolicyFragment[]> {
  return getShopPoliciesByLocalePath(locale.path);
}
