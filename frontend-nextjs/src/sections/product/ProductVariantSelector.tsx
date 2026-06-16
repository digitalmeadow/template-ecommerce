"use client";

import { useRef, useEffect } from "react";
import type { ProductShopifySanity } from "@/lib/fetches/productShopifySanity";
import { shopifyIdFromGid } from "shopify/utils/ids";
import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  availableForSale: boolean;
}

interface Props {
  productData: ProductShopifySanity;
  className?: string;
}

export default function ProductVariantSelector({
  productData,
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const options = productData.shopify.options || [];
  const variants = productData.shopify.variants.edges;
  const isSingleDefaultVariant =
    variants.length === 1 && variants[0].node.title === "Default Title";

  const variantsForMatching: Variant[] = variants.map((edge) => ({
    id: edge.node.id,
    selectedOptions: edge.node.selectedOptions,
    availableForSale: edge.node.availableForSale,
  }));

  const shopifyId = shopifyIdFromGid(productData.shopify.id);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const productRoot = rootElement.closest(
      "[data-product-root]",
    ) as HTMLElement | null;
    if (!productRoot)
      throw new Error("ProductVariantSelector: missing [data-product-root]");

    const optionInputs = Array.from(
      rootElement.querySelectorAll("[data-option-input]"),
    ) as HTMLInputElement[];
    const variantIdInput = rootElement.querySelector(
      "[data-variant-id]",
    ) as HTMLInputElement;

    const variantsData: Variant[] = JSON.parse(
      rootElement.dataset.variants!,
    );

    function getSelectedOptions() {
      const checkedInputs = optionInputs.filter((input) => input.checked);
      return checkedInputs.map((input) => ({
        name: input.dataset.optionName!,
        value: input.value,
      }));
    }

    function findMatchingVariant(): Variant | null {
      const selectedOptions = getSelectedOptions();
      const uniqueOptionNames = new Set(
        optionInputs.map((i) => i.dataset.optionName),
      );
      if (selectedOptions.length < uniqueOptionNames.size) return null;

      return (
        variantsData.find((v) =>
          selectedOptions.every((selected) =>
            v.selectedOptions.some(
              (vo) => vo.name === selected.name && vo.value === selected.value,
            ),
          ),
        ) ?? null
      );
    }

    function updateVariantId() {
      const variant = findMatchingVariant();
      if (!variant) return;

      variantIdInput.value = variant.id;

      productRoot!.dispatchEvent(
        new CustomEvent("product:variant-change", {
          bubbles: true,
          detail: {
            variantId: variant.id,
            availableForSale: variant.availableForSale,
          },
        }),
      );
    }

    function updateUI() {
      optionInputs.forEach((input) => {
        const label = input.closest("label");
        if (label) {
          if (input.checked) {
            label.setAttribute("data-active", "");
          } else {
            label.removeAttribute("data-active");
          }
        }
      });
    }

    const handleChange = () => {
      updateUI();
      updateVariantId();
    };

    optionInputs.forEach((input) => {
      input.addEventListener("change", handleChange);
    });

    productRoot.addEventListener(
      "product:request-variant-update",
      updateVariantId,
    );

    // Initial sync
    updateUI();
    updateVariantId();

    return () => {
      optionInputs.forEach((input) => {
        input.removeEventListener("change", handleChange);
      });
      productRoot.removeEventListener(
        "product:request-variant-update",
        updateVariantId,
      );
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("variant-selector", "flex flex-col gap-[var(--s16)]", className)}
      data-variant-selector
      data-variants={JSON.stringify(variantsForMatching)}
    >
      {!isSingleDefaultVariant &&
        options.map((option) => {
          const selectId = `${shopifyId}-${option.name.toLowerCase()}`;
          return (
            <fieldset
              key={option.name}
              className="option-fieldset border-none p-0 m-0"
            >
              <legend>{option.name}:</legend>
              <div className="option-values flex flex-wrap gap-[var(--s8)]">
                {option.values.map((value, idx) => (
                  <label
                    key={value}
                    className="text-link cursor-pointer"
                    htmlFor={`${selectId}-${value}`}
                    data-active={idx === 0 ? "" : undefined}
                  >
                    <input
                      className="sr-only"
                      type="radio"
                      name={option.name}
                      id={`${selectId}-${value}`}
                      data-option-input
                      data-option-name={option.name}
                      value={value}
                      defaultChecked={idx === 0}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        })}
      <input
        type="hidden"
        data-variant-id
        data-product-id={productData.shopify.id}
      />
    </div>
  );
}
