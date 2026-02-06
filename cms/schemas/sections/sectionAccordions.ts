import { defineArrayMember, defineField, defineType } from "sanity";
import { DoubleChevronDownIcon } from "@sanity/icons";

export const sectionAccordions = defineType({
  type: "object",
  name: "sectionAccordions",
  title: "Section: Accordions",
  icon: DoubleChevronDownIcon,
  fields: [
    defineField({
      type: "array",
      name: "accordions",
      of: [defineArrayMember({ type: "reference", to: { type: "accordion" } })],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Section: Accordions",
      };
    },
  },
});
