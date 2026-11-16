import ProductThumbnail from "@/sections/product/ProductThumbnail";
import { products } from "../fixtures/content";

const [standard, , onSale, , , priceRange] = products;
const variants = [standard, onSale, priceRange].filter((product) => product !== undefined);

// Thumbnails fill their grid cell, so each price variant is shown in a column as on listings.
export default function DemoProductThumbnails() {
  return (
    <div className="g-grid-cols-3">
      {variants.map((product) => (
        <ProductThumbnail key={product.shopify.id} product={product} />
      ))}
    </div>
  );
}
