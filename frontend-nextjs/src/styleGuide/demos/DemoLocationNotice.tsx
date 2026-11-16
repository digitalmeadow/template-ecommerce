import LocationNotice from "@/components/LocationNotice";
import { DEFAULT_LOCALE, LOCALE_LIST } from "@/lib/shopify/locale";
import { locationNotice } from "../fixtures/settings";

// The notice needs a geo header, which dev and the preview site don't have, so it's shown here
// suggesting the first other locale.
export default function DemoLocationNotice() {
  const suggestion = LOCALE_LIST.find((locale) => locale !== DEFAULT_LOCALE) ?? DEFAULT_LOCALE;
  return (
    <LocationNotice
      locationNotice={locationNotice}
      waitForConsent={false}
      suggestion={suggestion}
    />
  );
}
