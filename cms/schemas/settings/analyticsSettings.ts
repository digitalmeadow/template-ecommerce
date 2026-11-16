import BarChartIcon from "@sanity/icons/BarChart";
import { defineField, defineType } from "sanity";

export const analyticsSettings = defineType({
  type: "document",
  name: "analyticsSettings",
  title: "Analytics",
  icon: BarChartIcon,
  description:
    "Loaded once a visitor accepts cookies, or straight away where no consent is required.",
  fields: [
    defineField({
      type: "string",
      name: "gtmId",
      title: "Google Tag Manager ID",
      description: "e.g. GTM-XXXXXXX. Configure GA4 and other tags inside GTM.",
      validation: (Rule) => Rule.regex(/^GTM-[A-Z0-9]+$/, { name: "GTM container ID" }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Analytics",
      };
    },
  },
});
