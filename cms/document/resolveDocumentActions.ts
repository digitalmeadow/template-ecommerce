import {DocumentActionComponent, DocumentActionsContext} from 'sanity'
import {ShopifyLink} from './actions/ShopifyLink'
import {SINGLETON_DOCUMENT_TYPES} from '../config'

export default function resolveDocumentActions(
  previous: DocumentActionComponent[],
  context: DocumentActionsContext,
): DocumentActionComponent[] {
  // Actions to be returned
  let actions: DocumentActionComponent[] = []

  // Filter out actions based on document type and id
  actions = previous.filter((action) => {
    // Prevent creation & deletion on certain document types
    if (SINGLETON_DOCUMENT_TYPES.includes(context.schemaType)) {
      if (
        action.action === 'delete' ||
        action.action === 'duplicate' ||
        action.action === 'unpublish'
      ) {
        return false
      }
    }

    // Collections:
    // - Disable creation and duplication
    if (context.schemaType === 'collection') {
      if (action.action === 'duplicate') {
        return false
      }
    }

    // Products:
    // - Disable creation and duplication
    if (context.schemaType === 'product') {
      if (action.action === 'duplicate') {
        return false
      }
    }

    // Product variants:
    // - Disable creation, duplication and unpublishing
    if (context.schemaType === 'productVariant') {
      if (action.action === 'duplicate' || action.action === 'unpublish') {
        return false
      }
    }

    return true
  })

  // Add custom actions
  actions = [...actions, ShopifyLink]

  return actions
}
