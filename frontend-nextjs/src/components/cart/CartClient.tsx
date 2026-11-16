"use client";

import { useStore } from "@nanostores/react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { CartFragment, CartLineFragment } from "shopify/generated/graphql";
import PriceDisplay from "@/blocks/PriceDisplay";
import Overlay from "@/layouts/Overlay";
import { trackBeginCheckout, trackCartView } from "@/lib/analytics/track";
import type { CartResult } from "@/lib/shopify/cartActions";
import { useLocale } from "@/lib/shopify/useLocale";
import { cn } from "@/lib/utils";
import {
  $cart,
  $cartCount,
  $cartLines,
  $cartMessages,
  $cartPending,
  $cartTotal,
  applyDiscountCode,
  applyGiftCard,
  loadCart,
  removeDiscountCode,
  removeGiftCard,
  updateNote,
} from "@/stores/cart";
import { $cartOpen, setCartOpen } from "@/stores/ui";
import CartLineItem from "./CartLineItem";

interface Props {
  emptyMessage: ReactNode;
  note: ReactNode;
}

// The snapshot is read from localStorage before hydration, so hydrate with the server's empty cart.
const NO_LINES: CartLineFragment[] = [];

// The layout persists across navigations, but StrictMode mounts effects twice in dev.
let hasLoadedCart = false;

export default function CartClient({ emptyMessage, note }: Props) {
  const locale = useLocale();
  const cart = useStore($cart, { ssr: () => null });
  const lines = useStore($cartLines, { ssr: () => NO_LINES });
  const count = useStore($cartCount, { ssr: () => 0 });
  const total = useStore($cartTotal, { ssr: () => null });
  const messages = useStore($cartMessages);
  const pending = useStore($cartPending);
  const isOpen = useStore($cartOpen);
  const [noteDraft, setNoteDraft] = useState<string | null>(null);

  useEffect(() => {
    if (hasLoadedCart) return;
    hasLoadedCart = true;
    loadCart();
  }, []);

  useEffect(
    () =>
      $cartOpen.listen((isCartOpen) => {
        if (isCartOpen) trackCartView($cart.get());
      }),
    [],
  );

  const isEmpty = !cart || lines.length === 0;
  const isPending = pending.size > 0;
  const cartMessages = [
    ...new Set(
      messages
        .filter((message) => !message.lineId && !message.discountCode)
        .map((message) => message.message),
    ),
  ].join(" ");

  function handleNoteBlur() {
    if (noteDraft !== null && noteDraft !== (cart?.note ?? "")) updateNote(noteDraft);
    setNoteDraft(null);
  }

  return (
    <Overlay
      id="cart"
      isOpen={isOpen}
      onClose={() => setCartOpen(false)}
      layout="right"
      ariaLabel="Shopping Cart"
    >
      <div className="mb-10">
        <h2 className="g-heading-5">Your Cart ({count})</h2>
      </div>

      <aside className="h-full" data-cart data-state={isEmpty ? "empty" : "loaded"}>
        <div className="flex size-full flex-col gap-10">
          {isEmpty && <div>{emptyMessage}</div>}

          {!isEmpty && (
            <>
              <ul className="flex flex-col gap-6">
                {lines.map((line) => (
                  <li key={line.id}>
                    <CartLineItem
                      line={line}
                      messages={messages.filter((message) => message.lineId === line.id)}
                      isPending={pending.has(line.id)}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <CodeForm
                  intent="discount-apply"
                  label="Discount code"
                  localePath={locale.path}
                  isPending={pending.has("discount")}
                  apply={applyDiscountCode}
                />
                <AppliedCodes
                  codes={discountCodeLabels(cart, messages).map(({ code, label }) => ({
                    key: code,
                    label,
                    remove: () => removeDiscountCode(code),
                  }))}
                />

                <CodeForm
                  intent="gift-card-apply"
                  label="Gift card"
                  localePath={locale.path}
                  isPending={pending.has("gift-card")}
                  apply={applyGiftCard}
                />
                <AppliedCodes
                  codes={(cart?.appliedGiftCards ?? []).map((giftCard) => ({
                    key: giftCard.id,
                    label: `Gift card •••• ${giftCard.lastCharacters}`,
                    remove: () => removeGiftCard(giftCard.id),
                  }))}
                />
              </div>

              <label className="g-form-field">
                <span>Order note</span>
                <textarea
                  name="note"
                  rows={2}
                  value={noteDraft ?? cart?.note ?? ""}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  onBlur={handleNoteBlur}
                />
              </label>

              <div>
                <span>
                  Total:&nbsp;
                  <PriceDisplay amount={total?.amount} currency={total?.currencyCode} />
                </span>
              </div>
            </>
          )}

          <div className="mt-auto">
            <p className="g-form-error empty:hidden" role="alert">
              {cartMessages}
            </p>

            <div>{note}</div>

            {!isEmpty && (
              // eslint-disable-next-line @next/next/no-html-link-for-pages -- a route handler that redirects to Shopify.
              <a
                className={cn(
                  "mt-10 inline-block g-text-link",
                  isPending && "pointer-events-none opacity-(--opacity-disabled)",
                )}
                href="/checkout"
                onClick={() => trackBeginCheckout($cart.get())}
              >
                Checkout
              </a>
            )}
          </div>
        </div>
      </aside>
    </Overlay>
  );
}

function discountCodeLabels(cart: CartFragment | null, messages: CartResult["messages"]) {
  return (cart?.discountCodes ?? []).map((discountCode) => {
    const message = messages.find((cartMessage) => cartMessage.discountCode === discountCode.code);
    return {
      code: discountCode.code,
      label: discountCode.applicable
        ? discountCode.code
        : `${discountCode.code} (${message?.message ?? "not applicable"})`,
    };
  });
}

interface CodeFormProps {
  intent: "discount-apply" | "gift-card-apply";
  label: string;
  localePath: string;
  isPending: boolean;
  apply: (code: string) => Promise<CartResult | null>;
}

// A native form post without JS; with it, the store applies the code and the form clears on success.
function CodeForm({ intent, label, localePath, isPending, apply }: CodeFormProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const code = String(new FormData(form).get("code") ?? "").trim();
    if (!code) return;
    const result = await apply(code);
    if (result && !result.messages.length) form.reset();
  }

  return (
    <form
      className={cn(
        "flex items-center gap-3",
        isPending && "pointer-events-none opacity-(--opacity-disabled)",
      )}
      method="post"
      action="/api/cart"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="locale" value={localePath} />
      <input type="hidden" name="intent" value={intent} />
      <label className="g-form-field flex-1">
        <span className="g-sr-only">{label}</span>
        <input type="text" name="code" placeholder={label} autoComplete="off" />
      </label>
      <button className="g-text-link" type="submit">
        Apply
      </button>
    </form>
  );
}

interface AppliedCodesProps {
  codes: { key: string; label: string; remove: () => void }[];
}

function AppliedCodes({ codes }: AppliedCodesProps) {
  if (!codes.length) return null;
  return (
    <ul>
      {codes.map(({ key, label, remove }) => (
        <li className="flex gap-3" key={key}>
          <span>{label}</span>
          <button className="g-text-link g-underline-orange" type="button" onClick={remove}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
