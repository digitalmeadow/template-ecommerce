// @ts-check
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PREVIEW: envField.string({
        context: "client",
        access: "public",
      }),

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
      SANITY_VIEWER_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      SANITY_EDITOR_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      SANITY_WEBHOOK_SECRET: envField.string({
        context: "server",
        access: "secret",
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

      SHOPIFY_PUBLIC_API_TOKEN: envField.string({
        context: "client",
        access: "public",
      }),
      SHOPIFY_PRIVATE_API_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  output: process.env.PREVIEW === "true" ? "server" : "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
});
