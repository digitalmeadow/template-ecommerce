import { DocumentsIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";
import { documentEditor } from "./documentEditor";

export const collections = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Collections')
		.icon(DocumentsIcon)
		.schemaType('collection')
		.child(
			S.documentTypeList('collection').child(
				(id) => documentEditor(S, 'collection', id)
			)
		)
};
