import { localizationQuery } from "shopify/queries/localization";
import { buildScoped } from "@lib/cache";
import { shopifyServer } from "@lib/shopify/serverClient";

export const getLocalization = buildScoped(async () => {
  const { localization } = await shopifyServer.request(localizationQuery);
  return localization;
});
