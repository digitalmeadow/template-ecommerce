import { GraphQLClient } from "graphql-request";

export const shopifyClient = new GraphQLClient(
  `https://${import.meta.env.SHOPIFY_STORE_DOMAIN}/api/${
    import.meta.env.SHOPIFY_API_VERSION
  }/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": import.meta.env
        .SHOPIFY_PUBLIC_API_TOKEN!,
    },
  }
);
