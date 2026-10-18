import type { SectionCollectionFragment } from "sanity-nextjs/generated/graphql";
import { fetchShopifyCollectionWithThumbnails } from "@/lib/fetches/collectionShopifySanity";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";

interface Props {
  sectionData: SectionCollectionFragment;
}

export default async function SectionCollection({ sectionData }: Props) {
  const handle = sectionData.collection?.shopify?.handle?.current;
  if (!handle) return null;

  const collection = await fetchShopifyCollectionWithThumbnails(handle);

  return (
    <section
      data-color-scheme={sectionData.colorScheme ?? undefined}
      id={sectionData.id ?? undefined}
      className="section-collection u-container flex flex-col items-center text-center"
    >
      <h2>
        Collection: {sectionData.collection?.shopify?.title}
        <sup>({collection.shopify?.products.edges.length ?? 0})</sup>
      </h2>

      <ProductThumbnailsGrid productsData={collection.productThumbnails} />
    </section>
  );
}
