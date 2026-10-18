import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";
import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { mediaSelection, previewMedia } from "../../utils/preview";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";

export const sectionHero = defineType({
  type: "object",
  name: "sectionHero",
  title: "Section: Hero",
  icon: BlockElementIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({
      type: "media",
      name: "mediaBackground",
    }),
    defineField({
      type: "string",
      name: "heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richText(RICH_TEXT_STYLES.default),
      name: "text",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      ...mediaSelection("mediaBackground."),
    },
    prepare({ heading, ...media }) {
      return {
        title: "Section: Hero",
        subtitle: heading,
        media: previewMedia(media),
      };
    },
  },
});
