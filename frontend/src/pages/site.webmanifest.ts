import type { APIRoute } from "astro";
import { THEME_COLOR } from "@config";
import { getGlobals } from "@lib/sanity/globals";

// An endpoint rather than a static file so the app name follows the organisation settings.
export const GET: APIRoute = async () => {
  const { organisationSettingsData } = await getGlobals();
  const name = organisationSettingsData?.name ?? undefined;

  const manifest = {
    name,
    short_name: name,
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR,
    display: "standalone",
  };

  return new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/manifest+json" },
  });
};
