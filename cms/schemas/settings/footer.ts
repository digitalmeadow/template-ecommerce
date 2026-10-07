import BlockElementIcon from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";
import { richText } from "../fields/richText";

export const footer = defineType({
  type: "document",
  name: "footer",
  icon: BlockElementIcon,
  fields: [
    defineField({
      ...richText({ italic: true, strong: true, link: true }),
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
      validation: (Rule) => Rule.required(),
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
