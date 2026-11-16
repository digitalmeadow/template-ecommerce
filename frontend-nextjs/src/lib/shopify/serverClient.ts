import "server-only";
import { createShopifyClient, type ShopifyClient } from "shopify/client";

const SHOPIFY_PRIVATE_API_TOKEN = process.env.SHOPIFY_PRIVATE_API_TOKEN ?? "";

/** Build-time and server reads. No buyer IP: static builds aren't buyer traffic. */
export const shopifyServer = createShopifyClient({ privateToken: SHOPIFY_PRIVATE_API_TOKEN });

/** Server requests made on a buyer's behalf, so Shopify can tell buyers (and bots) apart. */
export function createBuyerShopifyClient(request: Request): ShopifyClient {
  return createShopifyClient({
    privateToken: SHOPIFY_PRIVATE_API_TOKEN,
    buyerIp: getBuyerIp(request),
  });
}

export function getBuyerIp(request: Request): string | undefined {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}
