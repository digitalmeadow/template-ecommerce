import { SHOPIFY_STORE_DOMAIN } from "shopify/config";

// Cart permalinks (`/cart/{variantId}:{quantity},…`) from emails, ads and QR codes; Shopify builds the cart.
export async function GET(request: Request, { params }: { params: Promise<{ lines: string }> }) {
  const { lines } = await params;
  if (!/^\d+:\d+(,\d+:\d+)*$/.test(lines)) return new Response(null, { status: 404 });
  const url = new URL(request.url);
  return Response.redirect(`https://${SHOPIFY_STORE_DOMAIN}${url.pathname}${url.search}`, 302);
}
