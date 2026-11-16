import { INDEXABLE } from "astro:env/client";
import { defineMiddleware } from "astro:middleware";

// Every server-rendered response on a non-indexable build, non-HTML included. Set here rather
// than in a component, where the page may have started streaming and the header is dropped.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (INDEXABLE) return response;

  // Copied, as fetched and redirect responses have immutable headers.
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
