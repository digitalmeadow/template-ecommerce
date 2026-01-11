import {DocumentsIcon} from '@sanity/icons'
import {StructureBuilder} from 'sanity/structure'
import {documentEditor} from './documentEditor'

export const products = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Products')
		.icon(DocumentsIcon)
		.schemaType('product')
		.child(
			S.documentTypeList('product').child(
				(productId) =>
					S.list()
						.title('Product')
						.items([
							// Product
							S.listItem()
								.title('Product Details')
								.icon(DocumentsIcon)
								.child(documentEditor(S, 'product', productId)),
							S.divider(),
							// Product variants
							S.listItem()
								.title('Variants')
								.icon(DocumentsIcon)
								.child(
									S.documentList()
										.title('Variants')
										.schemaType('productVariant')
										.filter('_type == "productVariant" && product._ref == $productId')
										.params({productId})
										.child((variantId) => documentEditor(S, 'productVariant', variantId))
								),
						])
			)
		)
}
