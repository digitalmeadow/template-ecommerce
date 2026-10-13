import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";
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

// Last mutation's failure, for the cart UI to announce; cleared by the next success.
export const $cartError = atom<string | null>(null);

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
        // Fixes checkout currency to the market; @inContext alone only prices the response.
        buyerIdentity: { countryCode: getCountryCode() },
      },
      countryCode: getCountryCode(),
    });

    if (cartCreate?.cart) localStorage.setItem(cartIdStorageKey, cartCreate.cart.id);
    applyCartPayload(cartCreate, variantId);
  } catch (error) {
    handleCartFailure("create cart", error);
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
    applyCartPayload(cartLinesAdd, variantId);
  } catch (error) {
    handleCartFailure("add to cart", error);
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
    applyCartPayload(cartLinesUpdate);
  } catch (error) {
    handleCartFailure("update cart line", error);
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
    applyCartPayload(cartLinesRemove);
  } catch (error) {
    handleCartFailure("remove cart line", error);
  }
}

function saveCart(cart: CartFragment) {
  $cart.set(cart);
  localStorage.setItem(cartDataStorageKey, JSON.stringify(cart));
}

// Mutations answer 200 even when Shopify rejects the change, reporting it in userErrors/warnings.
interface CartPayload {
  cart?: CartFragment | null;
  userErrors: { message: string }[];
  warnings: { message: string }[];
}

const GENERIC_ERROR = "Something went wrong updating your cart. Please try again.";
// Lines for merchandise not sold in the buyer's market are dropped without an error.
const UNAVAILABLE_ERROR = "This item isn't available in your region.";

function hasMerchandise(cart: CartFragment, variantId: string): boolean {
  return cart.lines.edges.some(
    (edge) => edge.node.__typename === "CartLine" && edge.node.merchandise.id === variantId,
  );
}

function applyCartPayload(payload: CartPayload | null | undefined, addedVariantId?: string) {
  const message = payload?.userErrors[0]?.message ?? payload?.warnings[0]?.message;
  const cart = payload?.cart;

  if (cart) saveCart(cart);

  if (message) $cartError.set(message);
  else if (!cart) $cartError.set(GENERIC_ERROR);
  else if (addedVariantId && !hasMerchandise(cart, addedVariantId)) $cartError.set(UNAVAILABLE_ERROR);
  else $cartError.set(null);
}

function handleCartFailure(context: string, error: unknown) {
  console.error(`Failed to ${context}:`, error);
  $cartError.set(GENERIC_ERROR);
}
