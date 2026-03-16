import { CogIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";

export const settings = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
	.title('Settings')
	.icon(CogIcon)
	.child(
		S.list()
			.title('Settings')
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
				S.listItem()
					.title('Meta Settings')
					.schemaType('metaSettings')
					.child(
						S.document().schemaType('metaSettings').documentId('metaSettings')
					),
			]
		)
	)
};
