import SplitHorizontalIcon from "@sanity/icons/SplitHorizontal";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pluralize } from "../../utils/preview";
import { colorSchemeField } from "../fields/colorScheme";
import { sectionIdField } from "../fields/sectionId";

export const sectionTabs = defineType({
  type: "object",
  name: "sectionTabs",
  title: "Section: Tabs",
  icon: SplitHorizontalIcon,
  fields: [
    colorSchemeField,
    sectionIdField,
    defineField({
      type: "array",
      name: "tabItems",
      of: [defineArrayMember({ type: "tabItem" })],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { tabItems: "tabItems" },
    prepare({ tabItems }) {
      return {
        title: "Section: Tabs",
        subtitle: pluralize("tab", tabItems?.length ?? 0),
      };
    },
  },
});
