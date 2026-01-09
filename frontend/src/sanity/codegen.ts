import { generate, type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.SANITY_DATASET}/default`,
  documents: ["src/sanity/fragments/**/*.gql", "src/sanity/queries/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/sanity/generated/": {
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
