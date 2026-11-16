import type { AnalyticsSettingsFragment } from "sanity-nextjs/generated/graphql";
import { SHOPIFY_STORE_DOMAIN } from "shopify/config";
import AnalyticsClient from "@/components/AnalyticsClient";
import { getLocalization } from "@/lib/shopify/localization";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { getShop } from "@/lib/shopify/shop";

interface Props {
  analyticsSettings: AnalyticsSettingsFragment | null | undefined;
}

export default async function Analytics({ analyticsSettings }: Props) {
  const [locale, shop, localization] = await Promise.all([
    getRenderLocale(),
    getShop(),
    getLocalization(),
  ]);
  const currency = localization.availableCountries.find(
    (country) => country.isoCode === locale.country,
  )?.currency.isoCode;

  return (
    <AnalyticsClient
      shopId={shop.id}
      shopDomain={SHOPIFY_STORE_DOMAIN}
      country={locale.country}
      language={locale.language}
      currency={currency ?? ""}
      gtmId={analyticsSettings?.gtmId ?? undefined}
    />
  );
}
