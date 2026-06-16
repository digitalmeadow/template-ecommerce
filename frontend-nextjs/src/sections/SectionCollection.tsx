import { shopifyClient } from "shopify/client";
import { collectionByHandleQuery } from "shopify/queries/collection";
import {
  fetchProductThumbnailShopifySanity,
  type ProductThumbnailShopifySanity,
} from "@/lib/fetches/productShopifySanity";
import ProductThumbnailsGrid from "@/sections/product/ProductThumbnailsGrid";
import type { SectionCollectionFragment } from "sanity-nextjs/generated/graphql";

interface Props {
  sectionData: SectionCollectionFragment;
}

export default async function SectionCollection({ sectionData }: Props) {
  const handle = sectionData.collection?.shopify?.handle?.current;
  if (!handle) throw new Error("Collection handle is missing");

  const shopifyCollection = await shopifyClient.request(
    collectionByHandleQuery,
    { handle },
  );

  const productHandles =
    shopifyCollection.collectionByHandle?.products.edges.map(
      (edge) => edge?.node?.handle,
    ) ?? [];

  const productsData: ProductThumbnailShopifySanity[] = [];
  for (const productHandle of productHandles) {
    if (!productHandle) continue;
    const productData =
      await fetchProductThumbnailShopifySanity(productHandle);
    productsData.push(productData);
  }

  return (
    <section className="mx-auto flex w-[var(--container-width)] flex-col items-center text-center">
      <h2>
        Collection: {sectionData.collection?.shopify?.title}
        <sup>({shopifyCollection.collectionByHandle?.products.edges.length})</sup>
      </h2>

      <ProductThumbnailsGrid productsData={productsData} />
    </section>
  );
}
