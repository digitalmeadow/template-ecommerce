import { persistentJSON } from "@nanostores/persistent";
import { atom, computed } from "nanostores";
import type { CartFragment, CartLineFragment, MoneyFragment } from "shopify/generated/graphql";
import type {
  CartAction,
  CartAttribute,
  CartMessage,
  CartRequestBody,
  CartResult,
} from "@lib/shopify/cartActions";
import { hasCartCookie } from "@lib/shopify/cartCookie";
import { getPageLocale } from "@lib/shopify/locale";
import { trackCartChange } from "@lib/analytics/track";

const CART_ENDPOINT = "/api/cart";
const GENERIC_MESSAGE = "Something went wrong updating your cart. Please try again.";

// The server owns the cart (id in the `cart` cookie). This snapshot only paints it instantly
// on load, before the refresh lands.
export const $cart = persistentJSON<CartFragment | null>("cart-snapshot", null);

// The last action's rejections and caveats, for the cart UI to announce; replaced by the next.
export const $cartMessages = atom<CartMessage[]>([]);

// What's waiting on the server: line ids, or "add" / "discount" / "gift-card" / "note" / "attributes".
export const $cartPending = atom<ReadonlySet<string>>(new Set());

export const $cartLines = computed($cart, (cart): CartLineFragment[] => cart?.lines.nodes ?? []);
export const $cartCount = computed($cart, (cart): number => cart?.totalQuantity ?? 0);
export const $cartSubtotal = computed($cart, (cart): MoneyFragment | null => {
  return cart?.cost.subtotalAmount ?? null;
});
export const $cartTotal = computed($cart, (cart): MoneyFragment | null => {
  return cart?.cost.totalAmount ?? null;
});

// One request at a time, so responses can't land out of order and undo a newer change.
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

function setPending(key: string, isPending: boolean) {
  const pending = new Set($cartPending.get());
  if (isPending) pending.add(key);
  else pending.delete(key);
  $cartPending.set(pending);
}

async function requestCart(init?: RequestInit, search = ""): Promise<CartResult> {
  const response = await fetch(`${CART_ENDPOINT}${search}`, init);
  if (!response.ok) throw new Error(`Cart endpoint responded ${response.status}`);
  return (await response.json()) as CartResult;
}

// The last cart the server returned; optimistic edits never touch it, so diffs see real changes.
let confirmedCart: CartFragment | null = $cart.get();

function applyResult({ cart, messages }: CartResult) {
  confirmedCart = cart;
  $cart.set(cart);
  $cartMessages.set(messages);
}

async function submit(action: CartAction, pendingKey: string): Promise<CartResult | null> {
  return enqueue(async () => {
    setPending(pendingKey, true);
    try {
      const body: CartRequestBody = { locale: getPageLocale().path, action };
      const result = await requestCart({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const previous = confirmedCart;
      applyResult(result);
      trackCartChange(previous, result.cart);
      return result;
    } catch (error) {
      console.error(`Cart ${action.intent} failed:`, error);
      $cartMessages.set([{ message: GENERIC_MESSAGE }]);
      return null;
    } finally {
      setPending(pendingKey, false);
    }
  });
}

/**
 * Paints the snapshot, then refreshes from the server. After a locale switch the snapshot is the
 * old market's for a moment; only its prices differ, and the drawer is closed on load.
 */
export async function loadCart(): Promise<void> {
  if (!hasCartCookie()) {
    if ($cart.get()) $cart.set(null);
    return;
  }

  await enqueue(async () => {
    try {
      const search = `?locale=${encodeURIComponent(getPageLocale().path)}`;
      applyResult(await requestCart(undefined, search));
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  });
}

export function addToCart(
  merchandiseId: string,
  quantity = 1,
  attributes?: CartAttribute[],
): Promise<CartResult | null> {
  return submit({ intent: "add", lines: [{ merchandiseId, quantity, attributes }] }, "add");
}

export async function updateLineQuantity(lineId: string, quantity: number): Promise<void> {
  const previous = $cart.get();
  $cart.set(withLineQuantity(previous, lineId, quantity));
  const result = await submit({ intent: "update", lines: [{ id: lineId, quantity }] }, lineId);
  if (!result) $cart.set(previous);
}

export async function removeLine(lineId: string): Promise<void> {
  const previous = $cart.get();
  $cart.set(withLineQuantity(previous, lineId, 0));
  const result = await submit({ intent: "remove", lineIds: [lineId] }, lineId);
  if (!result) $cart.set(previous);
}

export function applyDiscountCode(code: string) {
  return submit({ intent: "discount-apply", code }, "discount");
}

export function removeDiscountCode(code: string) {
  return submit({ intent: "discount-remove", code }, "discount");
}

export function applyGiftCard(code: string) {
  return submit({ intent: "gift-card-apply", code }, "gift-card");
}

export function removeGiftCard(id: string) {
  return submit({ intent: "gift-card-remove", id }, "gift-card");
}

export function updateNote(note: string) {
  return submit({ intent: "note", note }, "note");
}

export function updateAttributes(attributes: CartAttribute[]) {
  return submit({ intent: "attributes", attributes }, "attributes");
}

// Optimistic: quantities move immediately; costs wait for the server.
function withLineQuantity(
  cart: CartFragment | null,
  lineId: string,
  quantity: number,
): CartFragment | null {
  if (!cart) return cart;
  const line = cart.lines.nodes.find((node) => node.id === lineId);
  if (!line) return cart;

  const nodes =
    quantity > 0
      ? cart.lines.nodes.map((node) => (node.id === lineId ? { ...node, quantity } : node))
      : cart.lines.nodes.filter((node) => node.id !== lineId);
  return {
    ...cart,
    totalQuantity: cart.totalQuantity - line.quantity + quantity,
    lines: { ...cart.lines, nodes },
  };
}
