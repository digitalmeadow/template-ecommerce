import type { Metadata } from "next";
import SectionsRenderer from "@/sections/SectionsRenderer";
import { getHome } from "@/lib/sanity/paths";
import { getGlobals } from "@/lib/sanity/globals";
import { resolveMeta } from "@/lib/sanity/meta";
import { hasHeroHeading } from "@/lib/sanity/sections";
import { buildMetadata } from "@/meta/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getHome();
  return buildMetadata({ metaData: resolveMeta(pageData), pathname: "/" });
}

export default async function HomePage() {
  const [pageData, { organisationSettingsData }] = await Promise.all([getHome(), getGlobals()]);

  return (
    <>
      {!hasHeroHeading(pageData?.sections) && organisationSettingsData?.name && (
        <h1 className="visually-hidden">{organisationSettingsData.name}</h1>
      )}
      <SectionsRenderer sections={pageData?.sections} />
    </>
  );
}
