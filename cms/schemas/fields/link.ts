import { defineType } from "sanity";
import LinkIcon from "@sanity/icons/Link";
import { defineField } from "sanity";
import { LINKABLE_DOCUMENT_TYPES } from "../../config";
import { validateSlugId } from "../../utils/validation";

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
      validation: (Rule, context) => (context?.hidden ? Rule.skip() : Rule.required()),
    }),

    // Page
    defineField({
      type: "reference",
      name: "page",
      weak: true,
      to: LINKABLE_DOCUMENT_TYPES.map((navigatable) => ({ type: navigatable })),
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden && (context.parent as { type?: string })?.type === "page" && !value
            ? "Reference required"
            : true,
        ),
      hidden: ({ parent }) => parent?.type != "page",
    }),

    // URL
    defineField({
      type: "url",
      name: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: true }).custom((value, context) =>
          !context.hidden && (context.parent as { type?: string })?.type === "url" && !value
            ? "HREF required"
            : true,
        ),
      hidden: ({ parent }) => parent?.type != "url",
    }),

    // Section
    defineField({
      type: "string",
      name: "section",
      title: "Section ID",
      description: "Section ID to scroll to",
      validation: (Rule) => validateSlugId(Rule),
      hidden: ({ parent }) => parent?.type != "section",
    }),

    // Email
    defineField({
      type: "email",
      name: "email",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden && (context.parent as { type?: string })?.type === "email" && !value
            ? "Email required"
            : true,
        ),
      hidden: ({ parent }) => parent?.type != "email",
    }),

    // Phone
    defineField({
      type: "string",
      name: "phone",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden && (context.parent as { type?: string })?.type === "phone" && !value
            ? "Phone number required"
            : true,
        ),
      hidden: ({ parent }) => parent?.type != "phone",
    }),

    // File
    defineField({
      type: "file",
      name: "file",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          !context.hidden && (context.parent as { type?: string })?.type === "file" && !value
            ? "File required"
            : true,
        ),
      hidden: ({ parent }) => parent?.type != "file",
    }),

    // Options
    defineField({
      type: "boolean",
      name: "newTab",
      title: "Open in new tab",
      initialValue: false,
      hidden: ({ parent }) => parent?.type != "page" && parent?.type != "url",
    }),
  ],
  options: { collapsible: true, collapsed: false },
});
