import type { NextConfig } from "next";

const isPreview = process.env.PREVIEW === "true";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // One unprefixed root .env serves both apps; only non-secret values reach the browser.
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID ?? "",
    NEXT_PUBLIC_SANITY_DATASET: process.env.SANITY_DATASET ?? "",
  },
  images: {
    deviceSizes: [400, 600, 800, 1000, 1400, 1800, 2200],
    imageSizes: [64, 96, 128, 192, 256],
  },
  async headers() {
    // The preview site is otherwise a fully indexable duplicate of live.
    if (!isPreview) return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
