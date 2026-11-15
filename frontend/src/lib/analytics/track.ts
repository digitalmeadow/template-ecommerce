import type { CartFragment, CartLineFragment } from "shopify/generated/graphql";
import { publishShopifyEvent } from "@lib/analytics/shopifyAnalytics";
import { pushEcommerceEvent, type EcommerceItem } from "@lib/analytics/dataLayer";
import type { Variant } from "@lib/shopify/variants";

// One call per storefront moment, sent to Shopify analytics and to GA4 via the dataLayer.
// Both sides already respect consent, so callers don't check it.

export interface AnalyticsProduct {
  id: string;
  title: string;
  vendor: string;
  productType?: string;
}

export interface AnalyticsListItem {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
}

export function trackPageView() {
  publishShopifyEvent("page_viewed");
}

export function trackProductView(product: AnalyticsProduct, variant: Variant) {
  publishShopifyEvent("product_viewed", {
    products: [
      {
        ...product,
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
      },
    ],
  });
  pushEcommerceEvent("view_item", {
    currency: variant.price.currencyCode,
    value: Number(variant.price.amount),
    items: [
      {
        item_id: variant.id,
        item_name: product.title,
        item_brand: product.vendor,
        item_variant: variant.title,
        price: Number(variant.price.amount),
        quantity: 1,
      },
    ],
  });
}

export function trackCollectionView(
  collection: { id: string; handle: string },
  items: AnalyticsListItem[],
) {
  publishShopifyEvent("collection_viewed", { collection });
  pushEcommerceEvent("view_item_list", { items: items.map(toListItem) });
}

export function trackSearch(searchTerm: string, items: AnalyticsListItem[]) {
  publishShopifyEvent("search_viewed", { searchTerm });
  pushEcommerceEvent("search", { search_term: searchTerm, items: items.map(toListItem) });
}

export function trackCartView(cart: CartFragment | null) {
  if (!cart) return;
  publishShopifyEvent("cart_viewed", { cart });
  pushEcommerceEvent("view_cart", cartEcommerce(cart));
}

export function trackBeginCheckout(cart: CartFragment | null) {
  if (cart) pushEcommerceEvent("begin_checkout", cartEcommerce(cart));
}

/** Adds and removals between two versions of the cart, line by line. */
export function trackCartChange(previous: CartFragment | null, current: CartFragment | null) {
  if (!current) return;
  const previousLines = new Map(previous?.lines.nodes.map((line) => [line.id, line]));
  const currentLines = new Map(current.lines.nodes.map((line) => [line.id, line]));

  for (const [id, line] of currentLines) {
    const prevLine = previousLines.get(id);
    const change = line.quantity - (prevLine?.quantity ?? 0);
    if (change > 0) trackLineChange("add", current, previous, line, prevLine, change);
    if (change < 0) trackLineChange("remove", current, previous, line, prevLine, -change);
  }
  for (const [id, prevLine] of previousLines) {
    if (!currentLines.has(id)) {
      trackLineChange("remove", current, previous, undefined, prevLine, prevLine.quantity);
    }
  }
}

function trackLineChange(
  direction: "add" | "remove",
  cart: CartFragment,
  prevCart: CartFragment | null,
  currentLine: CartLineFragment | undefined,
  prevLine: CartLineFragment | undefined,
  quantity: number,
) {
  const line = (currentLine ?? prevLine)!;
  publishShopifyEvent(direction === "add" ? "product_added_to_cart" : "product_removed_from_cart", {
    cart,
    prevCart,
    currentLine,
    prevLine,
  });
  pushEcommerceEvent(direction === "add" ? "add_to_cart" : "remove_from_cart", {
    currency: line.cost.amountPerQuantity.currencyCode,
    value: Number(line.cost.amountPerQuantity.amount) * quantity,
    items: [{ ...toCartItem(line), quantity }],
  });
}

function cartEcommerce(cart: CartFragment) {
  return {
    currency: cart.cost.totalAmount.currencyCode,
    value: Number(cart.cost.totalAmount.amount),
    items: cart.lines.nodes.map(toCartItem),
  };
}

function toCartItem(line: CartLineFragment): EcommerceItem {
  return {
    item_id: line.merchandise.id,
    item_name: line.merchandise.product.title,
    item_brand: line.merchandise.product.vendor,
    item_variant: line.merchandise.title,
    price: Number(line.cost.amountPerQuantity.amount),
    quantity: line.quantity,
  };
}

function toListItem(item: AnalyticsListItem): EcommerceItem {
  return { item_id: item.id, item_name: item.title, price: Number(item.price) };
}
