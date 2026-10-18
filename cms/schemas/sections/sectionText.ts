import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";
import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { previewText } from "../../utils/preview";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";

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
