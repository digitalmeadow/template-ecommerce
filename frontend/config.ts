// Non-secret build values per Worker, keyed by its `CLOUDFLARE_ENV` (an `env` in wrangler.jsonc).
// Local builds have no CLOUDFLARE_ENV and read the root .env instead.
const SANITY_BUILD_ENV = { SANITY_PROJECT_ID: "iqfm6q7t", SANITY_DATASET: "production" };

export const DEPLOY_ENVIRONMENTS: Record<string, Record<string, string>> = {
  production: {
    ...SANITY_BUILD_ENV,
    WEBSITE_URL: "https://template-ecommerce-production.digital-meadow.workers.dev",
    PREVIEW: "false",
  },
  "production-preview": {
    ...SANITY_BUILD_ENV,
    WEBSITE_URL: "https://template-ecommerce-production-preview.digital-meadow.workers.dev",
    PREVIEW: "true",
  },
};

// Workers Builds deploys this branch; any other branch builds a noindexed Preview.
export const PRODUCTION_BRANCH = "main";

// Document types a `link` can point at. Each needs a route below; the Studio reads this list too.
export const LINKABLE_DOCUMENT_TYPES = ["home", "page", "product", "collection"] as const;
export type LinkableDocumentType = (typeof LINKABLE_DOCUMENT_TYPES)[number];

const LINKABLE_ROUTE_PATTERNS = {
  home: "/",
  page: "/[slug]",
  product: "/products/[slug]",
  collection: "/collections/[slug]",
} satisfies Record<LinkableDocumentType, string>;

export const SANITY_DOCUMENT_ROUTE_PATTERNS: Record<string, string> = {
  header: "/",
  footer: "/",
  announcementBanner: "/",
  cookieConsent: "/",
  locationNotice: "/",
  ...LINKABLE_ROUTE_PATTERNS,
};

// One per Shopify market the site sells in. The first is the default and is served unprefixed;
// the rest at `/{path}/…`, built from the same pages with that market's prices. Currency comes from Shopify.
export const LOCALES = [
  { path: "en-au", country: "AU", language: "EN", label: "Australia" },
  { path: "en-nz", country: "NZ", language: "EN", label: "New Zealand" },
  { path: "en-us", country: "US", language: "EN", label: "United States" },
] as const;

// Browser UI and web app manifest colour; mirrors `--core-cream` (the light background) in src/styles/tokens/colors.css.
export const THEME_COLOR = "#f6f2e5";
