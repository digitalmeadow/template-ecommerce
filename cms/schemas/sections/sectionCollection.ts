import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";
import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";

export const sectionCollection = defineType({
  type: "object",
  name: "sectionCollection",
  title: "Section: Collection",
  icon: BlockElementIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({
      type: "reference",
      name: "collection",
      to: [{ type: "collection" }],
      validation: (Rule) => Rule.required(),
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
