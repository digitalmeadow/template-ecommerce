const CART_COOKIE = "cart";
const CART_GID_PREFIX = "gid://shopify/Cart/";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

// Not HttpOnly: the browser reads it to know whether a cart exists before asking the server.
// Stores the token without its gid prefix, as Shopify's own storefronts do.

export function readCartId(cookieHeader: string | null): string | null {
  const token = cookieHeader?.match(/(?:^|;\s*)cart=([^;]+)/)?.[1];
  if (!token) return null;
  try {
    return `${CART_GID_PREFIX}${decodeURIComponent(token)}`;
  } catch {
    return null;
  }
}

export function serializeCartCookie(cartId: string, url: URL): string {
  const token = encodeURIComponent(cartId.replace(CART_GID_PREFIX, ""));
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return `${CART_COOKIE}=${token}; Path=/; SameSite=Lax; Max-Age=${MAX_AGE_SECONDS}${secure}`;
}

export function serializeExpiredCartCookie(): string {
  return `${CART_COOKIE}=; Path=/; SameSite=Lax; Max-Age=0`;
}

export function hasCartCookie(): boolean {
  return /(?:^|;\s*)cart=[^;]+/.test(document.cookie);
}
