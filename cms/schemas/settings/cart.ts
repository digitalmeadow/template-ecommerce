import BasketIcon from "@sanity/icons/Basket";
import { defineField, defineType } from "sanity";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";

export const cart = defineType({
  type: "document",
  name: "cart",
  title: "Cart",
  icon: BasketIcon,
  fields: [
    defineField({
      ...richText(RICH_TEXT_STYLES.default, { required: true }),
      name: "emptyMessage",
    }),
    defineField({
      ...richText(RICH_TEXT_STYLES.default),
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
