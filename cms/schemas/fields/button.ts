import { defineField, defineType } from "sanity";
import { linkSelection, linkSubtitle } from "../../utils/preview";
import { isEmptyButton, isEmptyLink, requiredInUse } from "../../utils/validation";

export const button = defineType({
  type: "object",
  name: "button",
  title: "Button",
  fields: [
    defineField({
      type: "string",
      name: "label",
      validation: (Rule) => Rule.custom(requiredInUse({ isEmpty: isEmptyButton })),
    }),
    defineField({
      type: "link",
      name: "link",
      // Hidden until there's a label, so an unused button never demands a link.
      hidden: ({ parent }) => !parent?.label,
      validation: (Rule) =>
        Rule.custom(
          requiredInUse({ isEmpty: isEmptyButton, hasValue: (value) => !isEmptyLink(value) }),
        ),
    }),
  ],
  preview: {
    select: { label: "label", ...linkSelection("link.") },
    prepare: ({ label, ...link }) => ({
      title: label || "(no label)",
      subtitle: linkSubtitle(link),
    }),
  },
});
