// GA4 ecommerce events for GTM (configure GA4 tags inside GTM). Events wait until tracking is
// decided: allowed sends them (GTM reads anything already in `window.dataLayer` when it loads),
// declined drops them.

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type EcommerceEvent =
  | "view_item"
  | "view_item_list"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout";

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
}

interface EcommercePayload {
  currency?: string;
  value?: number;
  items?: EcommerceItem[];
  search_term?: string;
}

const MAX_PENDING_EVENTS = 100;

let state: "pending" | "enabled" | "disabled" = "pending";
const pendingEvents: [EcommerceEvent, EcommercePayload][] = [];

function push(event: EcommerceEvent, ecommerce: EcommercePayload) {
  // GA4 merges ecommerce objects across pushes unless the previous one is cleared.
  window.dataLayer!.push({ ecommerce: null });
  window.dataLayer!.push({ event, ecommerce });
}

/** Tracking is allowed: send what's waiting, and everything from now on. */
export function enableDataLayer() {
  if (state === "enabled") return;
  state = "enabled";
  window.dataLayer ??= [];
  pendingEvents.splice(0).forEach(([event, ecommerce]) => push(event, ecommerce));
}

/** Tracking isn't allowed (yet, or at all): drop what's waiting. */
export function disableDataLayer() {
  if (state === "enabled") return;
  state = "disabled";
  pendingEvents.length = 0;
}

export function pushEcommerceEvent(event: EcommerceEvent, ecommerce: EcommercePayload) {
  if (state === "enabled") push(event, ecommerce);
  else if (state === "pending" && pendingEvents.length < MAX_PENDING_EVENTS) {
    pendingEvents.push([event, ecommerce]);
  }
}
