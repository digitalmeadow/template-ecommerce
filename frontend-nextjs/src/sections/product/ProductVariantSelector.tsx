"use client";

import { useRef, useEffect } from "react";
import { shopifyIdFromGid } from "shopify/utils/ids";
import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import type { EventProductVariantChangeDetail } from "@/lib/events";
import { DEFAULT_VARIANT_TITLE, type Variant } from "@/lib/shopify/variants";
import { cn } from "@/lib/utils";

interface Props {
  productData: ProductShopifySanity | null | undefined;
  className?: string;
}

export default function ProductVariantSelector({ productData, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const productRoot = rootElement.closest("[data-product-root]") as HTMLElement | null;
    if (!productRoot) throw new Error("ProductVariantSelector: missing [data-product-root]");

    const optionInputs = Array.from(
      rootElement.querySelectorAll("[data-option-input]"),
    ) as HTMLInputElement[];
    const variantIdInput = rootElement.querySelector("[data-variant-id]") as HTMLInputElement;

    const variantsData: Variant[] = JSON.parse(rootElement.dataset.variants!);

    function getSelectedOptions() {
      const checkedInputs = optionInputs.filter((input) => input.checked);
      return checkedInputs.map((input) => ({
        name: input.dataset.optionName!,
        value: input.value,
      }));
    }

    function findMatchingVariant(): Variant | null {
      const selectedOptions = getSelectedOptions();
      const uniqueOptionNames = new Set(optionInputs.map((input) => input.dataset.optionName));
      if (selectedOptions.length < uniqueOptionNames.size) return null;

      return (
        variantsData.find((variant) =>
          selectedOptions.every((selected) =>
            variant.selectedOptions.some(
              (variantOption) =>
                variantOption.name === selected.name && variantOption.value === selected.value,
            ),
          ),
        ) ?? null
      );
    }

    function updateVariantId() {
      const variant = findMatchingVariant();
      if (!variant) return;

      variantIdInput.value = variant.id;

      const detail: EventProductVariantChangeDetail = {
        variantId: variant.id,
        availableForSale: variant.availableForSale,
      };
      productRoot!.dispatchEvent(
        new CustomEvent("product:variant-change", { bubbles: true, detail }),
      );
    }

    function syncActiveLabels() {
      optionInputs.forEach((input) => {
        input.closest("label")?.toggleAttribute("data-active", input.checked);
      });
    }

    const handleChange = () => {
      syncActiveLabels();
      updateVariantId();
    };

    optionInputs.forEach((input) => {
      input.addEventListener("change", handleChange);
    });

    productRoot.addEventListener("product:request-variant-update", updateVariantId);

    syncActiveLabels();
    updateVariantId();

    return () => {
      optionInputs.forEach((input) => {
        input.removeEventListener("change", handleChange);
      });
      productRoot.removeEventListener("product:request-variant-update", updateVariantId);
    };
  }, []);

  if (!productData) return null;

  const options = productData.shopify.options || [];
  const variants = productData.shopify.variants.edges;
  const isSingleDefaultVariant =
    variants.length === 1 && variants[0].node.title === DEFAULT_VARIANT_TITLE;

  const variantsForMatching: Variant[] = variants.map((edge) => ({
    id: edge.node.id,
    selectedOptions: edge.node.selectedOptions,
    availableForSale: edge.node.availableForSale,
  }));

  const shopifyId = shopifyIdFromGid(productData.shopify.id);

  return (
    <div
      ref={rootRef}
      className={cn("variant-selector", "flex flex-col gap-[var(--s16)]", className)}
      data-variant-selector
      data-variants={JSON.stringify(variantsForMatching)}
    >
      {!isSingleDefaultVariant &&
        options.map((option) => {
          const radioIdPrefix = `${shopifyId}-${option.name.toLowerCase()}`;
          return (
            <fieldset key={option.name} className="option-fieldset m-0 border-none p-0">
              <legend>{option.name}:</legend>
              <div className="option-values flex flex-wrap gap-[var(--s8)]">
                {option.values.map((value, valueIndex) => (
                  <label
                    key={value}
                    className="text-link cursor-pointer"
                    htmlFor={`${radioIdPrefix}-${value}`}
                    data-active={valueIndex === 0 ? "" : undefined}
                  >
                    <input
                      className="visually-hidden"
                      type="radio"
                      name={option.name}
                      id={`${radioIdPrefix}-${value}`}
                      data-option-input
                      data-option-name={option.name}
                      value={value}
                      defaultChecked={valueIndex === 0}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      <input type="hidden" data-variant-id />
    </div>
  );
}
