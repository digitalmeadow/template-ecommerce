export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";
export const COOKIE_CONSENT_EXPIRY_DAYS = 30;
export const COOKIE_CONSENT_EVENT = "cookie-consent:change";

export type ConsentStatus = "accepted" | "declined";
export type EventCookieConsentChange = CustomEvent<{ status: ConsentStatus }>;

export function getConsent(): ConsentStatus | null {
  const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored);
    const expiryDate = new Date(data.timestamp);
    expiryDate.setDate(expiryDate.getDate() + COOKIE_CONSENT_EXPIRY_DAYS);

    if (new Date() > expiryDate) {
      localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
      return null;
    }

    if (data.status === "accepted" || data.status === "declined") {
      return data.status;
    }
  } catch {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  }

  return null;
}

export function setConsent(status: ConsentStatus) {
  localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify({ status, timestamp: new Date().toISOString() }),
  );
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { status } }),
  );
}
