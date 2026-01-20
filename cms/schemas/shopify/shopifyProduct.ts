import { defineField, defineType } from "sanity";

export const shopifyProduct = defineType({
  type: "object",
  name: "shopifyProduct",
  title: "Shopify Product",
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "ID",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "slug",
      name: "handle",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "status",
      options: {
        layout: "dropdown",
        list: ["active", "archived", "draft", "unknown"],
      },
    }),
  ],
});
