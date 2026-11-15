import BlockElementIcon from "@sanity/icons/BlockElement";
import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  type: "document",
  name: "footer",
  title: "Footer",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "array",
      name: "navigationItems",
      of: [defineArrayMember({ type: "button" })],
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
