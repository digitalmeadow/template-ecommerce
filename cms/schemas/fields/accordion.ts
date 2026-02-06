import { ChevronDownIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
      type: "textRich",
      name: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
