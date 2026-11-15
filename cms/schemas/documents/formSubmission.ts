import EnvelopeIcon from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

// Written by the website's form endpoint (`/api/forms`), never by editors.
export const formSubmission = defineType({
  type: "document",
  name: "formSubmission",
  title: "Form Submission",
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({ type: "reference", name: "form", to: [{ type: "form" }] }),
    defineField({ type: "datetime", name: "submittedAt" }),
    defineField({
      type: "array",
      name: "answers",
      of: [defineArrayMember({ type: "formAnswer" })],
    }),
    defineField({
      type: "array",
      name: "files",
      of: [defineArrayMember({ type: "file" })],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { formTitle: "form.title", submittedAt: "submittedAt", firstAnswer: "answers.0.value" },
    prepare({ formTitle, submittedAt, firstAnswer }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleString() : "";
      return {
        title: firstAnswer || formTitle || "Submission",
        subtitle: [formTitle, date].filter(Boolean).join(" · "),
      };
    },
  },
});
