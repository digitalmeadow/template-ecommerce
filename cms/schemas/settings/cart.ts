import BasketIcon from "@sanity/icons/Basket";
import { defineField, defineType } from "sanity";
import { RICH_TEXT, richText } from "../fields/richText";

export const cart = defineType({
  type: "document",
  name: "cart",
  icon: BasketIcon,
  fields: [
    defineField({
      ...richText(RICH_TEXT.rich, { required: true }),
      name: "emptyMessage",
    }),
    defineField({
      ...richText(RICH_TEXT.rich),
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
