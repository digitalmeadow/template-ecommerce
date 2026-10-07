// @ts-check
import process from "node:process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseEnv } from "node:util";
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// `site` and `output` are read before Astro loads .env, so seed process.env from the root .env
// (symlinked in as ./.env). Real process vars win. Skipped in CI, where a missing var must fail
// astro:env validation loudly rather than fall back to a stray local file.
if (!process.env.CI) {
  try {
    const parsed = parseEnv(readFileSync(join(import.meta.dirname, ".env"), "utf8"));
    Object.assign(process.env, { ...parsed, ...process.env });
  } catch {
    // No .env is normal on a fresh clone before setup.
  }
}

// https://astro.build/config
export default defineConfig({
  // Per environment. Drives canonicals, the sitemap, robots.txt and JSON-LD @ids via Astro.site.
  site: process.env.WEBSITE_URL ?? "http://localhost:3001",

  i18n: {
    locales: ["en-AU"],
    defaultLocale: "en-AU",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  env: {
    schema: {
      PREVIEW: envField.string({
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
      // The dataset is private: read tokens must stay server-side or they ship in the bundle.
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
      GIT_BRANCH: envField.string({
        context: "client",
        access: "public",
      }),
      DEPLOY_ENVIRONMENT: envField.string({
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
    // Nothing uses astro:assets; images are hand-built Sanity CDN URLs.
    imageService: "passthrough",
  }),

  output: process.env.PREVIEW === "true" ? "server" : "static",

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  integrations: [sitemap({ lastmod: new Date() })],

  vite: {
    // The passthrough image service pulls in the noop service, which Vite only discovers once a
    // request is served. Re-optimizing then invalidates chunks the in-flight reload still
    // references, crashing dev on cold start (withastro/astro#16248).
    optimizeDeps: {
      include: [
        "astro/assets/services/noop",
        "astro-portabletext",
        "astro-portabletext/components",
      ],
    },
  },

  devToolbar: {
    enabled: false,
  },
});
