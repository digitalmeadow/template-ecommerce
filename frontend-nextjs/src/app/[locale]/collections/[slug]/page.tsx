import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCollectionShopifySanity } from "@/lib/fetches/collectionShopifySanity";
import { resolveMeta } from "@/lib/sanity/meta";
import { getCollection, getCollections } from "@/lib/sanity/paths";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { buildBreadcrumbSchema } from "@/lib/sanity/structuredData";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import ProductBrowser from "@/sections/product/ProductBrowser";
import SectionHero from "@/sections/SectionHero";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ slug: collection.shopify!.handle!.current! }));
}

async function loadCollection(slug: string) {
  const sanityCollection = await getCollection(slug);
  if (!sanityCollection) return null;
  return fetchCollectionShopifySanity(slug, await getRenderLocale(), sanityCollection);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await loadCollection(slug);
  if (!collection) return {};

  return buildMetadata({
    meta: resolveMeta(collection.sanity, { title: collection.shopify.title }),
    locale: await getRenderLocale(),
    pathname: resolveSanityHref("collection", slug),
  });
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = await loadCollection(slug);
  if (!collection) notFound();

  const locale = await getRenderLocale();

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema(
          resolveSanityHref("collection", slug),
          collection.shopify.title,
          SITE_URL,
          locale,
        )}
      />
      <SectionHero
        section={{
          __typename: "SectionHero",
          _key: null,
          colorScheme: null,
          id: null,
          heading: collection.shopify.title,
          textRaw: null,
          mediaBackground: null,
        }}
      />
      <div className="g-page-margin g-section-sm">
        <ProductBrowser
          source={{ type: "collection", handle: collection.shopify.handle }}
          collectionId={collection.shopify.id}
          results={{
            products: collection.productThumbnails,
            filters: collection.shopify.products.filters,
            hasNextPage: collection.shopify.products.pageInfo.hasNextPage,
            endCursor: collection.shopify.products.pageInfo.endCursor ?? null,
          }}
        />
      </div>
    </>
  );
}
