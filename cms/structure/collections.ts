import { PackageIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";

export const collections = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Collections')
		.icon(PackageIcon)
		.schemaType('collection')
		.child(
			S.documentTypeList('collection').child(
				(id) => S.document()
					.schemaType('collection')
					.documentId(id)
			)
		)
};
