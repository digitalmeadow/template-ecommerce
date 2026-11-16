import type { ShopifyClient } from "shopify/client";
import type { CartFragment } from "shopify/generated/graphql";
import {
  cartAttributesUpdateMutation,
  cartBuyerIdentityUpdateMutation,
  cartCreateMutation,
  cartDiscountCodesUpdateMutation,
  cartGiftCardCodesAddMutation,
  cartGiftCardCodesRemoveMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
  cartNoteUpdateMutation,
} from "shopify/mutations/cart";
import { cartByIdQuery } from "shopify/queries/cart";
import type { CartAction, CartMessage, CartResult } from "@lib/shopify/cartActions";
import type { Locale } from "@lib/shopify/locale";

interface CartPayload {
  cart?: CartFragment | null;
  userErrors: { code?: string | null; field?: string[] | null; message: string }[];
  warnings: { code: string; message: string; target: string }[];
}

const UNAVAILABLE_MESSAGE = "This item isn't available in your region.";
const GIFT_CARD_REJECTED_MESSAGE = "That gift card couldn't be applied.";
const EMPTY_RESULT: CartResult = { cart: null, messages: [] };

/**
 * Runs one cart action for the cart in the `cart` cookie (`cartId`, null when there's none).
 * A dead cart (expired, or completed at checkout) is replaced on add and dropped otherwise, and
 * a cart from another market is moved to this locale's, so the result always matches the page.
 */
export async function performCartAction(
  shopify: ShopifyClient,
  locale: Locale,
  cartId: string | null,
  action: CartAction | undefined,
): Promise<CartResult> {
  const context = { country: locale.country, language: locale.language };

  if (!action) {
    if (!cartId) return EMPTY_RESULT;
    const { cart } = await shopify.request(cartByIdQuery, { cartId, ...context });
    return syncMarket(shopify, locale, { cart: cart ?? null, messages: [] });
  }

  if (!cartId) return createOrEmpty(shopify, locale, action);

  const payload = await mutateCart(shopify, locale, cartId, action);
  if (isDeadCart(payload)) return createOrEmpty(shopify, locale, action);

  return syncMarket(shopify, locale, toResult(payload, action));
}

// With no live cart, only an add has anything to act on.
function createOrEmpty(
  shopify: ShopifyClient,
  locale: Locale,
  action: CartAction,
): Promise<CartResult> | CartResult {
  return action.intent === "add" ? createCart(shopify, locale, action) : EMPTY_RESULT;
}

async function createCart(
  shopify: ShopifyClient,
  locale: Locale,
  action: Extract<CartAction, { intent: "add" }>,
): Promise<CartResult> {
  const { cartCreate } = await shopify.request(cartCreateMutation, {
    input: { lines: action.lines, buyerIdentity: { countryCode: locale.country } },
    country: locale.country,
    language: locale.language,
  });
  return toResult(cartCreate, action);
}

async function mutateCart(
  shopify: ShopifyClient,
  locale: Locale,
  cartId: string,
  action: CartAction,
): Promise<CartPayload | null | undefined> {
  const context = { cartId, country: locale.country, language: locale.language };

  switch (action.intent) {
    case "add":
      return (await shopify.request(cartLinesAddMutation, { ...context, lines: action.lines }))
        .cartLinesAdd;
    case "update":
      return (await shopify.request(cartLinesUpdateMutation, { ...context, lines: action.lines }))
        .cartLinesUpdate;
    case "remove":
      return (
        await shopify.request(cartLinesRemoveMutation, { ...context, lineIds: action.lineIds })
      ).cartLinesRemove;
    case "discount-apply":
    case "discount-remove": {
      // The API only replaces the whole list.
      const { cart } = await shopify.request(cartByIdQuery, context);
      if (!cart) return { cart: null, userErrors: [], warnings: [] };
      const code = action.code.toLowerCase();
      const otherCodes = cart.discountCodes
        .map((discountCode) => discountCode.code)
        .filter((existing) => existing.toLowerCase() !== code);
      if (action.intent === "discount-remove") {
        return (
          await shopify.request(cartDiscountCodesUpdateMutation, {
            ...context,
            discountCodes: otherCodes,
          })
        ).cartDiscountCodesUpdate;
      }

      const applied = (
        await shopify.request(cartDiscountCodesUpdateMutation, {
          ...context,
          discountCodes: [...otherCodes, action.code],
        })
      ).cartDiscountCodesUpdate;
      // Shopify keeps a code that doesn't exist on the cart (inapplicable) and repeats the warning
      // on every later change; take it straight back off so the buyer just sees the message.
      if (!applied?.warnings.some((warning) => warning.code === "DISCOUNT_NOT_FOUND"))
        return applied;
      const reverted = (
        await shopify.request(cartDiscountCodesUpdateMutation, {
          ...context,
          discountCodes: otherCodes,
        })
      ).cartDiscountCodesUpdate;
      return reverted && { ...reverted, warnings: applied.warnings };
    }
    case "gift-card-apply":
      return (
        await shopify.request(cartGiftCardCodesAddMutation, {
          ...context,
          giftCardCodes: [action.code],
        })
      ).cartGiftCardCodesAdd;
    case "gift-card-remove":
      return (
        await shopify.request(cartGiftCardCodesRemoveMutation, {
          ...context,
          appliedGiftCardIds: [action.id],
        })
      ).cartGiftCardCodesRemove;
    case "note":
      return (await shopify.request(cartNoteUpdateMutation, { ...context, note: action.note }))
        .cartNoteUpdate;
    case "attributes":
      return (
        await shopify.request(cartAttributesUpdateMutation, {
          ...context,
          attributes: action.attributes,
        })
      ).cartAttributesUpdate;
  }
}

