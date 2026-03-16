import { defineField, defineType } from "sanity";

export const shopifyCollection = defineType({
  type: "object",
  name: "shopifyCollection",
  title: "Shopify Collection",
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
  ],
});
