import { NewDocumentOptionsContext, TemplateItem } from "sanity";
import { HIDDEN_DOCUMENT_TYPES } from "../config";

export default function resolveNewDocumentOptions(
  previous: TemplateItem[],
  context: NewDocumentOptionsContext,
): TemplateItem[] {
  const { schemaType } = context.creationContext;

  if (schemaType && HIDDEN_DOCUMENT_TYPES.includes(schemaType)) {
    return [];
  }

  return previous;
}
