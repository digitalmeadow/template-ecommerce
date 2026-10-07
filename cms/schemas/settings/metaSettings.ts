import JsonIcon from "@sanity/icons/Json";
import { defineField, defineType } from "sanity";
import { requireMetaFields } from "../../utils/validation";

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
      // Description falls back to the organisation description; title has no fallback.
      validation: (Rule) => [Rule.required(), requireMetaFields(Rule, ["title"])],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Meta Settings",
      };
    },
  },
});
