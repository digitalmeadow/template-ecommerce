import ChevronDownIcon from "@sanity/icons/ChevronDown";
import EnvelopeIcon from "@sanity/icons/Envelope";
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
          S.listItem()
            .title("Form Submissions")
            .icon(EnvelopeIcon)
            .child(
              S.documentTypeList("formSubmission")
                .title("Form Submissions")
                .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
            ),
          S.documentTypeListItem("accordion").title("Accordions").icon(ChevronDownIcon),
        ]),
    );
