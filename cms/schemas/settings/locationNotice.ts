import EarthAmericasIcon from "@sanity/icons/EarthAmericas";
import { defineField, defineType } from "sanity";

const MARKET_TOKEN = "{market}";

export const locationNotice = defineType({
  type: "document",
  name: "locationNotice",
  title: "Location Notice",
  icon: EarthAmericasIcon,
  description:
    "Suggests the store for the visitor's country when it differs from the one they're browsing. Never redirects.",
  fields: [
    defineField({
      type: "string",
      name: "message",
      description: `${MARKET_TOKEN} is replaced with the suggested store, e.g. "Shopping from ${MARKET_TOKEN}?"`,
      initialValue: `Shopping from ${MARKET_TOKEN}?`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "switchLabel",
      description: `${MARKET_TOKEN} is replaced as above.`,
      initialValue: `Switch to ${MARKET_TOKEN}`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "dismissLabel",
      initialValue: "Stay here",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Location Notice",
      };
    },
  },
});
