import CookiesBannerClient from "@/components/CookiesBannerClient";
import PortableText from "@/fields/PortableText";
import { cookieConsent } from "../fixtures/settings";

// The banner only shows where Shopify says consent is required and no choice is stored, so it's
// shown here regardless.
export default function DemoCookies() {
  return (
    <CookiesBannerClient
      message={<PortableText value={cookieConsent.messageRaw} />}
      acceptLabel={cookieConsent.acceptLabel}
      declineLabel={cookieConsent.declineLabel}
      isAlwaysVisible
    />
  );
}
