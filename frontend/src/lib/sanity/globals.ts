import { sanityClient } from "sanity/client";
import { globalsQuery } from "sanity/queries/globals";
import { buildScoped } from "./cache";

/** Header, footer, cart and settings singletons — identical on every page, so fetched once. */
export const getGlobals = buildScoped(async () => {
  const result = await sanityClient.request(globalsQuery);

  return {
    headerData: result?.allHeader?.[0],
    footerData: result?.allFooter?.[0],
    cartData: result?.allCart?.[0],
    metaSettingsData: result?.allMetaSettings?.[0],
    organisationSettingsData: result?.allOrganisationSettings?.[0],
    analyticsSettingsData: result?.allAnalyticsSettings?.[0],
    announcementBannerData: result?.allAnnouncementBanner?.[0],
    cookieConsentData: result?.allCookieConsent?.[0],
    locationNoticeData: result?.allLocationNotice?.[0],
  };
});
