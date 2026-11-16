import BlockElementIcon from "@sanity/icons/BlockElement";
import { defineField, defineType } from "sanity";
import { previewText } from "../../utils/preview";
import { colorSchemeField } from "../fields/colorScheme";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";
import { sectionIdField } from "../fields/sectionId";

export const sectionText = defineType({
  type: "object",
  name: "sectionText",
  title: "Section: Text",
  icon: BlockElementIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({
      ...richText(RICH_TEXT_STYLES.full, { required: true }),
      name: "text",
    }),
  ],
  preview: {
    select: {
      text: "text",
    },
    prepare({ text }) {
      return {
        title: "Section: Text",
        subtitle: previewText(text),
      };
    },
  },
});
