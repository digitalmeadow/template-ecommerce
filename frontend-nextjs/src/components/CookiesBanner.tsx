import type { CookieConsentFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import CookiesBannerClient from "./CookiesBannerClient";

interface Props {
  cookieConsentData: CookieConsentFragment | null | undefined;
}

// No consent copy means no banner, so analytics never load: the safe failure.
export default function CookiesBanner({ cookieConsentData }: Props) {
  if (!cookieConsentData?.messageRaw) return null;

  return (
    <CookiesBannerClient
      message={<PortableText value={cookieConsentData.messageRaw} />}
      acceptLabel={cookieConsentData.acceptLabel ?? ""}
      declineLabel={cookieConsentData.declineLabel ?? ""}
    />
  );
}
