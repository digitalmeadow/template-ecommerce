import type { CartLineFragment } from "shopify/generated/graphql";

// Public surface of custom elements that other components call into.
export interface OverlayElement extends HTMLElement {
  isOpen: boolean;
  open(): void;
  close(): void;
  toggle(): void;
}

export interface CartLineItemElement extends HTMLElement {
  init(line: CartLineFragment): void;
}
