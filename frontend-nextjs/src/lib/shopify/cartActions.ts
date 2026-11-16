import type { CartFragment } from "shopify/generated/graphql";

export interface CartAttribute {
  key: string;
  value: string;
}

export type CartAction =
  | {
      intent: "add";
      lines: { merchandiseId: string; quantity: number; attributes?: CartAttribute[] }[];
    }
  | { intent: "update"; lines: { id: string; quantity: number }[] }
  | { intent: "remove"; lineIds: string[] }
  | { intent: "discount-apply"; code: string }
  | { intent: "discount-remove"; code: string }
  | { intent: "gift-card-apply"; code: string }
  | { intent: "gift-card-remove"; id: string }
  | { intent: "note"; note: string }
  | { intent: "attributes"; attributes: CartAttribute[] };

/** A Shopify rejection or caveat, attached to the line or code it concerns when known. */
export interface CartMessage {
  message: string;
  code?: string;
  lineId?: string;
  discountCode?: string;
}

export interface CartResult {
  cart: CartFragment | null;
  messages: CartMessage[];
}

export interface CartRequestBody {
  locale: string;
  action?: CartAction;
}

const MAX_QUANTITY = 999;

export function sanitizeQuantity(value: unknown): number {
  const quantity = Math.floor(Number(value));
  if (!Number.isFinite(quantity) || quantity < 0) return 0;
  return Math.min(quantity, MAX_QUANTITY);
}

/** Native form posts (no JS): one action per submit, chosen by the button's `name="intent"`. */
export function parseCartForm(form: FormData): CartRequestBody {
  const locale = String(form.get("locale") ?? "");
  const text = (name: string) => String(form.get(name) ?? "").trim();

  switch (text("intent")) {
    case "add":
      return {
        locale,
        action: {
          intent: "add",
          lines: [
            {
              merchandiseId: text("merchandiseId"),
              quantity: sanitizeQuantity(form.get("quantity") ?? 1) || 1,
            },
          ],
        },
      };
    case "update":
      return {
        locale,
        action: {
          intent: "update",
          lines: [{ id: text("lineId"), quantity: sanitizeQuantity(form.get("quantity")) }],
        },
      };
    case "remove":
      return { locale, action: { intent: "remove", lineIds: [text("lineId")] } };
    case "discount-apply":
      return { locale, action: { intent: "discount-apply", code: text("code") } };
    case "discount-remove":
      return { locale, action: { intent: "discount-remove", code: text("code") } };
    case "gift-card-apply":
      return { locale, action: { intent: "gift-card-apply", code: text("code") } };
    case "gift-card-remove":
      return { locale, action: { intent: "gift-card-remove", id: text("giftCardId") } };
    case "note":
      return { locale, action: { intent: "note", note: String(form.get("note") ?? "") } };
    case "attributes": {
      const attributes = [...form.entries()]
        .filter(([name]) => name.startsWith("attributes."))
        .map(([name, value]) => ({ key: name.slice("attributes.".length), value: String(value) }));
      return { locale, action: { intent: "attributes", attributes } };
    }
    default:
      return { locale };
  }
}
