import type { Metadata } from "next";
import { getGlobals } from "@/lib/sanity/globals";
import { truncate, type ResolvedMeta } from "@/lib/sanity/meta";
import { DEFAULT_LOCALE } from "@/lib/shopify/locale";

export const SITE_URL = process.env.WEBSITE_URL
  ? new URL(process.env.WEBSITE_URL)
  : undefined;

const isPreview = process.env.PREVIEW === "true";

interface Options {
  metaData?: ResolvedMeta | null;
  pathname?: string;
  /* Next's OpenGraph type has no "product"; product pages render that tag themselves. */
  ogType?: "website" | "article" | null;
  noindex?: boolean;
}

// Next merges metadata shallowly, so every page builds the full object rather than relying on the layout.
export async function buildMetadata({
  metaData,
  pathname,
  ogType = "website",
  noindex = false,
}: Options = {}): Promise<Metadata> {
  const { metaSettingsData, organisationSettingsData } = await getGlobals();

  const title = metaData?.title || metaSettingsData?.meta?.title || "";

  // The organisation description is written for structured data, not search results, so it's the
  // only link in this chain that needs trimming to length.
  const description =
    metaData?.description ||
    metaSettingsData?.meta?.description ||
    truncate(organisationSettingsData?.description ?? "");

  const image = metaData?.image || metaSettingsData?.meta?.image;
  const imageUrl = image?.asset?.url ?? "/og.jpg";
  const imageAlt = image?.asset?.altText || title;

  return {
    metadataBase: SITE_URL,
    title,
    description,
    alternates: pathname ? { canonical: pathname } : undefined,
    openGraph: {
      ...(ogType ? { type: ogType } : {}),
      title,
      description,
      url: pathname,
      locale: DEFAULT_LOCALE.replace("-", "_"),
      siteName: organisationSettingsData?.name ?? undefined,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noindex || isPreview ? { index: false, follow: false } : undefined,
  };
}
