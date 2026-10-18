import BellIcon from "@sanity/icons/Bell";
import { defineField, defineType } from "sanity";
import { previewText } from "../../utils/preview";
import { RICH_TEXT_STYLES, richText } from "../fields/richText";

export const announcementBanner = defineType({
  type: "document",
  name: "announcementBanner",
  title: "Announcement Banner",
  icon: BellIcon,
  description:
    "Shown above the header on every page. Visitors who dismiss it see it again once it changes.",
  fields: [
    defineField({
      type: "boolean",
      name: "enabled",
      initialValue: false,
    }),
    defineField({
      ...richText(RICH_TEXT_STYLES.default),
      name: "text",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          (context.document as { enabled?: boolean } | undefined)?.enabled && !value?.length
            ? "Required while the banner is enabled"
            : true,
        ),
    }),
  ],
  preview: {
    select: { enabled: "enabled", text: "text" },
    prepare({ enabled, text }) {
      return {
        title: "Announcement Banner",
        subtitle: enabled ? previewText(text) || "Enabled" : "Disabled",
      };
    },
  },
});
