"use client";

import { useEffect, useState } from "react";
import type { LocationNoticeFragment } from "sanity-nextjs/generated/graphql";
import { getConsent, subscribeToConsent } from "@/lib/consent/consent";
import { useBrowserValue } from "@/lib/useBrowserValue";
import { type LocaleCode } from "@/lib/shopify/locale";
import {
  getStoredLocale,
  LOCALE_STORAGE_KEY,
} from "@/lib/shopify/locale.client";
import {
  dismissLocationNotice,
  fillMarket,
  suggestedLocale,
} from "@/lib/shopify/geo";
import { cn } from "@/lib/utils";

interface Props {
  locationNoticeData: LocationNoticeFragment | null | undefined;
  // True while a cookie banner may be showing: the notice waits for it so the two never stack.
  waitForConsent: boolean;
  className?: string;
}

// Suggests the visitor's own store; never redirects.
export default function LocationNotice({
  locationNoticeData,
  waitForConsent,
  className,
}: Props) {
  const [suggestion, setSuggestion] = useState<LocaleCode | null>(null);
  const consentDecided = useBrowserValue(
    () => !waitForConsent || getConsent() !== null,
    false,
    subscribeToConsent,
  );

  useEffect(() => {
    if (!locationNoticeData || !consentDecided) return;
    let cancelled = false;
    suggestedLocale(getStoredLocale()).then((locale) => {
      if (!cancelled) setSuggestion(locale);
    });
    return () => {
      cancelled = true;
    };
  }, [locationNoticeData, consentDecided]);

  if (!locationNoticeData || !suggestion) return null;

  function handleSwitch() {
    localStorage.setItem(LOCALE_STORAGE_KEY, suggestion!);
    window.location.reload();
  }

  function handleDismiss() {
    dismissLocationNotice(suggestion!);
    setSuggestion(null);
  }

  return (
    <div
      role="status"
      className={cn(
        "location-notice fixed bottom-0 left-0 z-5 flex w-full flex-col items-center bg-background px-[var(--margin)] py-[var(--margin)] text-center",
        className,
      )}
    >
      <p>{fillMarket(locationNoticeData.message, suggestion)}</p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className="text-link underline-color-orange"
          onClick={handleDismiss}
        >
          {locationNoticeData.dismissLabel}
        </button>
        <button
          type="button"
          className="text-link underline-color-green"
          onClick={handleSwitch}
        >
          {fillMarket(locationNoticeData.switchLabel, suggestion)}
        </button>
      </div>
    </div>
  );
}
