"use client";

import { useEffect } from "react";
import type { AnalyticsSettingsFragment } from "sanity-nextjs/generated/graphql";
import {
  COOKIE_CONSENT_EVENT,
  getConsent,
  type EventCookieConsentChange,
} from "@/lib/consent/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

interface Props {
  analyticsSettingsData: AnalyticsSettingsFragment | null | undefined;
}

function loadGoogleTagManager(gtmId: string) {
  if (window.dataLayer) return;

  window.dataLayer = [{ "gtm.start": Date.now(), event: "gtm.js" }];

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  document.head.appendChild(script);
}

// GTM loads only after cookie consent; router pushState navigations reach it via its History Change trigger.
export default function Analytics({ analyticsSettingsData }: Props) {
  const gtmId = analyticsSettingsData?.gtmId;

  useEffect(() => {
    if (!gtmId) return;

    if (getConsent() === "accepted") {
      loadGoogleTagManager(gtmId);
      return;
    }

    const handleConsentChange = (event: Event) => {
      if ((event as EventCookieConsentChange).detail.status === "accepted")
        loadGoogleTagManager(gtmId);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
  }, [gtmId]);

  return null;
}
