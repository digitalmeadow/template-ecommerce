import TextIcon from "@sanity/icons/Text";
import { defineArrayMember, defineField, defineType } from "sanity";
import { validateSlugId } from "../../utils/validation";

const OPTION_TYPES = ["select", "checkboxGroup", "radioGroup"];

// Read through this, not `Rule.skip()`, which leaves array fields unnormalised and crashes the input.
const fieldType = (context: { parent?: unknown }) =>
  (context.parent as { type?: string } | undefined)?.type;

export const formField = defineType({
  type: "object",
  name: "formField",
  title: "Form Field",
  icon: TextIcon,
  fields: [
    defineField({
      type: "string",
      name: "label",
      description: "Used to label the answer in submissions.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "name",
      title: "Field name",
      description:
        "Internal identifier, unique within this form. Changing it will not affect existing submissions.",
      validation: (Rule) => validateSlugId(Rule.required()),
    }),
    defineField({
      type: "string",
      name: "type",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "tel" },
          { title: "Long text", value: "textarea" },
          { title: "Dropdown", value: "select" },
          { title: "Checkbox group", value: "checkboxGroup" },
          { title: "Inline choice", value: "radioGroup" },
          { title: "File upload", value: "file" },
          { title: "File upload (multiple)", value: "files" },
        ],
        layout: "dropdown",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "placeholder",
      hidden: ({ parent }) => OPTION_TYPES.includes(parent?.type),
    }),
    defineField({
      type: "array",
      name: "options",
      description: "The choices offered to the visitor.",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ parent }) => !OPTION_TYPES.includes(parent?.type),
      validation: (Rule) =>
        Rule.custom((value: string[] | undefined, context) => {
          if (!OPTION_TYPES.includes(fieldType(context) ?? "")) return true;
          return value?.length ? true : "At least one option is required.";
        }),
    }),
    defineField({
      type: "boolean",
      name: "required",
      initialValue: true,
    }),
    defineField({
      type: "string",
      name: "width",
      description: "Half-width fields sit side by side on desktop.",
      options: {
        list: [
          { title: "Full width", value: "full" },
          { title: "Half width", value: "half" },
        ],
        layout: "dropdown",
      },
      initialValue: "full",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { label: "label", type: "type", required: "required" },
    prepare({ label, type, required }) {
      return {
        title: label,
        subtitle: `${type}${required ? " · required" : ""}`,
      };
    },
  },
});
