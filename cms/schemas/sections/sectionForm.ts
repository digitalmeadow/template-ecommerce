import ComposeIcon from "@sanity/icons/Compose";
import { defineField, defineType } from "sanity";
import { validateSlugId } from "../../utils/validation";

export const sectionForm = defineType({
  type: "object",
  name: "sectionForm",
  title: "Section: Form",
  icon: ComposeIcon,
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      description: "Optional. Used as an anchor so links can scroll directly to this section.",
      validation: validateSlugId,
    }),
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
    select: { title: "heading", form: "form.title" },
    prepare({ title, form }) {
      return {
        title: title || "Section: Form",
        subtitle: form ? `Form: ${form}` : "No form selected",
      };
    },
  },
});
