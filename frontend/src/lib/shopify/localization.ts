import { shopifyClient } from "shopify/client";
import { localizationsQuery } from "shopify/queries/localization";
import { buildScoped } from "@lib/sanity/cache";

export const getLocalization = buildScoped(async () => {
  const { localization } = await shopifyClient.request(localizationsQuery);
  return localization;
});
