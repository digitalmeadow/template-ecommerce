// From the root .env, symlinked in as cms/.env.
export const PREVIEW_WEBSITE_URL = process.env.SANITY_STUDIO_PREVIEW_URL!;

export const SHOPIFY_DOCUMENT_TYPES = ["product", "collection", "productVariant"];

export const SINGLETON_DOCUMENT_TYPES: string[] = [
  "home",
  "footer",
  "header",
  "cart",
  "metaSettings",
  "organisationSettings",
  "analyticsSettings",
  "announcementBanner",
  "cookieConsent",
  "locationNotice",
];

// No front-end route of their own, so Preview would just land on the homepage.
export const UNPREVIEWABLE_DOCUMENT_TYPES: string[] = [
  "form",
  "accordion",
  "productVariant",
  "cart",
  "metaSettings",
  "organisationSettings",
  "analyticsSettings",
];

export { LINKABLE_DOCUMENT_TYPES } from "frontend/config";
