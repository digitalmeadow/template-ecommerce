import ChevronDownIcon from "@sanity/icons/ChevronDown";
import { defineField, defineType } from "sanity";
import { richText } from "./richText";

export const accordion = defineType({
  type: "document",
  name: "accordion",
  title: "Accordion",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      description: "For internal use only eg: 'All Products: Shipping Information'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "summary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText({ headings: true, lists: true, italic: true, strong: true, link: true }),
      name: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
