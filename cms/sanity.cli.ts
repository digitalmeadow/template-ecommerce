import { defineCliConfig } from "sanity/cli";

// From the root .env, symlinked in as cms/.env.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: "production",
  },
  graphql: [
    {
      playground: true,
      tag: "default",
    },
  ],
  deployment: {
    appId: process.env.SANITY_STUDIO_APP_ID,
  },
});
