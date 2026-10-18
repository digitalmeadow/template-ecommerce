import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductGallery from "@/sections/product/ProductGallery";
import ProductPurchase from "@/sections/product/ProductPurchase";
import Accordion from "@/layouts/Accordion";
import PortableText from "@/fields/PortableText";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductShopifySanity | null | undefined;
  className?: string;
}

export default function ProductMain({ productData, className }: Props) {
  if (!productData) return null;

  return (
    <section
      data-product-root
      data-prices={JSON.stringify(productData.pricesPerLocale)}
      className={cn(
        "product-main",
        "mx-auto mt-[var(--s200)] w-[var(--container-width)]",
        "grid grid-cols-[1fr_1fr] items-start gap-[var(--gutter)]",
        "max-sm:flex max-sm:flex-col-reverse",
        className,
      )}
    >
      <ProductGallery productData={productData} />

      <div
        className={cn(
          "purchase-panel",
          "sticky top-[var(--s200)] h-[calc(100svh-var(--s200))]",
          "pl-[calc(var(--column)+var(--gutter))]",
          "flex flex-col gap-y-[var(--s40)]",
          "max-sm:static max-sm:h-auto max-sm:pl-0",
        )}
      >
        <ProductPurchase productData={productData} />

        <div className="accordions mt-auto pb-[var(--margin)]">
          {productData.sanity.accordions?.map((accordion, accordionIndex) => {
            if (!accordion) return null;
            return (
              <Accordion
                key={accordionIndex}
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
