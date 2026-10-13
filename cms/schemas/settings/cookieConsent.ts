import LockIcon from "@sanity/icons/Lock";
import { defineField, defineType } from "sanity";
import { RICH_TEXT, richText } from "../fields/richText";

export const cookieConsent = defineType({
  type: "document",
  name: "cookieConsent",
  title: "Cookie Consent",
  icon: LockIcon,
  description: "Analytics load only after a visitor accepts.",
  fields: [
    defineField({
      ...richText(RICH_TEXT.rich, { required: true }),
      name: "message",
      description: "Link to the privacy policy from here.",
    }),
    defineField({
      type: "string",
      name: "acceptLabel",
      initialValue: "Accept",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "declineLabel",
      initialValue: "Decline",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Cookie Consent",
      };
    },
  },
});
