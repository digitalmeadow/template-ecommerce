import ChevronDownIcon from "@sanity/icons/ChevronDown";
import { defineField, defineType } from "sanity";
import { richText } from "./richText";

export const tabItem = defineType({
  type: "object",
  name: "tabItem",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText({ headings: true, lists: true, italic: true, strong: true, link: true }),
      name: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "media",
      name: "media",
    }),
  ],
});
