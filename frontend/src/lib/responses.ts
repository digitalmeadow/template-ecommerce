import type { APIContext } from "astro";
import { env } from "cloudflare:workers";

/** Buyer-specific responses (carts, sessions, live data): never stored by a shared cache. */
export const PRIVATE_CACHE_CONTROL = "private, no-store";

/** The 404 page with a 404 status, from an on-demand route. */
export async function respondNotFound(context: APIContext): Promise<Response> {
  // Static workers serve the built page; dev and the SSR preview have none, so render it.
  const page = await env.ASSETS.fetch(new URL("/404.html", context.url));
  if (!page.ok) {
    const rendered = await context.rewrite("/404");
    return new Response(rendered.body, { status: 404, headers: rendered.headers });
  }
  return new Response(page.body, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
