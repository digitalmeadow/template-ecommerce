import { colorSchemeField } from "../fields/colorScheme";
import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { previewText } from "../../utils/preview";
import { validateSlugId } from "../../utils/validation";
import { RICH_TEXT, richText } from "../fields/richText";

export const sectionText = defineType({
  type: "object",
  name: "sectionText",
  title: "Section: Text",
  icon: BlockElementIcon,
  fields: [
    colorSchemeField,
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      validation: (Rule) => validateSlugId(Rule),
    }),
    defineField({
      ...richText(RICH_TEXT.longform, { required: true }),
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
