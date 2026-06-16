import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { cn } from "@/lib/utils";

interface Props {
  productsData: ProductThumbnailShopifySanity[];
  className?: string;
}

export default function ProductThumbnailsGrid({
  productsData,
  className,
}: Props) {
  if (!productsData?.length) return null;

  return (
    <div
      className={cn(
        "w-[min(100%,var(--container-width))] mx-auto",
        "grid grid-cols-4 gap-[var(--gutter)] mt-[var(--s40)]",
        "max-sm:grid-cols-2",
        "hover-group",
        "[&>.grid-item:nth-child(6n+1)]:row-span-2 [&>.grid-item:nth-child(6n+1)]:col-span-2",
        "max-sm:[&>.grid-item:nth-child(6n+1)]:row-span-1 max-sm:[&>.grid-item:nth-child(6n+1)]:col-span-1",
        "max-sm:[&>.grid-item:nth-child(5n+1)]:row-span-2 max-sm:[&>.grid-item:nth-child(5n+1)]:col-span-2",
        className,
      )}
    >
      {productsData.map((productData) => (
        <div key={productData.shopify.id} className="grid-item w-full">
          <ProductThumbnail productData={productData} />
        </div>
      ))}
    </div>
  );
}
