import { defineField, defineType } from "sanity";
import { isEmptyButton, isEmptyLink } from "../../utils/validation";

export const button = defineType({
  type: "object",
  name: "button",
  title: "Button",
  fields: [
    defineField({
      type: "string",
      name: "label",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.hidden || isEmptyButton(context.parent) || value ? true : "Required",
        ),
    }),
    defineField({
      type: "link",
      name: "link",
      // Hidden until there's a label, so an unused button never demands a link.
      hidden: ({ parent }) => !parent?.label,
      validation: (Rule) =>
        Rule.custom((value, context) =>
          context.hidden || isEmptyButton(context.parent) || !isEmptyLink(value) ? true : "Required",
        ),
    }),
  ],
});
