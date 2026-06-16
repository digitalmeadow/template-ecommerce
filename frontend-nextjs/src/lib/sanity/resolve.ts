import { SANITY_PROJECT_ID } from "sanity-nextjs/config";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@/config";

export function resolveSanityHref(
  documentType: string,
  slug?: string | null,
): string {
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

export function sanityFileUrlFromRef(source: string | undefined): string {
  if (!source) return "";

  let id = source;
  if (id.startsWith("file-")) {
    id = id.slice(5);
  }

  const lastDashIndex = id.lastIndexOf("-");
  const sourceUrl =
    id.slice(0, lastDashIndex) + "." + id.slice(lastDashIndex + 1);

  return `https://cdn.sanity.io/files/${SANITY_PROJECT_ID}/production/${sourceUrl}`;
}
