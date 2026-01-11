import { GraphQLClient } from "graphql-request";
import {
  SHOPIFY_API_VERSION,
  SHOPIFY_PUBLIC_API_TOKEN,
  SHOPIFY_STORE_DOMAIN,
} from "./config";

export const shopifyClient = new GraphQLClient(
  `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_PUBLIC_API_TOKEN,
    },
  }
);
