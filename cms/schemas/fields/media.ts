import { defineField, defineType } from "sanity";
import { isEmptyMedia } from "../../utils/validation";

const mediaType = (context: { parent?: unknown }) =>
  (context.parent as { type?: string } | undefined)?.type;

export const media = defineType({
  type: "object",
  name: "media",
  fields: [
    defineField({
      type: "string",
      name: "type",
      title: "Type",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video (Mux)", value: "video" },
          { title: "Video (Vimeo)", value: "vimeo" },
        ],
        layout: "dropdown",
      },
      initialValue: "image",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden && !isEmptyMedia(context.parent) && !value ? "Required" : true,
        ),
    }),
    defineField({
      type: "image",
      name: "image",
      hidden: ({ parent }) => parent?.type !== "image",
      options: {
        hotspot: true,
      },
      // Only nags once the object carries something; an untouched field is just unused.
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden &&
          !isEmptyMedia(context.parent) &&
          mediaType(context) === "image" &&
          !value?.asset
            ? "Image required"
            : true,
        ),
    }),
    defineField({
      type: "mux.video",
      name: "video",
      hidden: ({ parent }) => parent?.type !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden &&
          !isEmptyMedia(context.parent) &&
          mediaType(context) === "video" &&
          !value
            ? "Video required"
            : true,
        ),
    }),
    defineField({
      type: "vimeoVideo",
      name: "vimeo",
      hidden: ({ parent }) => parent?.type !== "vimeo",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden &&
          !isEmptyMedia(context.parent) &&
          mediaType(context) === "vimeo" &&
          !(value as { url?: string })?.url
            ? "Video required"
            : true,
        ),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
});
