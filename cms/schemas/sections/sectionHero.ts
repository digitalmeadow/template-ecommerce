import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { previewMedia } from "../../utils/preview";
import { validateSlugId } from "../../utils/validation";
import { richText } from "../fields/richText";

export const sectionHero = defineType({
  type: "object",
  name: "sectionHero",
  title: "Section: Hero",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      validation: (Rule) => validateSlugId(Rule),
    }),
    defineField({
      type: "media",
      name: "backgroundMedia",
    }),
    defineField({
      type: "string",
      name: "heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText({ italic: true, strong: true, link: true }),
      name: "text",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      media: "backgroundMedia",
    },
    prepare({ heading, media }) {
      return {
        title: "Section: Hero",
        subtitle: heading,
        media: previewMedia(media),
      };
    },
  },
});
