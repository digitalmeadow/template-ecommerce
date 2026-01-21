import { PREVIEW } from "astro:env/client";

export function isDraftId(id?: string | null): boolean {
  if (!id) return false;
  return id.startsWith("drafts.");
}

export function selectDocument<T extends { __typename: string; _id?: string | null }>(
  documents: T[],
): T {
  if (documents.length === 0) throw new Error("No documents found to select from.");
  if (documents.length === 1) return documents[0];

  if (PREVIEW === "true") {
    const document = documents.find((doc) => isDraftId(doc._id));
    if (!document) throw new Error("Draft document not found: " + documents[0].__typename);
    return document;
  } else {
    const document = documents.find((doc) => !isDraftId(doc._id));
    if (!document) throw new Error("Published document not found: " + documents[0].__typename);
    return document;
  }
}
