import { defineField, defineType } from "sanity";

export const shopifyProductVariant = defineType({
  type: "object",
  name: "shopifyProductVariant",
  title: "Shopify Product Variant",
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
      type: "string",
      name: "sku",
      title: "SKU",
    }),
    defineField({
      type: "string",
      name: "productId",
      title: "Product ID",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
