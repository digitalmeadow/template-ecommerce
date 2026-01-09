// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      WEBSITE_URL: envField.string({
        context: "client",
        access: "public",
      }),

      SANITY_PROJECT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      SANITY_DATASET: envField.string({
        context: "client",
        access: "public",
      }),
      SANITY_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      SANITY_WEBHOOK_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      SANITY_PERSPECTIVE: envField.string({
        context: "client",
        access: "public",
      }),

      GIT_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      GIT_OWNER: envField.string({
        context: "server",
        access: "secret",
      }),
      GIT_REPO: envField.string({
        context: "server",
        access: "secret",
      }),
      GIT_WORKFLOW_ID_DEPLOY: envField.string({
        context: "server",
        access: "secret",
      }),
      GIT_BRANCH: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  output: "server",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
});
