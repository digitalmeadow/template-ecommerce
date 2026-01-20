import { defineField, defineType } from "sanity";

export const meta = defineType({
  type: "object",
  name: "meta",
  fields: [
    defineField({
      type: "string",
      name: "title",
      validation: (Rule) =>
        Rule.max(50).warning("Longer titles may be truncated by search engines"),
    }),
    defineField({
      type: "text",
      name: "description",
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning("Longer descriptions may be truncated by search engines"),
    }),
    defineField({
      type: "image",
      name: "image",
    }),
  ],
});
