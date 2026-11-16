import {
  VISITOR_CONSENT_COLLECTED_EVENT,
  type CustomerPrivacy,
} from "@/lib/consent/customerPrivacy";

// Shopify's analytics script (shopify.js) registers itself as a "destination" on
// `window.Shopify.analytics` and sends what we publish to Shopify admin analytics, attributed to
// the Headless channel. This is the bus it expects, after Hydrogen's: events wait until the
// Customer Privacy API allows analytics, then replay in order; a decline drops them.

const ANALYTICS_SCRIPT_URL = "https://cdn.shopify.com/storefront/analytics/shopify.js";
const MAX_BUFFERED_EVENTS = 500;

export type ShopifyAnalyticsEvent =
  | "page_viewed"
  | "product_viewed"
  | "collection_viewed"
  | "search_viewed"
  | "cart_viewed"
  | "product_added_to_cart"
  | "product_removed_from_cart";

type TrackingValues = { uniqueToken: string; visitToken: string };
type Callback = (payload: unknown, context: { getTrackingValues(): TrackingValues }) => void;

interface DestinationSetup {
  name: string;
  setup(api: {
    subscribe(event: string, callback: Callback): () => void;
    getConfig(): unknown;
  }): void | (() => void) | Promise<void | (() => void)>;
}

interface Destination {
  subscriptions: Map<string, Set<Callback>>;
  /** Index of the next buffered event this destination hasn't seen. */
  cursor: number;
}

let publishEvent: ((event: ShopifyAnalyticsEvent, payload: object) => void) | undefined;

/** Creates the bus, then loads shopify.js to listen on it. Once per page. */
export function initShopifyAnalytics(shopId: string, privacy: CustomerPrivacy | null) {
  if (publishEvent || !window.Shopify || !privacy) return;

  const shop = { shopId, channel: "headless" };
  const buffer: { event: string; payload: unknown }[] = [];
  const destinations = new Set<Destination>();

  const canTrack = () => {
    try {
      return (
        privacy.consentStatus === "loaded" &&
        privacy.currentVisitorConsent().analytics !== "no" &&
        privacy.analyticsProcessingAllowed()
      );
    } catch {
      return false;
    }
  };

  const context = {
    getTrackingValues: (): TrackingValues => {
      const options = { generateFallback: true, tag: "headless:shopify" };
      return {
        uniqueToken: privacy.__internal?.uniqueToken?.(options) ?? "",
        visitToken: privacy.__internal?.visitToken?.(options) ?? "",
      };
    },
  };

  const deliver = () => {
    if (!canTrack()) return;
    for (const destination of destinations) {
      for (; destination.cursor < buffer.length; destination.cursor++) {
        const { event, payload } = buffer[destination.cursor]!;
        destination.subscriptions.get(event)?.forEach((callback) => {
          try {
            callback(payload, context);
          } catch (error) {
            console.error("Shopify analytics destination failed:", error);
          }
        });
      }
    }
  };

  publishEvent = (event, payload) => {
    if (buffer.length >= MAX_BUFFERED_EVENTS) return;
    buffer.push({ event, payload: { url: window.location.href, ...payload, shop } });
    deliver();
  };

  function addDestination({ name, setup }: DestinationSetup) {
    const destination: Destination = { subscriptions: new Map(), cursor: 0 };
    const subscribe = (event: string, callback: Callback) => {
      const callbacks = destination.subscriptions.get(event) ?? new Set();
      callbacks.add(callback);
      destination.subscriptions.set(event, callbacks);
      return () => callbacks.delete(callback);
    };
    Promise.resolve(setup({ subscribe, getConfig: () => ({ shop }) }))
      .then(() => {
        destinations.add(destination);
        deliver();
      })
      .catch((error) => console.error(`Shopify analytics "${name}" failed:`, error));
    return () => destinations.delete(destination);
  }

  window.Shopify.analytics = { publish: publishEvent, addDestination, getConfig: () => ({ shop }) };

  document.addEventListener(VISITOR_CONSENT_COLLECTED_EVENT, () => {
    if (canTrack()) return deliver();
    buffer.length = 0;
    for (const destination of destinations) destination.cursor = 0;
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = ANALYTICS_SCRIPT_URL;
  document.head.appendChild(script);
}

export function publishShopifyEvent(event: ShopifyAnalyticsEvent, payload: object = {}) {
  publishEvent?.(event, payload);
}
