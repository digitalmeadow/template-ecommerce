import ChevronDownIcon from "@sanity/icons/ChevronDown";
import { defineField, defineType } from "sanity";
import { RICH_TEXT_STYLES, richText } from "./richText";

export const accordion = defineType({
  type: "document",
  name: "accordion",
  title: "Accordion",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      description: "For internal use only, e.g. 'All Products: Shipping Information'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "summary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText(RICH_TEXT_STYLES.extended, { required: true }),
      name: "content",
    }),
  ],
});
