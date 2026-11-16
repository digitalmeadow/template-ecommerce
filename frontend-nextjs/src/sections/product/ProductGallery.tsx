import SanityMedia from "@/fields/SanityMedia";
import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";

interface Props {
  product: ProductShopifySanity;
}

export default function ProductGallery({ product }: Props) {
  return (
    <div className="product-gallery grid w-full gap-[var(--gutter)]">
      <div className="w-full">
        <SanityMedia media={product.sanity.mediaThumbnail} layout="width" />
      </div>

      {product.sanity.mediaGallery?.map((media, index) => (
        <div key={index} className="w-full">
          <SanityMedia media={media} layout="width" />
        </div>
      ))}
    </div>
  );
}
