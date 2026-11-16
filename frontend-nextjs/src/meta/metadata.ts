import type { Metadata } from "next";
import { getGlobals } from "@/lib/sanity/globals";
import { truncate, type ResolvedMeta } from "@/lib/sanity/meta";
import { getHtmlLang, LOCALE_LIST, localizeHref, type Locale } from "@/lib/shopify/locale";

export const SITE_URL = new URL(process.env.WEBSITE_URL ?? "http://localhost:3000");

export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

interface Options {
  meta: ResolvedMeta | null | undefined;
  locale: Locale;
  /** The page's unprefixed path. */
  pathname: string;
  // Next's OpenGraph type has no "product"; product pages render that tag themselves.
  ogType?: "website" | "article" | null;
  /** Pages that shouldn't appear in search results (e.g. search itself). */
  noindex?: boolean;
}

// Next merges metadata shallowly, so every page builds the full object rather than relying on the layout.
export async function buildMetadata({
  meta,
  locale,
  pathname,
  ogType = "website",
  noindex = false,
}: Options): Promise<Metadata> {
  const { metaSettings, organisationSettings } = await getGlobals();

  const title = meta?.title || metaSettings?.meta?.title || "";

  // The organisation description is written for structured data, not search results, so it's the
  // only link in this chain that needs trimming to length.
  const description =
    meta?.description ||
    metaSettings?.meta?.description ||
    truncate(organisationSettings?.description ?? "");

  const image = meta?.image || metaSettings?.meta?.image;
  const imageUrl = image?.asset?.url ?? "/og.jpg";
  const imageAlt = image?.asset?.altText || title;

  const canonical = localizeHref(pathname, locale);
  const languages =
    LOCALE_LIST.length > 1
      ? {
          ...Object.fromEntries(
            LOCALE_LIST.map((alternate) => [
              getHtmlLang(alternate),
              localizeHref(pathname, alternate),
            ]),
          ),
          "x-default": localizeHref(pathname, LOCALE_LIST[0]!),
        }
      : undefined;

  return {
    metadataBase: SITE_URL,
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      ...(ogType ? { type: ogType } : {}),
      title,
      description,
      url: canonical,
      locale: getHtmlLang(locale).replace("-", "_"),
      siteName: organisationSettings?.name ?? undefined,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: !isIndexable || noindex ? { index: false, follow: false } : undefined,
  };
}
