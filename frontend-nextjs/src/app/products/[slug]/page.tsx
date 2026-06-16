import ProductSection from "@/sections/product/ProductSection";
import RelatedProductsSection from "@/sections/product/RelatedProductsSection";
import Meta from "@/meta/Meta";
import { sanityClient } from "sanity-nextjs/client.server";
import { productsQuery } from "sanity-nextjs/queries/product";
import { fetchProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import type { MetaFragment } from "sanity-nextjs/generated/graphql";

export async function generateStaticParams() {
  const result = await sanityClient.request(productsQuery);
  return result.allProduct
    .filter((product) => product.shopify?.status === "active")
    .map((product) => ({
      slug: product.shopify!.handle!.current!,
    }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productData = await fetchProductShopifySanity(slug);

  const metaData: MetaFragment = {
    __typename: "Meta",
    title: productData.sanity?.meta?.title || productData.shopify.title,
    description: productData.sanity?.meta?.description ?? null,
    image: productData.sanity?.meta?.image ?? null,
  };

  return (
    <>
      <Meta metaData={metaData} />
      <ProductSection productData={productData} />
      <RelatedProductsSection productsData={productData.relatedProducts} />
    </>
  );
}
