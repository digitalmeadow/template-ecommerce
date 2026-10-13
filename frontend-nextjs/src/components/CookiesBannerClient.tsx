"use client";

import type { ReactNode } from "react";
import {
  getConsent,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent/consent";
import { useBrowserValue } from "@/lib/useBrowserValue";
import { cn } from "@/lib/utils";

interface Props {
  message: ReactNode;
  acceptLabel: string;
  declineLabel: string;
  className?: string;
}

// Portable Text resolves links server-side, so the message arrives pre-rendered.
export default function CookiesBannerClient({
  message,
  acceptLabel,
  declineLabel,
  className,
}: Props) {
  const visible = useBrowserValue(
    () => getConsent() === null,
    false,
    subscribeToConsent,
  );

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-5 flex w-full flex-col items-center bg-background px-[var(--margin)] py-[var(--margin)] text-center",
        className,
      )}
    >
      {message}
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className="text-link underline-color-orange"
          onClick={() => setConsent("declined")}
        >
          {declineLabel}
        </button>
        <button
          type="button"
          className="text-link underline-color-green"
          onClick={() => setConsent("accepted")}
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
