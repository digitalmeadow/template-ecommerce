import type {
  MediaFragment,
  MetaFragment,
  SanityImageFragment,
} from "sanity-nextjs/generated/graphql";

// What buildMetadata consumes; looser than MetaFragment so pages can synthesise it from their own fields.
export interface ResolvedMeta {
  title?: string | null;
  description?: string | null;
  image?: SanityImageFragment | null;
}

const DESCRIPTION_MAX = 155;

// Truncates on a word boundary so descriptions don't get cut mid-word by search engines.
export function truncate(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

// The subset of a document this module reads, so the helpers work across document types.
interface MetaSource {
  title?: string | null;
  meta?: MetaFragment | null;
  mediaThumbnail?: MediaFragment | null;
}

// CMS meta wins; otherwise synthesise from the document's own fields so pages don't share one default title.
export function resolveMeta(
  source: MetaSource | null | undefined,
  fallbacks: { title?: string | null; description?: string | null } = {},
): ResolvedMeta {
  return {
    title: source?.meta?.title || source?.title || fallbacks.title || "",
    description: source?.meta?.description || truncate(fallbacks.description ?? ""),
    image: source?.meta?.image || source?.mediaThumbnail?.image || null,
  };
}
