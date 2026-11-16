"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { disableDataLayer, enableDataLayer } from "@/lib/analytics/dataLayer";
import { initShopifyAnalytics } from "@/lib/analytics/shopifyAnalytics";
import { trackPageView } from "@/lib/analytics/track";
import {
  getConsent,
  resolveTrackingAllowed,
  subscribeToConsent,
  type EventCookieConsentChange,
} from "@/lib/consent/consent";
import { loadCustomerPrivacy, syncShopifyConsent } from "@/lib/consent/customerPrivacy";

interface Props {
  shopId: string;
  shopDomain: string;
  country: string;
  language: string;
  currency: string;
  gtmId: string | undefined;
}

let isInitialised = false;
let isGtmLoaded = false;

// GTM loads only once a visitor accepts cookies (or their region needs no banner).
// Router navigations are pushState, which GTM's History Change trigger reports.
function loadGtm(gtmId: string | undefined) {
  if (!gtmId || isGtmLoaded) return;
  isGtmLoaded = true;
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}

function enableTracking(gtmId: string | undefined) {
  enableDataLayer();
  loadGtm(gtmId);
}

async function initialise({ shopId, shopDomain, country, language, currency, gtmId }: Props) {
  const privacy = await loadCustomerPrivacy({ shop: shopDomain, country, language, currency });

  // Ours is set but Shopify's isn't (its cookies were cleared): restore it rather than ask again.
  const consent = getConsent();
  if (privacy && consent && !privacy.currentVisitorConsent().analytics) {
    await syncShopifyConsent(consent);
  }

  initShopifyAnalytics(shopId, privacy);
  trackPageView();

  // Undecided (banner showing) keeps GA4 events waiting for the visitor's answer.
  if (await resolveTrackingAllowed()) enableTracking(gtmId);
  else if (getConsent() === "declined") disableDataLayer();
  subscribeToConsent((event) => {
    const { status } = (event as EventCookieConsentChange).detail;
    syncShopifyConsent(status);
    if (status === "accepted") enableTracking(gtmId);
    else disableDataLayer();
  });
}

// The layout persists across navigations; the setup runs once per visit.
export default function AnalyticsClient(props: Props) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (isInitialised) return;
    isInitialised = true;
    initialise(props);
  }, [props]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    trackPageView();
  }, [pathname]);

  return null;
}
