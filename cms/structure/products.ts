import { TagIcon, TagsIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";

export const products = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Products')
		.icon(TagsIcon)
		.schemaType('product')
		.child(
			S.documentTypeList('product').child(
				(productId) =>
					S.list()
						.title('Product')
						.items([
							S.listItem()
								.title('Product')
								.icon(TagIcon)
								.child(
									S.document()
										.schemaType('product')
										.documentId(productId)
								),
							S.divider(),
							S.listItem()
								.title('Variants')
								.icon(TagsIcon)
								.child(
									S.documentList()
										.title('Variants')
										.schemaType('productVariant')
										.filter('_type == "productVariant" && product._ref == $productId')
										.params({productId})
										.child((variantId) =>
											S.document()
												.schemaType('productVariant')
												.documentId(variantId)
										)
								),
						])
			)
		)
};
