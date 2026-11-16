import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocalePath } from "@/lib/shopify/locale";

// Pages live under app/[locale]. The default locale is served unprefixed: its URLs are rewritten
// to its segment, and the prefixed form redirects to the unprefixed one.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const [, segment = ""] = pathname.split("/");

  if (segment === DEFAULT_LOCALE.path) {
    const unprefixed = pathname.slice(DEFAULT_LOCALE.path.length + 1) || "/";
    return NextResponse.redirect(new URL(`${unprefixed}${search}`, request.url), 301);
  }

  if (isLocalePath(segment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE.path}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything but on-demand routes, build output and files.
  matcher: [
    "/((?!api|checkout|cart/|partials|style-guide|_next|_vercel|sitemap\\.xml|robots\\.txt|site\\.webmanifest|forms\\.json|product-thumbnails\\.json|.*\\.[a-z0-9]+$).*)",
  ],
};
