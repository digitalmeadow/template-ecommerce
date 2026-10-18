import ComposeIcon from "@sanity/icons/Compose";
import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";
import { defineField, defineType } from "sanity";

export const sectionForm = defineType({
  type: "object",
  name: "sectionForm",
  title: "Section: Form",
  icon: ComposeIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({ type: "string", name: "heading" }),
    defineField({
      type: "reference",
      name: "form",
      description: "The form to render. Manage its fields and submissions under Forms.",
      to: [{ type: "form" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { form: "form.title" },
    prepare({ form }) {
      return {
        title: "Section: Form",
        subtitle: form ?? "No form selected",
      };
    },
  },
});
