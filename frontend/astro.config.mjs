// @ts-check
import process from "node:process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { URL } from "node:url";
import { parseEnv } from "node:util";
import { defineConfig, envField } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { DEPLOY_ENVIRONMENTS, LOCALES, PRODUCTION_BRANCH } from "./config.ts";
import { getSellableLocales } from "./src/lib/shopify/sellableLocales.ts";

// `site` and `output` are read before Astro loads .env, so seed process.env here. Precedence:
// real process vars, then the Worker's DEPLOY_ENVIRONMENTS entry, then the root .env (symlinked
// in as ./.env). The .env is skipped in CI, where a missing var must fail astro:env validation
// loudly rather than fall back to a stray local file.
function readLocalEnv() {
  if (process.env.CI) return {};
  try {
    return parseEnv(readFileSync(join(import.meta.dirname, ".env"), "utf8"));
  } catch {
    // No .env is normal on a fresh clone before setup.
    return {};
  }
}

const deployEnvironment = DEPLOY_ENVIRONMENTS[process.env.CLOUDFLARE_ENV ?? ""] ?? {};
Object.assign(process.env, { ...readLocalEnv(), ...deployEnvironment, ...process.env });

// Workers Builds sets WORKERS_CI_BRANCH; branch Previews and the drafts site stay out of search.
const isBranchPreview =
  process.env.WORKERS_CI_BRANCH !== undefined &&
  process.env.WORKERS_CI_BRANCH !== PRODUCTION_BRANCH;
process.env.INDEXABLE = String(process.env.PREVIEW !== "true" && !isBranchPreview);

const isPreview = process.env.PREVIEW === "true";

const SELLABLE_LOCALES = await getSellableLocales(LOCALES);
const DEFAULT_LOCALE_PATH = SELLABLE_LOCALES[0].path;
const UNINDEXED_SEGMENTS = ["404", "search", "partials", "api", "cart", "checkout"];

/**
 * The style guide, in dev and on the preview site only: static production builds never emit it.
 * @type {import("astro").AstroIntegration}
 */
const styleGuide = {
  name: "style-guide",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command !== "dev" && !isPreview) return;
      injectRoute({
        pattern: "/style-guide/frame/[id]",
        entrypoint: "./src/styleGuide/StyleGuideFrame.astro",
        prerender: false,
      });
      injectRoute({
        pattern: "/style-guide/[...tab]",
        entrypoint: "./src/styleGuide/StyleGuide.astro",
        prerender: false,
      });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Per environment. Drives canonicals, the sitemap, robots.txt and JSON-LD @ids via Astro.site.
  site: process.env.WEBSITE_URL ?? "http://localhost:3000",

  // Every locale renders the default locale's pages ("rewrite" keeps the URL), so a page file
  // serves all markets; `Astro.currentLocale` says which one is building.
  i18n: {
    locales: SELLABLE_LOCALES.map((locale) => locale.path),
    defaultLocale: DEFAULT_LOCALE_PATH,
    fallback: Object.fromEntries(
      SELLABLE_LOCALES.slice(1).map((locale) => [locale.path, DEFAULT_LOCALE_PATH]),
    ),
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },

  env: {
    schema: {
      PREVIEW: envField.string({
        context: "client",
        access: "public",
      }),
      INDEXABLE: envField.boolean({
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
      SHOPIFY_SANITY_SYNC_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      // Build-time reads and the Storefront API proxy; the browser never sees it.
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

  output: isPreview ? "server" : "static",

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  integrations: [
    styleGuide,
    sitemap({
      lastmod: new Date(),
      // Default-locale pages only, minus pages that aren't for search engines.
      filter: (page) => {
        const [segment = ""] = new URL(page).pathname.split("/").filter(Boolean);
        const isLocalePrefix = LOCALES.some((locale) => locale.path === segment);
        return !isLocalePrefix && !UNINDEXED_SEGMENTS.includes(segment);
      },
      // The sitemap only sees the default locale's pages (the others are rewrite fallbacks), so
      // each entry lists every locale's URL as an hreflang alternate.
      serialize(item) {
        if (SELLABLE_LOCALES.length < 2) return item;
        const url = new URL(item.url);
        item.links = SELLABLE_LOCALES.map((locale, index) => ({
          lang: `${locale.language.toLowerCase()}-${locale.country}`,
          url: new URL(index === 0 ? url.pathname : `/${locale.path}${url.pathname}`, url).href,
        }));
        return item;
      },
    }),
  ],

  vite: {
    // The locales this build serves, for lib/shopify/locale.ts (browser code included).
    define: {
      __SELLABLE_LOCALE_PATHS__: JSON.stringify(SELLABLE_LOCALES.map((locale) => locale.path)),
    },
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
