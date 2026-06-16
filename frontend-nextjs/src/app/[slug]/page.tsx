import SectionsRenderer from "@/sections/SectionsRenderer";
import { sanityClient } from "sanity-nextjs/client.server";
import { pageQuery, pagesQuery } from "sanity-nextjs/queries/page";

export async function generateStaticParams() {
  const result = await sanityClient.request(pagesQuery);
  return result.allPage
    .map((page) => page.slug?.current)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await sanityClient.request(pageQuery, { slug });
  const pageData = result.allPage[0];

  return <SectionsRenderer sections={pageData.sections} />;
}
