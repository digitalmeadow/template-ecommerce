import BlockElementIcon from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";
import { RICH_TEXT, richText } from "../fields/richText";
import { requiredMedia } from "../../utils/validation";

export const footer = defineType({
  type: "document",
  name: "footer",
  icon: BlockElementIcon,
  fields: [
    defineField({
      ...richText(RICH_TEXT.rich),
      name: "text",
    }),
    defineField({
      type: "array",
      name: "navigationItems",
      of: [defineArrayMember({ type: "button" })],
    }),
    defineField({
      type: "media",
      name: "mediaBackground",
      validation: (Rule) => Rule.required().custom(requiredMedia),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer",
      };
    },
  },
});
