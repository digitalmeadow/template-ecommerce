import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionsRenderer from "@/sections/SectionsRenderer";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import { getPage, getPages } from "@/lib/sanity/paths";
import { resolveMeta } from "@/lib/sanity/meta";
import { buildBreadcrumbSchema } from "@/lib/sanity/structuredData";
import { resolveSanityHref } from "@/lib/sanity/resolve";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({ slug: page.slug!.current! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getPage(slug);
  if (!pageData) return {};

  return buildMetadata({
    metaData: resolveMeta(pageData),
    pathname: resolveSanityHref("page", slug),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pageData = await getPage(slug);
  if (!pageData) notFound();

  // Every page needs an h1; the hero section provides one when present.
  const hasHeroHeading = pageData.sections?.some(
    (section) => section?.__typename === "SectionHero" && section.heading,
  );

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema(
          resolveSanityHref("page", slug),
          pageData.title,
          SITE_URL,
        )}
      />
      {!hasHeroHeading && pageData.title && (
        <h1 className="visually-hidden">{pageData.title}</h1>
      )}
      <SectionsRenderer sections={pageData.sections} />
    </>
  );
}
