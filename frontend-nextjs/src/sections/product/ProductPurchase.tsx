"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { ProductFragment } from "shopify/generated/graphql";
import QuantitySelector from "@/blocks/QuantitySelector";
import FontSizeFillWidth from "@/layouts/FontSizeFillWidth";
import { useLocale } from "@/lib/shopify/useLocale";
import {
  findVariant,
  getInitialVariant,
  isSingleDefaultVariant,
  resolveVariant,
  toSelection,
  type Variant,
} from "@/lib/shopify/variants";
import { useBrowserValue } from "@/lib/useBrowserValue";
import ProductAddToCart from "@/sections/product/ProductAddToCart";
import ProductAnalytics from "@/sections/product/ProductAnalytics";
import ProductLive, { type ProductLiveData } from "@/sections/product/ProductLive";
import ProductPrice from "@/sections/product/ProductPrice";
import ProductVariantSelector from "@/sections/product/ProductVariantSelector";
import { addToCart } from "@/stores/cart";
import { setCartOpen } from "@/stores/ui";

interface Props {
  product: ProductFragment;
}

function toVariant(variant: ProductFragment["variants"]["nodes"][number]): Variant {
  return {
    id: variant.id,
    title: variant.title,
    selectedOptions: variant.selectedOptions,
    availableForSale: variant.availableForSale,
    quantityAvailable: variant.quantityAvailable,
    price: variant.price,
    compareAtPrice: variant.compareAtPrice,
  };
}

// `?Color=Red&Size=M`, or Liquid's `?variant=<id>` from Shopify emails and old links.
function readUrlVariant(variants: Variant[], current: Variant): Variant | undefined {
  const params = new URLSearchParams(window.location.search);
  const variantId = params.get("variant");
  if (variantId) return variants.find((variant) => variant.id.endsWith(`/${variantId}`));

  const optionNames = current.selectedOptions.map(({ name }) => name);
  const urlSelection = Object.fromEntries(
    optionNames.flatMap((name) => (params.has(name) ? [[name, params.get(name)!]] : [])),
  );
  if (!Object.keys(urlSelection).length) return undefined;
  return findVariant(variants, { ...toSelection(current), ...urlSelection });
}

function writeUrl(variant: Variant, hasOptions: boolean) {
  if (!hasOptions) return;
  const url = new URL(window.location.href);
  url.searchParams.delete("variant");
  for (const [name, value] of Object.entries(toSelection(variant))) {
    url.searchParams.set(name, value);
  }
  history.replaceState(history.state, "", url);
}

export default function ProductPurchase({ product }: Props) {
  const locale = useLocale();
  const [variants, setVariants] = useState(() => product.variants.nodes.map(toVariant));
  const hasOptions = !isSingleDefaultVariant(variants);
  // Static HTML opens on the first available variant; the URL's selection takes over once hydrated.
  const initialId = getInitialVariant(variants)?.id;
  const urlVariantId = useBrowserValue(() => {
    const initial = getInitialVariant(variants);
    return (initial && readUrlVariant(variants, initial)?.id) ?? null;
  }, null);
  const isHydrated = useBrowserValue(() => true, false);
  const [chosenId, setChosenId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const selectedId = chosenId ?? urlVariantId ?? initialId;
  const selected = variants.find((variant) => variant.id === selectedId);

  // Liquid's `?variant=<id>` becomes this page's option parameters.
  useEffect(() => {
    if (!urlVariantId || !new URLSearchParams(window.location.search).has("variant")) return;
    const variant = variants.find(({ id }) => id === urlVariantId);
    if (variant) writeUrl(variant, hasOptions);
  }, [urlVariantId, variants, hasOptions]);

  const handleLiveData = useCallback((data: ProductLiveData) => {
    const live = new Map(data.variants.map((variant) => [variant.id, variant]));
    setVariants((current) => current.map((variant) => ({ ...variant, ...live.get(variant.id) })));
  }, []);

  function handleOptionChange(name: string, value: string) {
    if (!selected) return;
    const variant = resolveVariant(variants, toSelection(selected), name, value);
    if (!variant) return;
    setChosenId(variant.id);
    writeUrl(variant, hasOptions);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const quantity = Number(formData.get("quantity") ?? 1);
    if (!selected || !Number.isFinite(quantity) || quantity < 1) return;

    setIsAdding(true);
    try {
      await addToCart(selected.id, quantity);
      setCartOpen(true);
    } finally {
      setIsAdding(false);
    }
  }

  // Null when inventory isn't tracked or the token can't read it.
  const quantityAvailable = selected?.quantityAvailable;

  return (
    <div className="product-purchase flex flex-col items-start">
      <ProductLive handle={product.handle} locale={locale} onLiveData={handleLiveData} />
      <ProductAnalytics
        product={{
          id: product.id,
          title: product.title,
          vendor: product.vendor,
          productType: product.productType,
        }}
        variant={selected}
        isReady={isHydrated}
      />

      <FontSizeFillWidth className="mb-5">
        <h1 className="uppercase">{product.title}</h1>
      </FontSizeFillWidth>
      <ProductPrice
        priceRange={product.priceRange}
        compareAtPriceRange={product.compareAtPriceRange}
        variant={selected}
      />

      <form className="contents" method="post" action="/api/cart" onSubmit={handleSubmit}>
        <input type="hidden" name="locale" value={locale.path} />

        <div className="mt-10">
          <ProductVariantSelector
            product={product}
            variants={variants}
            selected={selected}
            onOptionChange={handleOptionChange}
          />
        </div>

        <div className="mt-10 flex items-center gap-6">
          <ProductAddToCart isAvailable={Boolean(selected?.availableForSale)} isAdding={isAdding} />
          <QuantitySelector
            name="quantity"
            max={quantityAvailable != null && quantityAvailable > 0 ? quantityAvailable : undefined}
          />
        </div>
      </form>
    </div>
  );
}
