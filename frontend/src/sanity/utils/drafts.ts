import { SANITY_PERSPECTIVE } from "astro:env/client";

export function isDraftId(id?: string | null): boolean {
  if (!id) return false;
  return id.startsWith("drafts.");
}

export function selectDocument<T extends { _id?: string | null }>(
  documents: T[]
): T | undefined {
  if (documents.length === 0) return undefined;
  if (documents.length === 1) return documents[0];

  if (SANITY_PERSPECTIVE === "raw") {
    return documents.find((doc) => isDraftId(doc._id));
  } else {
    return documents.find((doc) => !isDraftId(doc._id)) || documents[0];
  }
}
