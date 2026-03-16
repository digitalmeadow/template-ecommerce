import { JsonIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const metaSettings = defineType({
  type: "document",
  name: "metaSettings",
  icon: JsonIcon,
  fields: [
    defineField({
      type: "meta",
      name: "meta",
      description:
        "Default meta tags for the website. These can be overridden on a per-page basis.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
