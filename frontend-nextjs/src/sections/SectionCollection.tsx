import type { SectionCollectionFragment } from "sanity-nextjs/generated/graphql";
import { fetchShopifyCollectionWithThumbnails } from "@/lib/fetches/collectionShopifySanity";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";

interface Props {
  section: SectionCollectionFragment;
}

export default async function SectionCollection({ section }: Props) {
  const handle = section.collection?.shopify?.handle?.current;
  if (!handle) return null;

  const collection = await fetchShopifyCollectionWithThumbnails(handle, await getRenderLocale());

  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-collection g-page-margin g-section-md"
      id={section.id ?? undefined}
    >
      <h2 className="g-heading-4 mb-10 text-center">
        Collection: {section.collection?.shopify?.title}
        <sup>({collection.shopify?.products.nodes.length ?? 0})</sup>
      </h2>

      <ProductThumbnailsGrid products={collection.productThumbnails} />
    </section>
  );
}
