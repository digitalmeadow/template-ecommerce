import { proxyStorefrontRequest } from "@/lib/shopify/proxy";

interface Context {
  params: Promise<{ version: string }>;
}

// Same-origin Storefront API, for our browser code and Shopify's own scripts (consent, analytics).
async function proxy(request: Request, { params }: Context) {
  const { version } = await params;
  if (!/^(unstable|\d{4}-\d{2})$/.test(version)) return new Response(null, { status: 404 });
  return proxyStorefrontRequest(request);
}

export const GET = proxy;
export const POST = proxy;