async function syncMarket(
  shopify: ShopifyClient,
  locale: Locale,
  result: CartResult,
): Promise<CartResult> {
  const { cart } = result;
  if (!cart || cart.buyerIdentity.countryCode === locale.country) return result;

  const { cartBuyerIdentityUpdate } = await shopify.request(cartBuyerIdentityUpdateMutation, {
    cartId: cart.id,
    buyerIdentity: { countryCode: locale.country },
    country: locale.country,
    language: locale.language,
  });
  const synced = toResult(cartBuyerIdentityUpdate);
  return { cart: synced.cart ?? cart, messages: [...result.messages, ...synced.messages] };
}

function isDeadCart(payload: CartPayload | null | undefined): boolean {
  if (!payload?.cart) return true;
  return payload.userErrors.some((error) => error.field?.[0] === "cartId");
}

function toResult(payload: CartPayload | null | undefined, action?: CartAction): CartResult {
  const cart = payload?.cart ?? null;
  const cartCodes = cart?.discountCodes ?? [];

  // Discount warnings name no code; pin them to the one they concern while it's on the cart.
  function warningDiscountCode(code: string): string | undefined {
    if (!code.startsWith("DISCOUNT_")) return undefined;
    const candidate =
      action?.intent === "discount-apply"
        ? action.code
        : cartCodes.find((discountCode) => !discountCode.applicable)?.code;
    return cartCodes.find(
      (discountCode) => discountCode.code.toLowerCase() === candidate?.toLowerCase(),
    )?.code;
  }

  const messages: CartMessage[] = [
    ...(payload?.userErrors ?? []).map((error) => ({
      message: error.message,
      code: error.code ?? undefined,
      lineId: requestedLineId(action, error.field),
    })),
    ...(payload?.warnings ?? []).map((warning) => ({
      message: warning.message,
      code: warning.code,
      lineId: warning.target.startsWith("gid://shopify/CartLine/") ? warning.target : undefined,
      discountCode: warningDiscountCode(warning.code),
    })),
  ];

  // Merchandise the market doesn't sell is dropped from the cart without an error.
  if (cart && action?.intent === "add" && messages.length === 0) {
    const cartMerchandise = new Set(cart.lines.nodes.map((line) => line.merchandise.id));
    if (action.lines.some((line) => !cartMerchandise.has(line.merchandiseId))) {
      messages.push({ message: UNAVAILABLE_MESSAGE });
    }
  }

  // An unknown or spent gift card code is ignored without an error too.
  if (cart && action?.intent === "gift-card-apply" && messages.length === 0) {
    const code = action.code.replace(/\s/g, "").toLowerCase();
    const isApplied = cart.appliedGiftCards.some((giftCard) =>
      code.endsWith(giftCard.lastCharacters.toLowerCase()),
    );
    if (!isApplied) messages.push({ message: GIFT_CARD_REJECTED_MESSAGE });
  }

  return { cart, messages };
}

// userError fields point into the request (`["lines", "0", "quantity"]`), not the cart.
function requestedLineId(
  action: CartAction | undefined,
  field: string[] | null | undefined,
): string | undefined {
  const index = Number(field?.[1]);
  if (!Number.isInteger(index)) return undefined;
  if (action?.intent === "update" && field?.[0] === "lines") return action.lines[index]?.id;
  if (action?.intent === "remove" && field?.[0] === "lineIds") return action.lineIds[index];
  return undefined;
}
