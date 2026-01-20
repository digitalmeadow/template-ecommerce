import { NewDocumentOptionsContext, TemplateItem } from "sanity";
import { SHOPIFY_DOCUMENT_TYPES, SINGLETON_DOCUMENT_TYPES } from "../config";

export default function resolveNewDocumentOptions(
  previous: TemplateItem[],
  context: NewDocumentOptionsContext,
): TemplateItem[] {
  const { type, schemaType } = context.creationContext;

  // Prevent creation of singleton and externally controlled document types via "New document" button
  if (
    type === "structure" &&
    [...SINGLETON_DOCUMENT_TYPES, ...SHOPIFY_DOCUMENT_TYPES].includes(schemaType)
  ) {
    return [];
  }

  return previous;
}
