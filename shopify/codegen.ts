import { generate, type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      [`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`]:
        {
          headers: {
            "X-Shopify-Storefront-Access-Token":
              process.env.SHOPIFY_PUBLIC_API_TOKEN,
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
