import type { MediaFragment, MetaFragment, SanityImageFragment } from "sanity/generated/graphql";

/**
 * What <Meta> actually consumes. Looser than MetaFragment so pages can synthesise metadata
 * from their own fields when an editor leaves the CMS meta blank.
 */
export interface ResolvedMeta {
  title?: string | null;
  description?: string | null;
  image?: SanityImageFragment | null;
}

const DESCRIPTION_MAX = 155;

type PortableTextSpan = { _type?: string; text?: string | null };
type PortableTextBlock = { _type?: string; children?: PortableTextSpan[] | null };

/** Flattens Portable Text to a single plain string; non-text blocks (images etc.) are skipped. */
export function portableTextToPlainText(value: unknown): string {
  if (!Array.isArray(value)) return "";

  return (value as PortableTextBlock[])
    .filter((block) => block?._type === "block")
    .map((block) => (block.children ?? []).map((child) => child?.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncates on a word boundary so descriptions don't get cut mid-word by search engines. */
export function truncate(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "")}…`;
}

/** The subset of a document this module reads. Keeps the helpers usable across document types. */
interface MetaSource {
  title?: string | null;
  meta?: MetaFragment | null;
  mediaThumbnail?: MediaFragment | null;
}

/**
 * CMS meta wins; otherwise synthesise from the document's own fields. Without this, every page
 * an editor hasn't filled in falls through to the single global default and ships a duplicate title.
 */
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
