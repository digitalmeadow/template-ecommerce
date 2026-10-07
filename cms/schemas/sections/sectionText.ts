import { defineField, defineType } from "sanity";
import BlockElementIcon from "@sanity/icons/BlockElement";
import { previewPortableText } from "../../utils/preview";
import { validateSlugId } from "../../utils/validation";
import { richText } from "../fields/richText";

export const sectionText = defineType({
  type: "object",
  name: "sectionText",
  title: "Section: Text",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      validation: (Rule) => validateSlugId(Rule),
    }),
    defineField({
      ...richText({ headings: true, lists: true, italic: true, strong: true, link: true, images: true }),
      name: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: "text",
    },
    prepare({ text }) {
      return {
        title: "Section: Text",
        subtitle: previewPortableText(text),
      };
    },
  },
});
