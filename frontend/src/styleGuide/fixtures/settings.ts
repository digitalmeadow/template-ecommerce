import type {
  AnnouncementBannerFragment,
  CartFragment,
  CookieConsentFragment,
  FooterFragment,
  HeaderFragment,
  LocationNoticeFragment,
} from "sanity/generated/graphql";
import { block, button, paragraph, richText } from "./content";

export const header: HeaderFragment = {
  __typename: "Header",
  _id: "sg-header",
  // Real paths: the header marks a link to the current page active, and "#" always is.
  navigationItems: [
    button("Shop", "/collections/all"),
    button("About", "/about"),
    button("Journal", "/journal"),
    button("Stockists", "/stockists"),
  ],
};

export const footer: FooterFragment = {
  __typename: "Footer",
  _id: "sg-footer",
  navigationItems: [
    button("Shop", "/collections/all"),
    button("About", "/about"),
    button("Contact", "/contact"),
  ],
};

export const announcementBanner: AnnouncementBannerFragment = {
  __typename: "AnnouncementBanner",
  _id: "sg-announcement",
  // Dismissing is remembered per version: a fixed one keeps it dismissed across reloads.
  _updatedAt: "style-guide",
  enabled: true,
  textRaw: richText(
    block([{ text: "Free shipping on orders over $150. " }, { text: "Shop now", link: "#" }]),
  ),
};

export const cookieConsent: CookieConsentFragment = {
  __typename: "CookieConsent",
  _id: "sg-cookie-consent",
  messageRaw: richText(
    block([
      { text: "We use cookies to improve your experience and analyse site usage. See the " },
      { text: "privacy policy", link: "#" },
      { text: "." },
    ]),
  ),
  acceptLabel: "Accept",
  declineLabel: "Decline",
};

export const locationNotice: LocationNoticeFragment = {
  __typename: "LocationNotice",
  _id: "sg-location-notice",
  message: "Shopping from {market}?",
  switchLabel: "Switch to {market}",
  dismissLabel: "Stay here",
};

export const cart: CartFragment = {
  __typename: "Cart",
  _id: "sg-cart",
  emptyMessageRaw: paragraph("Your cart is empty."),
  noteRaw: paragraph("Orders ship within two working days."),
};
