import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { cn } from "@/lib/utils";

interface Props {
  productsData: ProductThumbnailShopifySanity[] | null | undefined;
  className?: string;
}

export default function ProductThumbnailsGrid({ productsData, className }: Props) {
  if (!productsData?.length) return null;

  return (
    <div
      className={cn(
        "product-thumbnails-grid",
        "mx-auto w-[min(100%,var(--container-width))]",
        "mt-[var(--s40)] grid grid-cols-4 gap-[var(--gutter)]",
        "max-sm:grid-cols-2",
        "hover-group",
        "[&>.grid-item:nth-child(6n+1)]:col-span-2 [&>.grid-item:nth-child(6n+1)]:row-span-2",
        // Tailwind doesn't preserve source order between these, so the reset excludes 5n+1 items.
        "max-sm:[&>.grid-item:nth-child(6n+1):not(:nth-child(5n+1))]:col-span-1 max-sm:[&>.grid-item:nth-child(6n+1):not(:nth-child(5n+1))]:row-span-1",
        "max-sm:[&>.grid-item:nth-child(5n+1)]:col-span-2 max-sm:[&>.grid-item:nth-child(5n+1)]:row-span-2",
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
