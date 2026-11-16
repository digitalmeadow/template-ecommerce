interface Props {
  isAvailable: boolean;
  isAdding: boolean;
}

// The submit button of ProductPurchase's form, so add to cart works without JS.
export default function ProductAddToCart({ isAvailable, isAdding }: Props) {
  return (
    <div className="product-add-to-cart">
      <button
        type="submit"
        name="intent"
        value="add"
        className="g-text-link"
        disabled={!isAvailable || isAdding}
      >
        {isAdding ? "Adding to cart" : isAvailable ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
}
