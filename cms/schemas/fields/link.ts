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
        list: ["internal", "external", "anchor", "email", "phone", "file"],
      },
      validation: (R) => R.required(),
    }),

    // Internal
    defineField({
      type: "reference",
      name: "reference",
      weak: true,
      to: LINKABLE_DOCUMENT_TYPES.map((navigatable) => ({ type: navigatable })),
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "internal") return true;
          if (!value) return "Reference required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "internal",
    }),

    // External
    defineField({
      type: "url",
      name: "href",
      title: "HREF",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
          allowRelative: true,
        }).custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "external") return true;
          if (!value) return "HREF required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "external",
    }),

    // Anchor
    defineField({
      type: "string",
      name: "anchor",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          // @ts-expect-error
          if (parent.type != "anchor") return true;
          if (!value) return "Anchor required";
          return true;
        }),
      hidden: ({ parent }) => parent?.type != "anchor",
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
  ],
  options: { collapsible: true, collapsed: false },
});
