import type { APIRoute } from "astro";
import { PREVIEW } from "astro:env/client";

// An endpoint rather than a static file so the sitemap URL follows the site's own domain.
export const GET: APIRoute = ({ site }) => {
  const body =
    PREVIEW === "true"
      ? "User-agent: *\nDisallow: /\n"
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};
