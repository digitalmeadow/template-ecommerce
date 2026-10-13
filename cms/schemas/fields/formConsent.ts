import CheckmarkIcon from "@sanity/icons/Checkmark";
import { defineField, defineType } from "sanity";
import { validateSlugId } from "../../utils/validation";
import { RICH_TEXT, richText } from "./richText";

// Terms sit below the submit rather than in a group, so no width/placeholder/options.
export const formConsent = defineType({
  type: "object",
  name: "formConsent",
  title: "Consent Checkbox",
  icon: CheckmarkIcon,
  fields: [
    defineField({
      type: "string",
      name: "label",
      description: "Used to label the answer in submissions, e.g. 'Privacy consent'.",
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
      ...richText(RICH_TEXT.prose, { required: true }),
      name: "statement",
      description: "The wording beside the checkbox. Link out to policies from here.",
    }),
    defineField({
      type: "boolean",
      name: "required",
      description: "Must be ticked before the form can be submitted.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { label: "label", required: "required" },
    prepare({ label, required }) {
      return { title: label, subtitle: required ? "required" : "optional" };
    },
  },
});
