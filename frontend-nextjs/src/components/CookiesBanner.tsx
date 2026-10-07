"use client";

import { useState, useEffect } from "react";
import { getConsent, setConsent } from "@/lib/consent/consent";
import { cn } from "@/lib/utils";

interface Props {
  message?: string;
  acceptLabel?: string;
  declineLabel?: string;
  className?: string;
}

export default function CookiesBanner({
  message = "We use cookies to improve your experience and analyze site usage.",
  acceptLabel = "Accept",
  declineLabel = "Decline",
  className,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    setConsent("declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "bg-background fixed bottom-0 left-0 z-5 flex w-full flex-col items-center px-[var(--margin)] py-[var(--margin)] text-center",
        className,
      )}
      aria-hidden={visible ? "false" : "true"}
    >
      <p>{message}</p>
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          className="text-link underline-color-orange"
          onClick={handleDecline}
        >
          {declineLabel}
        </button>
        <button
          type="button"
          className="text-link underline-color-green"
          onClick={handleAccept}
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
