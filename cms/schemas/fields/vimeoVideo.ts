import { defineField, defineType } from "sanity";

export const vimeoVideo = defineType({
  type: "object",
  name: "vimeoVideo",
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      type: "url",
      name: "url",
      title: "Vimeo URL",
      description: "Enter the full Vimeo URL (e.g., https://vimeo.com/123456789)",
      validation: (Rule) =>
        Rule.custom((url, context) => {
          if (context.hidden) return true;
          if (!url) return "Video URL is required";
          if (!url.includes("vimeo.com")) return "Please enter a valid Vimeo URL";
          return true;
        }),
    }),
  ],
});
