import BasketIcon from "@sanity/icons/Basket";
import { defineField, defineType } from "sanity";
import { richText } from "../fields/richText";

export const cart = defineType({
  type: "document",
  name: "cart",
  icon: BasketIcon,
  fields: [
    defineField({
      ...richText({ italic: true, strong: true, link: true }),
      name: "emptyMessage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText({ italic: true, strong: true, link: true }),
      name: "note",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Cart",
      };
    },
  },
});
