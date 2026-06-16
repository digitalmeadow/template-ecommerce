import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductVariantSelector from "@/sections/product/ProductVariantSelector";
import ProductPrice from "@/sections/product/ProductPrice";
import ProductAddToCart from "@/sections/product/ProductAddToCart";
import QuantitySelector from "@/blocks/QuantitySelector";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductShopifySanity;
  className?: string;
}

export default function ProductPurchase({ productData, className }: Props) {
  if (!productData) return null;

  return (
    <div
      className={cn(
        "product-purchase",
        "flex flex-col items-start",
        className,
      )}
    >
      <h1 data-text-fill-width className="mb-[var(--s20)]">
        {productData.shopify?.title}
      </h1>
      <ProductPrice />

      <div className="variant-selector mt-[var(--s40)]">
        <ProductVariantSelector productData={productData} />
      </div>

      <div className="purchase mt-[var(--s40)] flex items-center gap-[var(--s24)]">
        <ProductAddToCart />
        <div data-quantity-selector>
          <QuantitySelector />
        </div>
      </div>
    </div>
  );
}
