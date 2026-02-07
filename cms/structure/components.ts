import { ComponentIcon } from "@sanity/icons";

import { StructureBuilder } from "sanity/structure";

export const components = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
	.title('Components')
	.icon(ComponentIcon)
	.child(
		S.list()
			.title('Components')
			.items(
			[
				S.listItem()
					.title('Header')
					.schemaType('header')
					.child(
						S.document().schemaType('header').documentId('header')
					),
				S.listItem()
					.title('Footer')
					.schemaType('footer')
					.child(
						S.document().schemaType('footer').documentId('footer')
					),
				S.listItem()
					.title('Cart')
					.schemaType('cart')
					.child(
						S.document().schemaType('cart').documentId('cart')
					),
			]
		)
	)
};
