import type { MetadataRoute } from "next";
import { SITE_URL } from "@/meta/metadata";

export default function robots(): MetadataRoute.Robots {
  if (process.env.PREVIEW === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: SITE_URL ? new URL("/sitemap.xml", SITE_URL).href : undefined,
  };
}
