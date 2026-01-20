import { DocumentsIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";
import { documentEditor } from "./documentEditor";

export const productVariants = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Product Variants')
		.icon(DocumentsIcon)
		.schemaType('productVariant')
		.child(
			S.documentTypeList('productVariant').child(
				(id) => documentEditor(S, 'productVariant', id)
			)
		)
};
