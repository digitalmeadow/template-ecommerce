import PortableText from "@/fields/PortableText";
import Accordion from "@/layouts/Accordion";
import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductGallery from "@/sections/product/ProductGallery";
import ProductPurchase from "@/sections/product/ProductPurchase";

interface Props {
  product: ProductShopifySanity;
}

export default function ProductMain({ product }: Props) {
  return (
    <section className="product-main grid grid-cols-2 items-start gap-[var(--gutter)] g-page-margin pt-40 mobile:flex mobile:flex-col-reverse">
      <ProductGallery product={product} />
      <div className="sticky top-40 flex h-[calc(100svh-var(--size-40))] flex-col gap-y-10 pl-[calc(var(--column)+var(--gutter))] mobile:static mobile:h-auto mobile:pl-0">
        <ProductPurchase product={product.shopify} />

        <div className="mt-auto pb-[var(--margin)]">
          {product.sanity.accordions?.map((accordion, index) => {
            if (!accordion) return null;
            return (
              <Accordion
                key={index}
                group="product"
                summary={accordion.summary}
                content={<PortableText value={accordion.contentRaw} />}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
