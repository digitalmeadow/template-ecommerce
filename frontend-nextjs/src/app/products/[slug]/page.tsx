import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductMain from "@/sections/product/ProductMain";
import ProductRelated from "@/sections/product/ProductRelated";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import { getProduct, getProducts } from "@/lib/sanity/paths";
import { resolveMeta } from "@/lib/sanity/meta";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/sanity/structuredData";
import { fetchProductShopifySanity } from "@/lib/fetches/productShopifySanity";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.shopify!.handle!.current!,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanityProduct = await getProduct(slug);
  if (!sanityProduct) return {};

  return buildMetadata({
    metaData: resolveMeta(sanityProduct, {
      title: sanityProduct.shopify?.title,
    }),
    pathname: resolveSanityHref("product", slug),
    ogType: null,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const sanityProduct = await getProduct(slug);
  if (!sanityProduct) notFound();

  const productData = await fetchProductShopifySanity(slug, sanityProduct);
  const metaData = resolveMeta(productData.sanity, {
    title: productData.shopify.title,
  });

  return (
    <>
      {/* Next's OpenGraph types lack "product"; React hoists this into <head>. */}
      <meta property="og:type" content="product" />
      <JsonLd schema={buildProductSchema(productData, metaData.description, SITE_URL)} />
      <JsonLd
        schema={buildBreadcrumbSchema(
          resolveSanityHref("product", slug),
          productData.shopify.title,
          SITE_URL,
        )}
      />
      <ProductMain productData={productData} />
      <ProductRelated productsData={productData.relatedProducts} />
    </>
  );
}
