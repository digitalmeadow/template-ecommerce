import LinkIcon from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";
import { LINKABLE_DOCUMENT_TYPES } from "../../config";
import { linkSelection, linkSubtitle } from "../../utils/preview";
import { requiredInUse, validateSlugId } from "../../utils/validation";

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
      validation: (Rule, context) => (context?.hidden ? Rule.skip() : Rule.required()),
    }),

    // Page
    defineField({
      type: "reference",
      name: "page",
      weak: true,
      to: LINKABLE_DOCUMENT_TYPES.map((navigatable) => ({ type: navigatable })),
      validation: (Rule) => Rule.custom(requiredInUse({ message: "Reference required" })),
      hidden: ({ parent }) => parent?.type != "page",
    }),

    // URL
    defineField({
      type: "url",
      name: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: true }).custom(
          requiredInUse({ message: "HREF required" }),
        ),
      hidden: ({ parent }) => parent?.type != "url",
    }),

    // Section
    defineField({
      type: "string",
      name: "section",
      title: "Section ID",
      description:
        "The section anchor to scroll to. Required for Section links; optional for Page links, to land on a specific section after navigating.",
      validation: (Rule) =>
        validateSlugId(Rule).custom((value, context) => {
          if (context.hidden) return true;
          const parentType = (context.parent as { type?: string })?.type;
          return parentType === "section" && !value ? "Section required" : true;
        }),
      hidden: ({ parent }) => parent?.type != "section" && parent?.type != "page",
    }),

    // Email
    defineField({
      type: "email",
      name: "email",
      validation: (Rule) => Rule.custom(requiredInUse({ message: "Email required" })),
      hidden: ({ parent }) => parent?.type != "email",
    }),

    // Phone
    defineField({
      type: "string",
      name: "phone",
      validation: (Rule) => Rule.custom(requiredInUse({ message: "Phone number required" })),
      hidden: ({ parent }) => parent?.type != "phone",
    }),

    // File
    defineField({
      type: "file",
      name: "file",
      validation: (Rule) => Rule.custom(requiredInUse({ message: "File required" })),
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
  preview: {
    select: linkSelection(),
    prepare: (link) => ({ title: link.linkType ?? "No link", subtitle: linkSubtitle(link) }),
  },
});
