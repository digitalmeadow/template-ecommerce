import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import { GraphQLClient, type Variables } from "graphql-request";
import {
  SHOPIFY_API_VERSION,
  SHOPIFY_PUBLIC_API_TOKEN,
  SHOPIFY_STORE_DOMAIN,
} from "./config";

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export const shopifyClient = new GraphQLClient(SHOPIFY_STOREFRONT_URL, {
  headers: {
    "X-Shopify-Storefront-Access-Token": SHOPIFY_PUBLIC_API_TOKEN,
  },
});

export interface ShopifyContext {
  country?: string;
  language?: string;
}

// Shopify silently answers an unknown or disabled country with the primary market, so anything
// market-specific must compare `context.country` with what it asked for before trusting prices.
export async function shopifyRequestWithContext<TResult, TVariables extends Variables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
): Promise<{ data: TResult; context: ShopifyContext }> {
  const { data, extensions } = await shopifyClient.rawRequest<TResult, Variables>(
    print(document),
    variables,
  );
  const context = (extensions as { context?: ShopifyContext } | undefined)?.context ?? {};
  return { data, context };
}
