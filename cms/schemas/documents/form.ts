import ClipboardIcon from "@sanity/icons/Clipboard";
import { defineArrayMember, defineField, defineType } from "sanity";
import { RICH_TEXT, richText } from "../fields/richText";

type FieldValue = { name?: string; type?: string };
type GroupValue = { fields?: FieldValue[] };

// Caps the request size, not the document shape.
const MAX_FILE_FIELDS = 4;

const flatten = (groups: GroupValue[]) => groups.flatMap((group) => group?.fields ?? []);

export const form = defineType({
  type: "document",
  name: "form",
  title: "Form",
  icon: ClipboardIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      description: "Internal name for this form, e.g. 'Careers'.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "array",
      name: "groups",
      description: "Fields are rendered group by group, each under its optional heading.",
      of: [defineArrayMember({ type: "formGroup" })],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((groups: GroupValue[] | undefined, context) => {
            if (!groups) return true;

            const fields = flatten(groups);
            const terms = (context.document?.terms ?? []) as FieldValue[];

            const names = [...fields, ...terms].map((field) => field?.name).filter(Boolean);
            const duplicate = names.find((name, index) => names.indexOf(name) !== index);
            if (duplicate) return `Duplicate field name "${duplicate}".`;

            const fileFields = fields.filter(
              (field) => field?.type === "file" || field?.type === "files",
            );
            if (fileFields.length > MAX_FILE_FIELDS) {
              return `Only ${MAX_FILE_FIELDS} file upload fields are supported per form.`;
            }

            return true;
          }),
    }),
    defineField({
      type: "array",
      name: "terms",
      description: "Consent checkboxes, rendered below the submit button.",
      of: [defineArrayMember({ type: "formConsent" })],
    }),
    defineField({
      type: "string",
      name: "submitLabel",
      initialValue: "Submit",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText(RICH_TEXT.rich, { required: true }),
      name: "successMessage",
      description: "Shown below the form once it has been submitted.",
      initialValue: [
        {
          _type: "block",
          _key: "successMessage",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "successMessage0",
              text: "Thanks — we'll be in touch.",
              marks: [],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", groups: "groups" },
    prepare({ title, groups }) {
      return {
        title,
        subtitle: `${flatten(groups ?? []).length} fields`,
      };
    },
  },
});
