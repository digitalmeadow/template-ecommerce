import ChevronDownIcon from "@sanity/icons/ChevronDown";
import ComposeIcon from "@sanity/icons/Compose";
import ProjectsIcon from "@sanity/icons/Projects";
import { StructureBuilder } from "sanity/structure";

// Content written once and referenced from many places.
export const library = (S: StructureBuilder) =>
  S.listItem()
    .title("Library")
    .icon(ProjectsIcon)
    .child(
      S.list()
        .title("Library")
        .items([
          S.documentTypeListItem("form").title("Forms").icon(ComposeIcon),
          S.documentTypeListItem("accordion").title("Accordions").icon(ChevronDownIcon),
        ]),
    );
