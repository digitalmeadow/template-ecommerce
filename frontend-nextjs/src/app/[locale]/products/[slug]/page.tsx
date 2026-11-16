import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductShopifySanity, isProductInShopify } from "@/lib/fetches/productShopifySanity";
import { resolveMeta } from "@/lib/sanity/meta";
import { getProduct, getProducts } from "@/lib/sanity/paths";
import { resolveSanityHref } from "@/lib/sanity/resolve";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/sanity/structuredData";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import ProductMain from "@/sections/product/ProductMain";
import ProductRelated from "@/sections/product/ProductRelated";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const handles = (await getProducts()).map((product) => product.shopify!.handle!.current!);
  const inShopify = await Promise.all(handles.map(isProductInShopify));
  return handles.filter((_, index) => inShopify[index]).map((slug) => ({ slug }));
}

async function loadProduct(slug: string) {
  const sanityProduct = await getProduct(slug);
  if (!sanityProduct) return null;
  return fetchProductShopifySanity(slug, await getRenderLocale(), sanityProduct);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return {};

  return buildMetadata({
    meta: resolveMeta(product.sanity, { title: product.shopify.title }),
    locale: await getRenderLocale(),
    pathname: resolveSanityHref("product", slug),
    ogType: null,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) notFound();

  const locale = await getRenderLocale();
  const meta = resolveMeta(product.sanity, { title: product.shopify.title });
  const pathname = resolveSanityHref("product", slug);

  return (
    <>
      {/* Next's OpenGraph types lack "product"; React hoists this into <head>. */}
      <meta property="og:type" content="product" />
      <JsonLd schema={buildProductSchema(product, meta.description, SITE_URL, locale)} />
      <JsonLd schema={buildBreadcrumbSchema(pathname, product.shopify.title, SITE_URL, locale)} />
      <ProductMain product={product} />
      <ProductRelated products={product.relatedProducts} />
    </>
  );
}
