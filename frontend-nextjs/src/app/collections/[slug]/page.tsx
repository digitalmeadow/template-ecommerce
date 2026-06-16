import SectionHero from "@/sections/SectionHero";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";
import Meta from "@/meta/Meta";
import { sanityClient } from "sanity-nextjs/client.server";
import { collectionsQuery } from "sanity-nextjs/queries/collection";
import { fetchCollectionShopifySanity } from "@/lib/fetches/collectionShopifySanity";
import type {
  MetaFragment,
  SectionHeroFragment,
} from "sanity-nextjs/generated/graphql";

export async function generateStaticParams() {
  const result = await sanityClient.request(collectionsQuery);
  return result.allCollection
    .map((collection) => collection.shopify?.handle?.current)
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collectionData = await fetchCollectionShopifySanity(slug);

  const metaData: MetaFragment = {
    __typename: "Meta",
    title: collectionData.sanity?.meta?.title || collectionData.shopify.title,
    description: collectionData.sanity?.meta?.description ?? null,
    image: collectionData.sanity?.meta?.image ?? null,
  };

  const heroSection: SectionHeroFragment = {
    __typename: "SectionHero",
    _key: null,
    heading: collectionData.shopify.title,
    textRaw: null,
    backgroundMedia: null,
  };

  return (
    <>
      <Meta metaData={metaData} />
      <SectionHero sectionData={heroSection} />
      <ProductThumbnailsGrid productsData={collectionData.productThumbnails} />
    </>
  );
}
