export const prerender = false;

import type { APIRoute } from "astro";
import { proxyStorefrontRequest } from "@lib/shopify/proxy";

// Same-origin Storefront API, for our browser code and Shopify's own scripts (consent, analytics).
const proxy: APIRoute = ({ params, request }) => {
  if (!/^(unstable|\d{4}-\d{2})$/.test(params.version ?? "")) {
    return new Response(null, { status: 404 });
  }
  return proxyStorefrontRequest(request);
};

export const GET = proxy;
export const POST = proxy;
