import type { APIRoute } from "astro";
import { INDEXABLE } from "astro:env/client";

// An endpoint rather than a static file so the sitemap URL follows the site's own domain.
// Non-indexable builds still allow crawling: a disallowed page's noindex is never read.
export const GET: APIRoute = ({ site }) => {
  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
    : "User-agent: *\nAllow: /\n";

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
