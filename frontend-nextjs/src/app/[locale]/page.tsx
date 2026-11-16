import type { Metadata } from "next";
import { getGlobals } from "@/lib/sanity/globals";
import { resolveMeta } from "@/lib/sanity/meta";
import { getHome } from "@/lib/sanity/paths";
import { hasHeroHeading } from "@/lib/sanity/sections";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { buildMetadata } from "@/meta/metadata";
import SectionsRenderer from "@/sections/SectionsRenderer";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHome();
  return buildMetadata({ meta: resolveMeta(page), locale: await getRenderLocale(), pathname: "/" });
}

export default async function HomePage() {
  const [page, { organisationSettings }] = await Promise.all([getHome(), getGlobals()]);

  return (
    <>
      {!hasHeroHeading(page?.sections) && organisationSettings?.name && (
        <h1 className="g-sr-only">{organisationSettings.name}</h1>
      )}
      <SectionsRenderer sections={page?.sections} />
    </>
  );
}
