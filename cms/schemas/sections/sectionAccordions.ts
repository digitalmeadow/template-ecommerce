import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";
import { pluralize } from "../../utils/preview";
import { defineArrayMember, defineField, defineType } from "sanity";
import DoubleChevronDownIcon from "@sanity/icons/DoubleChevronDown";

export const sectionAccordions = defineType({
  type: "object",
  name: "sectionAccordions",
  title: "Section: Accordions",
  icon: DoubleChevronDownIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({
      type: "array",
      name: "accordions",
      of: [defineArrayMember({ type: "reference", to: [{ type: "accordion" }] })],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { accordions: "accordions" },
    prepare({ accordions }) {
      return {
        title: "Section: Accordions",
        subtitle: pluralize("accordion", accordions?.length ?? 0),
      };
    },
  },
});
