import { defineField, defineType } from "sanity";

// One answer in a form submission, labelled as the form read when it was sent.
export const formAnswer = defineType({
  type: "object",
  name: "formAnswer",
  title: "Answer",
  fields: [
    defineField({ type: "string", name: "label" }),
    defineField({ type: "string", name: "name", title: "Field name" }),
    defineField({ type: "text", name: "value", rows: 3 }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
