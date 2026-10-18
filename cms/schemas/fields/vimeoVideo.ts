import { defineField, defineType } from "sanity";

export const vimeoVideo = defineType({
  type: "object",
  name: "vimeoVideo",
  title: "Vimeo Video",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      type: "url",
      name: "url",
      title: "Vimeo URL",
      description: "Enter the full Vimeo URL (e.g. https://vimeo.com/123456789)",
      // Presence is enforced by media.ts, only when the media is in use.
      validation: (Rule) =>
        Rule.custom((url) =>
          !url || url.includes("vimeo.com") ? true : "Please enter a valid Vimeo URL",
        ),
    }),
  ],
});
