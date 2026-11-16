import { sanityClient } from "sanity/client";
import { globalsQuery } from "sanity/queries/globals";
import { buildScoped } from "@lib/cache";

/** Header, footer, cart and settings singletons — identical on every page, so fetched once. */
export const getGlobals = buildScoped(async () => {
  const result = await sanityClient.request(globalsQuery);

  return {
    header: result?.allHeader?.[0],
    footer: result?.allFooter?.[0],
    cart: result?.allCart?.[0],
    metaSettings: result?.allMetaSettings?.[0],
    organisationSettings: result?.allOrganisationSettings?.[0],
    analyticsSettings: result?.allAnalyticsSettings?.[0],
    announcementBanner: result?.allAnnouncementBanner?.[0],
    cookieConsent: result?.allCookieConsent?.[0],
    locationNotice: result?.allLocationNotice?.[0],
  };
});
