// The visitor's country for LocationNotice, from the edge's geolocation header (Cloudflare or Vercel).
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const country = request.headers.get("cf-ipcountry") ?? request.headers.get("x-vercel-ip-country");

  // "XX" / "T1": unknown or Tor.
  const known = country && /^[A-Z]{2}$/.test(country) && country !== "XX";

  return Response.json(
    { country: known ? country : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
