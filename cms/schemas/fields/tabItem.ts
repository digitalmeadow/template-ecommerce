import ChevronDownIcon from "@sanity/icons/ChevronDown";
import { defineField, defineType } from "sanity";
import { RICH_TEXT_STYLES, richText } from "./richText";

export const tabItem = defineType({
  type: "object",
  name: "tabItem",
  title: "Tab",
  icon: ChevronDownIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText(RICH_TEXT_STYLES.extended, { required: true }),
      name: "content",
    }),
    defineField({
      type: "media",
      name: "media",
    }),
  ],
});
