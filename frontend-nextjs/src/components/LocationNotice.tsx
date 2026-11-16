"use client";

import { useEffect, useState } from "react";
import type { LocationNoticeFragment } from "sanity-nextjs/generated/graphql";
import { getConsent, subscribeToConsent } from "@/lib/consent/consent";
import { isConsentRequired } from "@/lib/consent/customerPrivacy";
import { dismissLocationNotice, fillMarket, suggestedLocale } from "@/lib/shopify/geo";
import { switchLocale, type Locale } from "@/lib/shopify/locale";
import { useLocale } from "@/lib/shopify/useLocale";

interface Props {
  locationNotice: LocationNoticeFragment | null | undefined;
  // True while a cookie banner may be showing: the notice waits for it so the two never stack.
  waitForConsent: boolean;
  /** Shown without a geo lookup (the style guide: dev and the preview site have no geo header). */
  suggestion?: Locale;
}

// Suggests the visitor's own store; never redirects.
export default function LocationNotice({
  locationNotice,
  waitForConsent,
  suggestion: fixedSuggestion,
}: Props) {
  const locale = useLocale();
  const [geoSuggestion, setSuggestion] = useState<Locale | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const suggestion = isDismissed ? null : (fixedSuggestion ?? geoSuggestion);

  useEffect(() => {
    if (!locationNotice || fixedSuggestion) return;
    let isCancelled = false;
    let unsubscribe: (() => void) | undefined;

    const suggest = () =>
      suggestedLocale(locale).then((suggested) => {
        if (!isCancelled) setSuggestion(suggested);
      });

    (async () => {
      const isBannerShowing =
        waitForConsent && getConsent() === null && (await isConsentRequired());
      if (isCancelled) return;
      if (!isBannerShowing) return suggest();
      unsubscribe = subscribeToConsent(() => {
        unsubscribe?.();
        suggest();
      });
    })();

    return () => {
      isCancelled = true;
      unsubscribe?.();
    };
  }, [locationNotice, waitForConsent, locale, fixedSuggestion]);

  if (!locationNotice) return null;

  const handleDismiss = () => {
    if (suggestion) dismissLocationNotice(suggestion);
    setIsDismissed(true);
  };

  const handleSwitch = () => {
    if (suggestion) switchLocale(suggestion);
  };

  return (
    <div
      className="location-notice fixed bottom-0 left-0 z-5 flex w-full flex-col items-center border-t border-rule bg-background p-[var(--margin)] text-center"
      role="status"
      hidden={!suggestion}
    >
      <p>{suggestion && fillMarket(locationNotice.message, suggestion)}</p>
      <div className="actions flex flex-wrap gap-4">
        <button className="g-text-link g-underline-orange" type="button" onClick={handleDismiss}>
          {locationNotice.dismissLabel}
        </button>
        <button className="g-text-link g-underline-green" type="button" onClick={handleSwitch}>
          {suggestion && fillMarket(locationNotice.switchLabel, suggestion)}
        </button>
      </div>
    </div>
  );
}
