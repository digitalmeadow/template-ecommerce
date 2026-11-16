"use client";

import { useEffect, useState, type ReactNode } from "react";
import { getConsent, setConsent, subscribeToConsent } from "@/lib/consent/consent";
import { isConsentRequired } from "@/lib/consent/customerPrivacy";
import { useBrowserValue } from "@/lib/useBrowserValue";

interface Props {
  message: ReactNode;
  acceptLabel: string | null | undefined;
  declineLabel: string | null | undefined;
  /** Shown regardless of region and stored choice (the style guide). */
  isAlwaysVisible?: boolean;
}

// Portable Text resolves links server-side, so the message arrives pre-rendered.
export default function CookiesBannerClient({
  message,
  acceptLabel,
  declineLabel,
  isAlwaysVisible = false,
}: Props) {
  const [isRequired, setIsRequired] = useState(false);
  const isUndecided = useBrowserValue(() => getConsent() === null, false, subscribeToConsent);

  // Only where the visitor's region needs an explicit choice (Shopify decides).
  useEffect(() => {
    let isCancelled = false;
    isConsentRequired().then((required) => {
      if (!isCancelled) setIsRequired(required);
    });
    return () => {
      isCancelled = true;
    };
  }, []);

  const isVisible = isAlwaysVisible || (isRequired && isUndecided);

  return (
    <div
      className="cookie-banner fixed bottom-0 left-0 z-5 flex w-full flex-col items-center border-t border-rule bg-background p-[var(--margin)] text-center"
      hidden={!isVisible}
      aria-hidden={!isVisible}
    >
      {message}
      <div className="actions flex flex-wrap gap-4">
        <button
          className="g-text-link g-underline-orange"
          type="button"
          onClick={() => setConsent("declined")}
        >
          {declineLabel}
        </button>
        <button
          className="g-text-link g-underline-green"
          type="button"
          onClick={() => setConsent("accepted")}
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
