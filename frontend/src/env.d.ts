declare namespace App {
  interface Locals {
    /** Set by on-demand partials, which render outside their locale's URL. */
    locale?: import("@lib/shopify/locale").Locale;
  }
}

// The worker bindings we read (wrangler.jsonc), without pulling in the full generated runtime types.
declare module "cloudflare:workers" {
  export const env: {
    ASSETS: { fetch(input: Request | URL | string): Promise<Response> };
  };
}

/** Defined in astro.config.mjs: the configured locales Shopify sells to. */
declare const __SELLABLE_LOCALE_PATHS__: string[];
