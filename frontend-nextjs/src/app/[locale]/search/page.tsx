import type { Metadata } from "next";
import { EMPTY_PRODUCT_BROWSER_RESULTS } from "@/lib/fetches/productBrowser";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { buildMetadata } from "@/meta/metadata";
import ProductBrowser from "@/sections/product/ProductBrowser";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    meta: { title: "Search", description: null, image: null },
    locale: await getRenderLocale(),
    pathname: "/search",
    noindex: true,
  });
}

// Static shell: ProductBrowser reads `?q=` and fetches results on load.
export default function SearchPage() {
  return (
    <section className="flex flex-col gap-10 g-page-margin pt-40">
      <h1 className="g-heading-3">Search</h1>
      <ProductBrowser
        source={{ type: "search", query: "" }}
        results={EMPTY_PRODUCT_BROWSER_RESULTS}
      />
    </section>
  );
}
