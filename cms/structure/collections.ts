import PackageIcon from "@sanity/icons/Package";
import { StructureBuilder } from "sanity/structure";

export const collections = (S: StructureBuilder) => {
  return S.listItem()
    .title("Collections")
    .icon(PackageIcon)
    .schemaType("collection")
    .child(
      S.documentTypeList("collection").child((id) =>
        S.document().schemaType("collection").documentId(id),
      ),
    );
};
