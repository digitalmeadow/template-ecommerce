import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import { previewPortableText } from "../../utils/preview";

export const sectionText = defineType({
  type: "object",
  name: "sectionText",
  title: "Section: Text",
  icon: BlockElementIcon,
  fields: [
    defineField({
      type: "textRich",
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
