import { BlockElementIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  type: "document",
  name: "footer",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "textRich",
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
});
