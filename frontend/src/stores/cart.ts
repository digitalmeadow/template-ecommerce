import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";
import type { CartFragment, CartLineFragment } from "shopify/generated/graphql";
import { shopifyClient } from "shopify/client";
import { cartByIdQuery } from "shopify/queries/cart";
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesUpdateMutation,
  cartLinesRemoveMutation,
} from "shopify/mutations/cart";
import { getCountryCode } from "@lib/shopify/locale";
import {
  CART_ID_STORAGE_KEY_SUFFIX,
  CART_DATA_STORAGE_KEY_SUFFIX,
  getStorageKey,
} from "@lib/shopify/cart";

export type Cart = CartFragment | null;

const cartIdStorageKey = getStorageKey(CART_ID_STORAGE_KEY_SUFFIX);
const cartDataStorageKey = getStorageKey(CART_DATA_STORAGE_KEY_SUFFIX);

export const $cart = persistentAtom<Cart>(
  "cart",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const $cartCount = computed($cart, (cart): number => {
  if (!cart?.lines?.edges) return 0;
  return cart.lines.edges.reduce((sum, edge) => {
    return sum + (edge.node.__typename === "CartLine" ? edge.node.quantity : 0);
  }, 0);
});

export const $cartTotal = computed($cart, (cart): { amount: string; currencyCode: string } | null => {
  if (!cart?.cost?.totalAmount) return null;
  return {
    amount: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
  };
});

export const $isCartEmpty = computed($cart, (cart): boolean => {
  return !$cartCount.get() || $cartCount.get() === 0;
});

export const $checkoutUrl = computed($cart, (cart): string | null => {
  if (!cart?.checkoutUrl || $cartCount.get() === 0) return null;
  return cart.checkoutUrl;
});

export const $cartLines = computed($cart, (cart): CartLineFragment[] => {
  if (!cart?.lines?.edges) return [];
  return cart.lines.edges
    .filter((edge) => edge.node.__typename === "CartLine")
    .map((edge) => edge.node as CartLineFragment);
});

export function getCartId(): string | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(cartIdStorageKey);
}

export async function loadCart(): Promise<void> {
  const cartId = getCartId();
  if (!cartId) {
    $cart.set(null);
    return;
  }

  const cached = localStorage.getItem(cartDataStorageKey);
  if (cached) {
    try {
      $cart.set(JSON.parse(cached) as Cart);
    } catch {
      localStorage.removeItem(cartDataStorageKey);
    }
  }

  try {
    const { cart } = await shopifyClient.request(cartByIdQuery, {
      cartId,
      countryCode: getCountryCode(),
    });

    if (!cart) {
      localStorage.removeItem(cartIdStorageKey);
      localStorage.removeItem(cartDataStorageKey);
      $cart.set(null);
      return;
    }

    $cart.set(cart);
    localStorage.setItem(cartDataStorageKey, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
}

export async function createCart(variantId: string, quantity: number = 1): Promise<void> {
  try {
    const { cartCreate } = await shopifyClient.request(cartCreateMutation, {
      cartInput: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
      countryCode: getCountryCode(),
    });

    if (cartCreate?.cart) {
      const cartId = cartCreate.cart.id;
      localStorage.setItem(cartIdStorageKey, cartId);
      $cart.set(cartCreate.cart);
      localStorage.setItem(cartDataStorageKey, JSON.stringify(cartCreate.cart));
    }
  } catch (error) {
    console.error("Failed to create cart:", error);
  }
}

export async function addToCart(variantId: string, quantity: number = 1): Promise<void> {
  const cartId = getCartId();

  if (!cartId) {
    await createCart(variantId, quantity);
    return;
  }

  try {
    const { cartLinesAdd } = await shopifyClient.request(cartLinesAddMutation, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
      countryCode: getCountryCode(),
    });

    if (cartLinesAdd?.cart) {
      $cart.set(cartLinesAdd.cart);
      localStorage.setItem(cartDataStorageKey, JSON.stringify(cartLinesAdd.cart));
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
}

export async function updateLineQuantity(lineId: string, quantity: number): Promise<void> {
  const cartId = getCartId();
  if (!cartId) return;

  try {
    const { cartLinesUpdate } = await shopifyClient.request(cartLinesUpdateMutation, {
      cartId,
      lines: [{ id: lineId, quantity }],
      countryCode: getCountryCode(),
    });

    if (cartLinesUpdate?.cart) {
      $cart.set(cartLinesUpdate.cart);
      localStorage.setItem(cartDataStorageKey, JSON.stringify(cartLinesUpdate.cart));
    }
  } catch (error) {
    console.error("Failed to update cart line:", error);
  }
}

export async function removeLine(lineId: string): Promise<void> {
  const cartId = getCartId();
  if (!cartId) return;

  try {
    const { cartLinesRemove } = await shopifyClient.request(cartLinesRemoveMutation, {
      cartId,
      lineIds: [lineId],
      countryCode: getCountryCode(),
    });

    if (cartLinesRemove?.cart) {
      $cart.set(cartLinesRemove.cart);
      localStorage.setItem(cartDataStorageKey, JSON.stringify(cartLinesRemove.cart));
    }
  } catch (error) {
    console.error("Failed to remove cart line:", error);
  }
}
