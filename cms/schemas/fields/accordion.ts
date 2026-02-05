import { defineField, defineType } from "sanity";

export const accordion = defineType({
  type: "object",
  name: "accordion",
  title: "Accordion",
  fields: [
    defineField({
      type: "string",
      name: "summary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "textRich",
      name: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
