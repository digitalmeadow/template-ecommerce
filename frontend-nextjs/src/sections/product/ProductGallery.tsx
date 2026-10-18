import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import SanityMedia from "@/fields/SanityMedia";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductShopifySanity | null | undefined;
  className?: string;
}

export default function ProductGallery({ productData, className }: Props) {
  if (!productData) return null;

  return (
    <div className={cn("product-gallery", "grid w-full gap-[var(--gutter)]", className)}>
      <div className="media-item w-full">
        <SanityMedia mediaData={productData.sanity.mediaThumbnail} layout="width" />
      </div>

      {productData.sanity.mediaGallery?.map((mediaItem, mediaIndex) => (
        <div key={mediaIndex} className="media-item w-full">
          <SanityMedia mediaData={mediaItem} layout="width" />
        </div>
      ))}
    </div>
  );
}
