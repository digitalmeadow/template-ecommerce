import type { CookieConsentFragment } from "sanity-nextjs/generated/graphql";
import CookiesBannerClient from "@/components/CookiesBannerClient";
import PortableText from "@/fields/PortableText";

interface Props {
  cookieConsent: CookieConsentFragment | null | undefined;
}

// No consent copy means no banner, so analytics never load: the safe failure.
export default function CookiesBanner({ cookieConsent }: Props) {
  if (!cookieConsent?.messageRaw) return null;

  return (
    <CookiesBannerClient
      message={<PortableText value={cookieConsent.messageRaw} />}
      acceptLabel={cookieConsent.acceptLabel}
      declineLabel={cookieConsent.declineLabel}
    />
  );
}
