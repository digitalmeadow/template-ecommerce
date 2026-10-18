import { generate, type CodegenConfig } from "@graphql-codegen/cli";
import { SANITY_API_VERSION } from "./config";

const schemaUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/graphql/${process.env.SANITY_DATASET}/default`;

const config: CodegenConfig = {
  schema: [
    {
      [schemaUrl]: { headers: { Authorization: `Bearer ${process.env.SANITY_VIEWER_API_TOKEN}` } },
    },
  ],
  documents: ["fragments/**/*.gql", "queries/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "generated/": {
      preset: "client",
      config: {
        nonOptionalTypename: true,
        extractAllFieldsToTypes: true,
        useTypeImports: true,
        scalars: {
          Date: "string",
          Datetime: "string",
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
