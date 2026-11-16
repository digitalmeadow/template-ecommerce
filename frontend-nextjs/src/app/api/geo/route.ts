import { PRIVATE_CACHE_CONTROL } from "@/lib/responses";

// The visitor's country for LocationNotice. Vercel sets x-vercel-ip-country on every request that
// reaches a function; static pages never do, hence a route. Absent in dev.
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const country = request.headers.get("x-vercel-ip-country");

  // "XX" / "T1": unknown or Tor.
  const isKnown = country && /^[A-Z]{2}$/.test(country) && country !== "XX";

  return Response.json(
    { country: isKnown ? country : null },
    { headers: { "cache-control": PRIVATE_CACHE_CONTROL } },
  );
}
