import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHero from "@/sections/SectionHero";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import { getCollection, getCollections } from "@/lib/sanity/paths";
import { resolveMeta } from "@/lib/sanity/meta";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { buildBreadcrumbSchema } from "@/lib/sanity/structuredData";
import { fetchCollectionShopifySanity } from "@/lib/fetches/collectionShopifySanity";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.shopify!.handle!.current!,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityCollection = await getCollection(slug);
  if (!sanityCollection) return {};

  return buildMetadata({
    metaData: resolveMeta(sanityCollection, {
      title: sanityCollection.shopify?.title,
    }),
    pathname: resolveSanityHref("collection", slug),
  });
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const sanityCollection = await getCollection(slug);
  if (!sanityCollection) notFound();

  const collectionData = await fetchCollectionShopifySanity(
    slug,
    sanityCollection,
  );

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema(
          resolveSanityHref("collection", slug),
          collectionData.shopify.title,
          SITE_URL,
        )}
      />
      <SectionHero
        sectionData={{
          __typename: "SectionHero",
          _key: null,
          colorScheme: null,
          heading: collectionData.shopify.title,
          textRaw: null,
          backgroundMedia: null,
        }}
      />
      <ProductThumbnailsGrid productsData={collectionData.productThumbnails} />
    </>
  );
}
