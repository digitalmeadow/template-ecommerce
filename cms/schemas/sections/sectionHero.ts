import BlockElementIcon from "@sanity/icons/BlockElement";
import { defineField, defineType } from "sanity";
import { mediaSelection, previewMedia } from "../../utils/preview";
import { colorSchemeField } from "../fields/colorScheme";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";
import { sectionIdField } from "../fields/sectionId";

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
