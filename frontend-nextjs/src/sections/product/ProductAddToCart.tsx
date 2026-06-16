"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { addToCart } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function ProductAddToCart({ className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const productRoot = rootElement.closest(
      "[data-product-root]",
    ) as HTMLElement | null;
    if (!productRoot)
      throw new Error("ProductAddToCart: missing [data-product-root]");

    function getSelectedVariantId(): string {
      const variantIdInput = productRoot!.querySelector(
        "[data-variant-id]",
      ) as HTMLInputElement | null;
      if (!variantIdInput)
        throw new Error("ProductAddToCart: missing [data-variant-id] inside product root");
      return variantIdInput.value;
    }

    // Get initial availability
    const variantSelector = productRoot.querySelector(
      "[data-variant-selector]",
    ) as HTMLElement | null;
    if (variantSelector) {
      const variants = JSON.parse(variantSelector.dataset.variants!);
      const selectedId = getSelectedVariantId();
      const selectedVariant = variants.find(
        (v: { id: string; availableForSale: boolean }) => v.id === selectedId,
      );
      if (selectedVariant) {
        setAvailable(selectedVariant.availableForSale);
      }
    }

    function handleVariantChange(event: Event) {
      const { availableForSale } = (event as CustomEvent).detail;
      setAvailable(Boolean(availableForSale));
    }

    productRoot.addEventListener(
      "product:variant-change",
      handleVariantChange,
    );

    return () => {
      productRoot.removeEventListener(
        "product:variant-change",
        handleVariantChange,
      );
    };
  }, []);

  const handleAddToCart = useCallback(async () => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const productRoot = rootElement.closest(
      "[data-product-root]",
    ) as HTMLElement | null;
    if (!productRoot) return;

    const variantIdInput = productRoot.querySelector(
      "[data-variant-id]",
    ) as HTMLInputElement | null;
    if (!variantIdInput) return;

    const variantId = variantIdInput.value;
    if (!variantId) return;

    // Read quantity from the DOM
    const quantityContainer = productRoot.querySelector(
      "[data-quantity-selector]",
    );
    const qtyInput = quantityContainer
      ? (quantityContainer.querySelector(
          'input[type="number"]',
        ) as HTMLInputElement)
      : null;
    const quantity = qtyInput ? Number(qtyInput.value) || 1 : 1;

    setLoading(true);
    document.body.style.cursor = "wait";

    try {
      await addToCart(variantId, quantity);
      setCartOpen(true);
    } catch (error) {
      console.error("[ProductAddToCart] Error:", error);
    } finally {
      setLoading(false);
      document.body.style.cursor = "";
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("product-add-to-cart", className)}
      data-product-add-to-cart
    >
      <button
        type="button"
        className={cn(
          "text-link",
          !available && "opacity-50 cursor-not-allowed",
        )}
        data-add-to-cart-button
        data-available-for-sale={String(available)}
        data-loading={loading ? "true" : undefined}
        disabled={!available || loading}
        onClick={handleAddToCart}
      >
        {loading ? "Adding to cart" : available ? "Add to Cart" : "Sold Out"}
      </button>
    </div>
  );
}
