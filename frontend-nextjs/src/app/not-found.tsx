import type { Metadata } from "next";
import { buildMetadata } from "@/meta/metadata";
import { getGlobals } from "@/lib/sanity/globals";

export async function generateMetadata(): Promise<Metadata> {
  const { metaSettingsData, organisationSettingsData } = await getGlobals();
  const title = metaSettingsData?.meta?.title || organisationSettingsData?.name || "Page not found";
  return buildMetadata({ metaData: { title } });
}

export default function NotFound() {
  return (
    <div className="u-container">
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
