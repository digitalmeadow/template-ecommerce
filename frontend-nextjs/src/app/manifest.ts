import type { MetadataRoute } from "next";
import { THEME_COLOR } from "@/config";
import { getGlobals } from "@/lib/sanity/globals";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { organisationSettingsData } = await getGlobals();
  const name = organisationSettingsData?.name ?? undefined;

  return {
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
}
