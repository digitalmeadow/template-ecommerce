import { BasketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const cart = defineType({
  type: "document",
  name: "cart",
  icon: BasketIcon,
  fields: [
    defineField({
      type: "textRich",
      name: "emptyMessage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "textRich",
      name: "note",
    }),
  ],
});
