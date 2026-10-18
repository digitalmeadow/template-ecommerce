import DocumentIcon from "@sanity/icons/Document";
import { defineField, defineType } from "sanity";
import { pluralize } from "../../utils/preview";
import { pageSections } from "../sections/sections";

export const page = defineType({
  type: "document",
  name: "page",
  title: "Page",
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
  preview: {
    select: { title: "title", slug: "slug.current", sections: "sections" },
    prepare({ title, slug, sections }) {
      return {
        title,
        subtitle: [slug && `/${slug}`, pluralize("section", sections?.length ?? 0)]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
