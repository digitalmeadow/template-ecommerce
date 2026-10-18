import { shopifyClient } from "shopify/client";
import { localizationQuery } from "shopify/queries/localization";
import { buildScoped } from "@/lib/cache";

export const getLocalization = buildScoped(async () => {
  const { localization } = await shopifyClient.request(localizationQuery);
  return localization;
});
