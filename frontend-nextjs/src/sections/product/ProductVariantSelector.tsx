import type { ProductFragment } from "shopify/generated/graphql";
import { shopifyIdFromGid } from "shopify/utils/ids";
import {
  findVariant,
  isSingleDefaultVariant,
  toSelection,
  type Variant,
} from "@/lib/shopify/variants";

interface Props {
  product: ProductFragment;
  variants: Variant[];
  selected: Variant | undefined;
  onOptionChange: (name: string, value: string) => void;
}

export default function ProductVariantSelector({
  product,
  variants,
  selected,
  onOptionChange,
}: Props) {
  const selection = selected ? toSelection(selected) : {};
  const shopifyId = shopifyIdFromGid(product.id);

  return (
    <div className="variant-selector flex flex-col gap-4">
      {!isSingleDefaultVariant(variants) &&
        product.options.map((option) => {
          const radioIdPrefix = `${shopifyId}-${option.name.toLowerCase()}`;
          return (
            <fieldset key={option.name}>
              <legend className="mb-2">{option.name}:</legend>
              <div className="flex flex-wrap gap-2">
                {option.optionValues.map((optionValue) => {
                  const id = `${radioIdPrefix}-${optionValue.name}`;
                  const isChecked = selection[option.name] === optionValue.name;
                  const candidate = findVariant(variants, {
                    ...selection,
                    [option.name]: optionValue.name,
                  });
                  const swatchImage = optionValue.swatch?.image?.previewImage?.url;
                  const swatchColor = optionValue.swatch?.color;
                  return (
                    <label
                      key={optionValue.name}
                      className="inline-flex cursor-pointer items-center gap-1 g-text-link-hover data-[exists=false]:text-text-subtle data-[available=false]:data-[exists=true]:line-through"
                      htmlFor={id}
                      data-active={isChecked ? "" : undefined}
                      data-exists={String(Boolean(candidate))}
                      data-available={String(Boolean(candidate?.availableForSale))}
                    >
                      <input
                        className="g-sr-only"
                        type="radio"
                        name={option.name}
                        id={id}
                        value={optionValue.name}
                        checked={isChecked}
                        onChange={() => onOptionChange(option.name, optionValue.name)}
                      />
                      {swatchImage ? (
                        // eslint-disable-next-line @next/next/no-img-element -- Shopify swatch, not Sanity media
                        <img
                          className="size-[1em] rounded-full object-cover"
                          src={swatchImage}
                          alt=""
                        />
                      ) : swatchColor ? (
                        <span
                          className="size-[1em] rounded-full"
                          style={{ backgroundColor: String(swatchColor) }}
                        />
                      ) : null}
                      {optionValue.name}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      <input type="hidden" name="merchandiseId" value={selected?.id ?? ""} />
    </div>
  );
}
