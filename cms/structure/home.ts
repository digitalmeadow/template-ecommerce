import HomeIcon from "@sanity/icons/Home";
import { StructureBuilder } from "sanity/structure";

export const home = (S: StructureBuilder) => {
  return S.listItem()
    .title("Home")
    .icon(HomeIcon)
    .schemaType("home")
    .child(() => S.document().schemaType("home").documentId("home"));
};
