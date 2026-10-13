export const prerender = false;

import type { APIRoute } from "astro";

// The visitor's country for LocationNotice. Cloudflare sets CF-IPCountry on every request that
// reaches the worker; static pages never do, hence an endpoint. Absent in dev.
export const GET: APIRoute = ({ request }) => {
  const country = request.headers.get("cf-ipcountry");

  // "XX" / "T1": unknown or Tor.
  const known = country && /^[A-Z]{2}$/.test(country) && country !== "XX";

  return new Response(JSON.stringify({ country: known ? country : null }), {
    headers: { "content-type": "application/json", "cache-control": "private, no-store" },
  });
};
