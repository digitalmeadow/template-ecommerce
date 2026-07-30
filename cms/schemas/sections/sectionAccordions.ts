import { defineArrayMember, defineField, defineType } from "sanity";
import DoubleChevronDownIcon from "@sanity/icons/DoubleChevronDown";
import { validateSlugId } from "../../utils/validation";

export const sectionAccordions = defineType({
  type: "object",
  name: "sectionAccordions",
  title: "Section: Accordions",
  icon: DoubleChevronDownIcon,
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      validation: (Rule) => validateSlugId(Rule),
    }),
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
