import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { validateSlugId } from "../../utils/validation";

export const sectionCollection = defineType({
  type: "object",
  name: "sectionCollection",
  title: "Section: Collection",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      validation: (Rule) => validateSlugId(Rule),
    }),
    defineField({
      type: "reference",
      name: "collection",
      to: [{ type: "collection" }],
    }),
  ],
  preview: {
    select: {
      subtitle: "collection.shopify.title",
    },
    prepare({ subtitle }) {
      return {
        title: "Section: Collection",
        subtitle,
      };
    },
  },
});
