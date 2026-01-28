import { defineField, defineType } from "sanity";

export const button = defineType({
  type: "object",
  name: "button",
  title: "Button",
  fields: [
    defineField({
      type: "string",
      name: "label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "link",
      name: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
