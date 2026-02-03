import { DocumentsIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";

export const pages = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Pages')
		.icon(DocumentsIcon)
		.schemaType('page')
		.child(
			S.documentTypeList('page').child(
				(id) => S.document()
					.schemaType('page')
					.documentId(id)
			)
		)
};
