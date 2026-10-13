import { defineField, defineType } from "sanity";
import { mediaSelection, previewMedia } from "../../utils/preview";
import { isEmptyMedia, requiredInUse } from "../../utils/validation";

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
      validation: (Rule) => Rule.custom(requiredInUse({ isEmpty: isEmptyMedia })),
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
        Rule.custom(
          requiredInUse({
            isEmpty: isEmptyMedia,
            hasValue: (value) => !!(value as { asset?: unknown } | undefined)?.asset,
            message: "Image required",
          }),
        ),
    }),
    defineField({
      type: "mux.video",
      name: "video",
      hidden: ({ parent }) => parent?.type !== "video",
      validation: (Rule) =>
        Rule.custom(requiredInUse({ isEmpty: isEmptyMedia, message: "Video required" })),
    }),
    defineField({
      type: "vimeoVideo",
      name: "vimeo",
      hidden: ({ parent }) => parent?.type !== "vimeo",
      validation: (Rule) =>
        Rule.custom(
          requiredInUse({
            isEmpty: isEmptyMedia,
            hasValue: (value) => !!(value as { url?: string } | undefined)?.url,
            message: "Video required",
          }),
        ),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
  preview: {
    select: mediaSelection(),
    prepare: (selection) => ({ title: selection.mediaType, media: previewMedia(selection) }),
  },
});
