import ComposeIcon from "@sanity/icons/Compose";
import { StructureBuilder } from "sanity/structure";

export const forms = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Forms')
		.icon(ComposeIcon)
		.schemaType('form')
		.child(
			S.documentTypeList('form').child(
				(id) => S.document()
					.schemaType('form')
					.documentId(id)
			)
		)
};
