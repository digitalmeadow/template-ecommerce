"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cookie-consent";
const EXPIRY_DAYS = 30;

type ConsentStatus = "accepted" | "declined" | null;

function getConsent(): ConsentStatus {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored);
    const expiryDate = new Date(data.timestamp);
    expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);

    if (new Date() > expiryDate) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    if (data.status === "accepted" || data.status === "declined") {
      return data.status;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

function setConsent(status: "accepted" | "declined") {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ status, timestamp: new Date().toISOString() }),
  );
}

function initializeAnalytics() {
  /* placeholder — replace with actual analytics init */
}

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
    const consent = getConsent();
    if (consent === null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    } else if (consent === "accepted") {
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    setVisible(false);
    initializeAnalytics();
  };

  const handleDecline = () => {
    setConsent("declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed z-5 bottom-0 left-0 w-full px-[var(--margin)] py-[var(--margin)] flex flex-col items-center text-center bg-background",
        className,
      )}
      aria-hidden={visible ? "false" : "true"}
    >
      <p>{message}</p>
      <div className="flex gap-4 flex-wrap">
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
