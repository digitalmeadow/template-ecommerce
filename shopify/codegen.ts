import { generate, type CodegenConfig } from "@graphql-codegen/cli";
import {
  SHOPIFY_API_VERSION,
  SHOPIFY_PUBLIC_API_TOKEN,
  SHOPIFY_STORE_DOMAIN,
} from "./config";

const config: CodegenConfig = {
  schema: [
    {
      [`https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`]:
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": SHOPIFY_PUBLIC_API_TOKEN,
          },
        },
    },
  ],
  documents: ["fragments/**/*.gql", "queries/**/*.ts", "mutations/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "generated/": {
      preset: "client",
      config: {
        nonOptionalTypename: true,
        extractAllFieldsToTypes: true,
        useTypeImports: true,
        scalars: {
          Decimal: "string",
          URL: "string",
          HTML: "string",
          JSON: "unknown",
          DateTime: "string",
        },
      },
      presetConfig: {
        fragmentMasking: false,
        extractAllFieldsToTypes: true,
      },
      plugins: [],
    },
  },
};

await generate(config, true);
process.exit(0);
