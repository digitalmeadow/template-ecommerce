import ThListIcon from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

type FieldValue = { label?: string };

export const formGroup = defineType({
  type: "object",
  name: "formGroup",
  title: "Field Group",
  icon: ThListIcon,
  fields: [
    defineField({
      type: "string",
      name: "heading",
      description: "Optional. Leave blank to group fields without a visible heading.",
    }),
    defineField({
      type: "array",
      name: "fields",
      of: [defineArrayMember({ type: "formField" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { heading: "heading", fields: "fields" },
    prepare({ heading, fields }) {
      const entries: FieldValue[] = fields ?? [];

      return {
        title: heading || "Untitled group",
        subtitle: entries.map((field) => field?.label).filter(Boolean).join(" · "),
      };
    },
  },
});
