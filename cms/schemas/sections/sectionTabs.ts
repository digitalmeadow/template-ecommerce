import { colorSchemeField } from "../fields/colorScheme";
import { defineArrayMember, defineField, defineType } from "sanity";
import DoubleChevronDownIcon from "@sanity/icons/DoubleChevronDown";
import { validateSlugId } from "../../utils/validation";

export const sectionTabs = defineType({
  type: "object",
  name: "sectionTabs",
  title: "Section: Tabs",
  icon: DoubleChevronDownIcon,
  fields: [
    colorSchemeField,
    defineField({
      type: "string",
      name: "id",
      title: "Section ID",
      description: "Optional. Used as an anchor so links can scroll directly to this section.",
      validation: validateSlugId,
    }),
    defineField({
      type: "array",
      name: "tabItems",
      of: [defineArrayMember({ type: "tabItem" })],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Section: Tabs",
      };
    },
  },
});
