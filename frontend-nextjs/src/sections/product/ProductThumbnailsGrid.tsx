import type { ProductThumbnailShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductThumbnail from "@/sections/product/ProductThumbnail";

interface Props {
  products: ProductThumbnailShopifySanity[];
}

// Every sixth card leads at twice the size (every fifth on mobile).
export default function ProductThumbnailsGrid({ products }: Props) {
  return (
    <div className="product-thumbnails-grid hover-group grid grid-cols-4 gap-[var(--gutter)] mobile:grid-cols-2 mobile:[&>*:nth-child(5n+1)]:col-span-2 mobile:[&>*:nth-child(5n+1)]:row-span-2 [&>*:nth-child(6n+1)]:col-span-2 [&>*:nth-child(6n+1)]:row-span-2 mobile:[&>*:nth-child(6n+1):not(:nth-child(5n+1))]:col-span-1 mobile:[&>*:nth-child(6n+1):not(:nth-child(5n+1))]:row-span-1">
      {products.map((product) => (
        <div key={product.shopify.id}>
          <ProductThumbnail product={product} />
        </div>
      ))}
    </div>
  );
}
