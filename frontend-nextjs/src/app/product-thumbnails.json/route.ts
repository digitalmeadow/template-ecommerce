import { fetchSanityProductThumbnails } from "@/lib/fetches/productShopifySanity";

export const dynamic = "force-static";

// Built once per deploy, so on-demand grids (filters, search) pair Shopify results with
// Sanity media without a metered Sanity request per visit.
export async function GET() {
  const thumbnails = await fetchSanityProductThumbnails();
  return Response.json(Object.fromEntries(thumbnails));
}
