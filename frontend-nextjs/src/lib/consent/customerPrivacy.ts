import type { ConsentStatus } from "@/lib/consent/consent";

// Shopify's Customer Privacy API: records consent for Shopify (checkout, analytics) through the
// same-origin Storefront API proxy, and says whether the visitor's region needs a banner at all.

const CONSENT_SCRIPT_URL =
  "https://cdn.shopify.com/shopifycloud/consent-tracking-api/v0.2/consent-tracking-api.js";
const CONSENT_LOADED_EVENT = "consentTrackingApiLoaded";
export const VISITOR_CONSENT_COLLECTED_EVENT = "visitorConsentCollected";

export interface CustomerPrivacy {
  consentStatus?: string;
  shouldShowBanner(): boolean;
  analyticsProcessingAllowed(): boolean;
  currentVisitorConsent(): { analytics?: string };
  setTrackingConsent(
    consent: {
      analytics: boolean;
      marketing: boolean;
      preferences: boolean;
      sale_of_data: boolean;
    },
    callback: (result?: { error?: unknown }) => void,
  ): void;
  __internal?: {
    uniqueToken?(options: { generateFallback: boolean; tag: string }): string | undefined;
    visitToken?(options: { generateFallback: boolean; tag: string }): string | undefined;
  };
}

export interface ShopifyGlobalConfig {
  shop: string;
  country: string;
  currency: string;
  language: string;
}

declare global {
  interface Window {
    Shopify?: {
      customerPrivacy?: CustomerPrivacy & { config?: Record<string, unknown> };
      analytics?: unknown;
      [key: string]: unknown;
    };
  }
}

// Exists before anything loads, so the banner can wait on it whichever script runs first.
let resolveLoaded: (privacy: CustomerPrivacy | null) => void;
const loaded = new Promise<CustomerPrivacy | null>((resolve) => (resolveLoaded = resolve));
let isLoading = false;

/** Sets up `window.Shopify` and loads the consent API once per page; null if it can't load. */
export function loadCustomerPrivacy(config: ShopifyGlobalConfig): Promise<CustomerPrivacy | null> {
  if (isLoading) return loaded;
  isLoading = true;

  const shopify = (window.Shopify ??= {});
  Object.assign(shopify, {
    shop: config.shop,
    country: config.country,
    currency: { active: config.currency },
    locale: config.language.toLowerCase(),
    routes: { root: "/" },
    customerPrivacy: {
      // Headless + async modes; requests go to this origin, i.e. the proxy.
      config: {
        isHeadless: true,
        asyncConsent: true,
        asyncVisitorState: true,
        consentDomain: window.location.host,
      },
    },
  });

  document.addEventListener(
    CONSENT_LOADED_EVENT,
    () => resolveLoaded(window.Shopify?.customerPrivacy ?? null),
    { once: true },
  );
  const script = document.createElement("script");
  script.async = true;
  script.src = CONSENT_SCRIPT_URL;
  // Blocked or failed: callers treat consent as required, the safe default.
  script.onerror = () => resolveLoaded(null);
  document.head.appendChild(script);
  return loaded;
}

/** Whether the visitor's region needs an explicit choice before tracking. */
export async function isConsentRequired(): Promise<boolean> {
  const privacy = await loaded;
  if (!privacy) return true;
  try {
    return privacy.shouldShowBanner();
  } catch {
    return true;
  }
}

/** Passes our banner's choice to Shopify, which applies it to analytics and checkout. */
export async function syncShopifyConsent(status: ConsentStatus): Promise<void> {
  const privacy = await loaded;
  if (!privacy) return;
  const isAccepted = status === "accepted";
  await new Promise<void>((resolve) =>
    privacy.setTrackingConsent(
      {
        analytics: isAccepted,
        marketing: isAccepted,
        preferences: isAccepted,
        sale_of_data: isAccepted,
      },
      () => resolve(),
    ),
  );
}
