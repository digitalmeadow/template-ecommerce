import { defineField, defineType } from "sanity";

export const postalAddress = defineType({
  type: "object",
  name: "postalAddress",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ type: "string", name: "streetAddress" }),
    defineField({ type: "string", name: "addressLocality", title: "City" }),
    defineField({ type: "string", name: "addressRegion", title: "Region" }),
    defineField({ type: "string", name: "postalCode" }),
    defineField({
      type: "string",
      name: "addressCountry",
      title: "Country",
      description: "Two letter country code, e.g. 'NZ'",
    }),
  ],
});
