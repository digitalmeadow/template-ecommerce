import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { pageSections } from "../sections/sections";

export const page = defineType({
  type: "document",
  name: "page",
  icon: DocumentIcon,
  fields: [
    defineField({
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "array",
      name: "sections",
      of: pageSections,
    }),
    defineField({
      type: "meta",
      name: "meta",
    }),
  ],
});
