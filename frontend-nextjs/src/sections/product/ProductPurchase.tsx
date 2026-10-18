import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import ProductVariantSelector from "@/sections/product/ProductVariantSelector";
import ProductPrice from "@/sections/product/ProductPrice";
import ProductAddToCart from "@/sections/product/ProductAddToCart";
import QuantitySelector from "@/blocks/QuantitySelector";
import FontSizeFillWidth from "@/layouts/FontSizeFillWidth";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductShopifySanity | null | undefined;
  className?: string;
}

export default function ProductPurchase({ productData, className }: Props) {
  if (!productData) return null;

  return (
    <div className={cn("product-purchase", "flex flex-col items-start", className)}>
      <FontSizeFillWidth className="mb-[var(--s20)]">
        <h1 className="uppercase">{productData.shopify?.title}</h1>
      </FontSizeFillWidth>
      <ProductPrice />

      <div className="variants mt-[var(--s40)]">
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
