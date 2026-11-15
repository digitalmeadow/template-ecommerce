// From the root .env, symlinked in as cms/.env.
export const PREVIEW_WEBSITE_URL = process.env.SANITY_STUDIO_PREVIEW_URL!;

// Created by integrations (Sanity Connect, the form endpoint), never from a "Create" menu.
export const GENERATED_DOCUMENT_TYPES = [
  "product",
  "collection",
  "productVariant",
  "formSubmission",
];

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
  "formSubmission",
  "accordion",
  "productVariant",
  "cart",
  "metaSettings",
  "organisationSettings",
  "analyticsSettings",
];

export { LINKABLE_DOCUMENT_TYPES } from "frontend/config";
