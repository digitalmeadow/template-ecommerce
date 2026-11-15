export const prerender = false;

import type { APIRoute } from "astro";
import { SHOPIFY_STORE_DOMAIN } from "shopify/config";
import { respondNotFound } from "@lib/responses";

// Cart permalinks (`/cart/{variantId}:{quantity},…`) from emails, ads and QR codes; Shopify builds the cart.
export const GET: APIRoute = (context) => {
  const { params, url } = context;
  if (!/^\d+:\d+(,\d+:\d+)*$/.test(params.lines ?? "")) return respondNotFound(context);
  return Response.redirect(`https://${SHOPIFY_STORE_DOMAIN}${url.pathname}${url.search}`, 302);
};
