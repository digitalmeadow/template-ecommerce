import { defineType } from "sanity";
import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";
import { LINKABLE_DOCUMENT_TYPES } from "../../config";

export const link = defineType({
  type: "object",
  icon: LinkIcon,
  name: "link",
  fields: [
    defineField({
      type: "string",
      name: "type",
      options: {
        list: ["page", "url", "section", "email", "phone", "file"],
      },
      initialValue: "page",
      validation: (R) => R.required(),
    }),

    // Page
    defineField({
      type: "reference",
      name: "page",
      weak: true,
      to: LINKABLE_DOCUMENT_TYPES.map((navigatable) => ({ type: navigatable })),
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "page") return true;
          if (!value) return "Reference required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "page",
    }),

    // URL
    defineField({
      type: "url",
      name: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
          allowRelative: true,
        }).custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "url") return true;
          if (!value) return "HREF required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "url",
    }),

    // Section
    defineField({
      type: "string",
      name: "section",
      title: "Section ID",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "section") return true;
          if (!value) return "Section required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "section",
    }),

    // Email
    defineField({
      type: "email",
      name: "email",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "email") return true;
          if (!value) return "Email required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "email",
    }),

    // Phone
    defineField({
      type: "string",
      name: "phone",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "phone") return true;
          if (!value) return "Phone number required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "phone",
    }),

    // File
    defineField({
      type: "file",
      name: "file",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "file") return true;
          if (!value) return "File required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "file",
    }),

    // Options
    defineField({
      type: "boolean",
      name: "newTab",
      title: "Open in new tab",
      initialValue: true,
      hidden: ({ parent }) => parent?.type != "page" || parent?.type != "url",
    }),
  ],
  options: { collapsible: true, collapsed: false },
});
