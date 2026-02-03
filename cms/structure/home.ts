import { HomeIcon } from "@sanity/icons";
import { StructureBuilder } from "sanity/structure";

export const home = (S: StructureBuilder) => {
  // prettier-ignore
  return S.listItem()
		.title('Home')
		.icon(HomeIcon)
		.child(
			() => S.document()
				.schemaType('home')
				.documentId('home')
		)
};
