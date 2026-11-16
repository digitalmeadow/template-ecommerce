import type { APIRoute } from "astro";
import { fetchSanityProductThumbnails } from "@lib/fetches/productShopifySanity";

export const prerender = true;

// Built once per deploy, so on-demand grids (filters, search) pair Shopify results with
// Sanity media without a metered Sanity request per visit.
export const GET: APIRoute = async () => {
  const thumbnails = await fetchSanityProductThumbnails();
  return Response.json(Object.fromEntries(thumbnails));
};
