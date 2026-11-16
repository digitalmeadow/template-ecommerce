import type { NextConfig } from "next";
import { LOCALES } from "./src/config";
import { buildRedirects } from "./src/lib/shopify/redirects";
import { getSellableLocales } from "./src/lib/shopify/sellableLocales";

const isPreview = process.env.PREVIEW === "true";
// Vercel sets VERCEL_ENV; only its production deployment is indexable. Local builds count as production.
const isProductionDeployment = (process.env.VERCEL_ENV ?? "production") === "production";
const isIndexable = !isPreview && isProductionDeployment;

export default async function nextConfig(): Promise<NextConfig> {
  const sellableLocales = await getSellableLocales(LOCALES);
  const redirects = await buildRedirects(sellableLocales.slice(1).map((locale) => locale.path));

  return {
    reactCompiler: true,
    // One unprefixed root .env serves both apps; only non-secret values reach the browser.
    env: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? "",
      NEXT_PUBLIC_SANITY_DATASET: process.env.SANITY_DATASET ?? "",
      NEXT_PUBLIC_PREVIEW: String(isPreview),
      NEXT_PUBLIC_INDEXABLE: String(isIndexable),
      // The locales this build serves, for lib/shopify/locale.ts (browser code included).
      NEXT_PUBLIC_SELLABLE_LOCALE_PATHS: sellableLocales.map((locale) => locale.path).join(","),
    },
    images: {
      deviceSizes: [400, 600, 800, 1000, 1400, 1800, 2200],
      imageSizes: [64, 96, 128, 192, 256],
    },
    async redirects() {
      return redirects;
    },
    async headers() {
      if (isIndexable) return [];
      return [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
    },
  };
}
