import { atom } from "nanostores";
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
import { getStoredLocale } from "@/lib/shopify/locale.client";
import { getCountryCode } from "@/lib/shopify/locale";
import {
  CART_ID_STORAGE_KEY_SUFFIX,
  CART_DATA_STORAGE_KEY_SUFFIX,
} from "@/lib/shopify/cart";
import { getCartStorageKey } from "@/lib/shopify/cart.client";

export type Cart = CartFragment | null;

function getCartIdStorageKey(): string {
  return getCartStorageKey(CART_ID_STORAGE_KEY_SUFFIX);
}

function getCartDataStorageKey(): string {
  return getCartStorageKey(CART_DATA_STORAGE_KEY_SUFFIX);
}

export const $cart = atom<Cart>(null);

export const $cartCount = computed($cart, (cart): number => {
  if (!cart?.lines?.edges) return 0;
  return cart.lines.edges.reduce((sum, edge) => {
    return sum + (edge.node.__typename === "CartLine" ? edge.node.quantity : 0);
  }, 0);
});

export const $cartTotal = computed(
  $cart,
  (cart): { amount: string; currencyCode: string } | null => {
    if (!cart?.cost?.totalAmount) return null;
    return {
      amount: cart.cost.totalAmount.amount,
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  },
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const $isCartEmpty = computed($cart, (_cart): boolean => {
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

function countryCode() {
  return getCountryCode(getStoredLocale());
}

function store(): typeof window.localStorage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getCartId(): string | null {
  const s = store();
  if (!s) return null;
  return s.getItem(getCartIdStorageKey());
}

export async function loadCart(): Promise<void> {
  const cartId = getCartId();
  if (!cartId) {
    $cart.set(null);
    return;
  }

  const s = store();
  if (!s) return;
  const cached = s.getItem(getCartDataStorageKey());
  if (cached) {
    try {
      $cart.set(JSON.parse(cached) as Cart);
    } catch {
      s.removeItem(getCartDataStorageKey());
    }
  }

  try {
    const { cart } = await shopifyClient.request(cartByIdQuery, {
      cartId,
      countryCode: countryCode(),
    });

    if (!cart) {
      s.removeItem(getCartIdStorageKey());
      s.removeItem(getCartDataStorageKey());
      $cart.set(null);
      return;
    }

    $cart.set(cart);
    s.setItem(getCartDataStorageKey(), JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
}

export async function createCart(
  variantId: string,
  quantity: number = 1,
): Promise<void> {
  try {
    const { cartCreate } = await shopifyClient.request(cartCreateMutation, {
      cartInput: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
      countryCode: countryCode(),
    });

    if (cartCreate?.cart) {
      const s = store();
      if (!s) return;
      const cartId = cartCreate.cart.id;
      s.setItem(getCartIdStorageKey(), cartId);
      $cart.set(cartCreate.cart);
      s.setItem(getCartDataStorageKey(), JSON.stringify(cartCreate.cart));
    }
  } catch (error) {
    console.error("Failed to create cart:", error);
  }
}

export async function addToCart(
  variantId: string,
  quantity: number = 1,
): Promise<void> {
  const cartId = getCartId();

  if (!cartId) {
    await createCart(variantId, quantity);
    return;
  }

  try {
    const { cartLinesAdd } = await shopifyClient.request(cartLinesAddMutation, {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
      countryCode: countryCode(),
    });

    if (cartLinesAdd?.cart) {
      $cart.set(cartLinesAdd.cart);
      const s = store();
      if (s) s.setItem(getCartDataStorageKey(), JSON.stringify(cartLinesAdd.cart));
    }
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
}

export async function updateLineQuantity(
  lineId: string,
  quantity: number,
): Promise<void> {
  const cartId = getCartId();
  if (!cartId) return;

  try {
    const { cartLinesUpdate } = await shopifyClient.request(
      cartLinesUpdateMutation,
      {
        cartId,
        lines: [{ id: lineId, quantity }],
        countryCode: countryCode(),
      },
    );

    if (cartLinesUpdate?.cart) {
      $cart.set(cartLinesUpdate.cart);
      const s = store();
      if (s) s.setItem(getCartDataStorageKey(), JSON.stringify(cartLinesUpdate.cart));
    }
  } catch (error) {
    console.error("Failed to update cart line:", error);
  }
}

export async function removeLine(lineId: string): Promise<void> {
  const cartId = getCartId();
  if (!cartId) return;

  try {
    const { cartLinesRemove } = await shopifyClient.request(
      cartLinesRemoveMutation,
      {
        cartId,
        lineIds: [lineId],
        countryCode: countryCode(),
      },
    );

    if (cartLinesRemove?.cart) {
      $cart.set(cartLinesRemove.cart);
      const s = store();
      if (s) s.setItem(getCartDataStorageKey(), JSON.stringify(cartLinesRemove.cart));
    }
  } catch (error) {
    console.error("Failed to remove cart line:", error);
  }
}
