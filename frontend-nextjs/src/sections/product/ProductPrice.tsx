import type { MoneyFragment, PriceRangeFragment } from "shopify/generated/graphql";
import PriceDisplay from "@/blocks/PriceDisplay";

interface Props {
  priceRange: PriceRangeFragment;
  compareAtPriceRange: PriceRangeFragment;
  // Product pages: the selected variant, whose price replaces the range.
  variant?: { price: MoneyFragment; compareAtPrice?: MoneyFragment | null } | undefined;
}

export default function ProductPrice({ priceRange, compareAtPriceRange, variant }: Props) {
  const price = variant?.price ?? priceRange.minVariantPrice;
  const compareAt = variant ? variant.compareAtPrice : compareAtPriceRange.minVariantPrice;
  const isRange =
    !variant &&
    Number(priceRange.maxVariantPrice.amount) > Number(priceRange.minVariantPrice.amount);
  const isDiscounted = !!compareAt && Number(compareAt.amount) > Number(price.amount);

  return (
    <div className="product-price">
      {isDiscounted && (
        <PriceDisplay
          kind="compare-at"
          amount={compareAt.amount}
          currency={compareAt.currencyCode}
        />
      )}
      <PriceDisplay
        amount={price.amount}
        currency={price.currencyCode}
        prefix={isRange ? "from" : undefined}
      />
    </div>
  );
}
