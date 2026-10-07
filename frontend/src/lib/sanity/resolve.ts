import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@config";

// Kept apart from links.ts so client scripts can import it without the server-only Sanity client.
export function resolveSanityHref(documentType: string, slug?: string | null): string {
  if (!(documentType in SANITY_DOCUMENT_ROUTE_PATTERNS)) {
    throw new Error("Invalid document type");
  }

  const pattern = SANITY_DOCUMENT_ROUTE_PATTERNS[documentType]!;

  if (!pattern.includes("[slug]")) {
    return pattern;
  }

  if (slug) {
    return pattern.replace("[slug]", slug);
  }

  return pattern.replace("[slug]", "");
}
