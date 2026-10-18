import { DocumentActionComponent, DocumentActionsContext } from "sanity";
import { ActionShopify } from "./actions/ActionShopify";
import { SINGLETON_DOCUMENT_TYPES, UNPREVIEWABLE_DOCUMENT_TYPES } from "../config";
import { ActionPreview } from "./actions/ActionPreview";

export function resolveDocumentActions(
  previous: DocumentActionComponent[],
  context: DocumentActionsContext,
): DocumentActionComponent[] {
  const { schemaType } = context;

  const actions = previous.filter((action) => {
    if (SINGLETON_DOCUMENT_TYPES.includes(schemaType)) {
      return !["delete", "duplicate", "unpublish"].includes(action.action ?? "");
    }

    if (schemaType === "collection" || schemaType === "product") {
      return action.action !== "duplicate";
    }

    if (schemaType === "productVariant") {
      return action.action !== "duplicate" && action.action !== "unpublish";
    }

    return true;
  });

  if (UNPREVIEWABLE_DOCUMENT_TYPES.includes(schemaType)) {
    return [...actions, ActionShopify];
  }

  return [...actions, ActionShopify, ActionPreview];
}
