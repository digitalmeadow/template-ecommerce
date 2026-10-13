// Document types a `link` can point at. Each needs a route below; the Studio reads this list too.
export const LINKABLE_DOCUMENT_TYPES = [
  "home",
  "page",
  "product",
  "collection",
] as const;
export type LinkableDocumentType = (typeof LINKABLE_DOCUMENT_TYPES)[number];

const LINKABLE_ROUTE_PATTERNS = {
  home: "/",
  page: "/[slug]",
  product: "/products/[slug]",
  collection: "/collections/[slug]",
} satisfies Record<LinkableDocumentType, string>;

export const SANITY_DOCUMENT_ROUTE_PATTERNS: Record<string, string> = {
  header: "/",
  footer: "/",
  announcementBanner: "/",
  cookieConsent: "/",
  locationNotice: "/",
  ...LINKABLE_ROUTE_PATTERNS,
};
