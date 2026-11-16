import type { MetadataRoute } from "next";
import { isIndexable, SITE_URL } from "@/meta/metadata";

// Non-indexable builds still allow crawling: a disallowed page's noindex is never read.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: isIndexable ? new URL("/sitemap.xml", SITE_URL).href : undefined,
  };
}
