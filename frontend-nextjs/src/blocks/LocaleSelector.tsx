import LocaleSelectorClient from "@/blocks/LocaleSelectorClient";
import { LOCALE_LIST } from "@/lib/shopify/locale";
import { getLocalization } from "@/lib/shopify/localization";
import { getRenderLocale } from "@/lib/shopify/renderLocale";

export default async function LocaleSelector() {
  const [currentLocale, { availableCountries }] = await Promise.all([
    getRenderLocale(),
    getLocalization(),
  ]);

  // Only markets Shopify serves; the currency label is Shopify's, never configured.
  const localeOptions = LOCALE_LIST.flatMap((locale) => {
    const country = availableCountries.find((available) => available.isoCode === locale.country);
    return country
      ? [{ path: locale.path, label: `${locale.label} (${country.currency.isoCode})` }]
      : [];
  });

  if (localeOptions.length < 2) return null;

  return (
    <div className="locale-selector g-select">
      <LocaleSelectorClient localeOptions={localeOptions} currentPath={currentLocale.path} />
    </div>
  );
}
