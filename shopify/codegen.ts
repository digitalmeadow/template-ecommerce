import { generate, type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Committed introspection of SHOPIFY_API_VERSION (`pnpm introspect`), so codegen runs offline.
  schema: "schema.json",
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
