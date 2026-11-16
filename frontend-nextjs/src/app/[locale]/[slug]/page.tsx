import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveMeta } from "@/lib/sanity/meta";
import { getPage, getPages } from "@/lib/sanity/paths";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { hasHeroHeading } from "@/lib/sanity/sections";
import { buildBreadcrumbSchema } from "@/lib/sanity/structuredData";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import SectionsRenderer from "@/sections/SectionsRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.slug!.current! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};

  return buildMetadata({
    meta: resolveMeta(page),
    locale: await getRenderLocale(),
    pathname: resolveSanityHref("page", slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  const locale = await getRenderLocale();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema(
          resolveSanityHref("page", slug),
          page.title,
          SITE_URL,
          locale,
        )}
      />
      {!hasHeroHeading(page.sections) && page.title && <h1 className="g-sr-only">{page.title}</h1>}
      <SectionsRenderer sections={page.sections} />
    </>
  );
}
