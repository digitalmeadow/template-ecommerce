import EarthGlobeIcon from "@sanity/icons/EarthGlobe";
import { defineArrayMember, defineField, defineType } from "sanity";

export const organisationSettings = defineType({
  type: "document",
  name: "organisationSettings",
  title: "Organisation",
  icon: EarthGlobeIcon,
  description:
    "Describes this organisation to search engines and AI crawlers. Rendered as structured data on every page.",
  fields: [
    defineField({
      type: "string",
      name: "type",
      title: "Entity type",
      description:
        "schema.org type. Person for a solo operator, Local Business or Professional Service for a business with a physical location, Organization for anything else.",
      options: {
        list: [
          { title: "Organization", value: "Organization" },
          { title: "Professional Service", value: "ProfessionalService" },
          { title: "Local Business", value: "LocalBusiness" },
          { title: "Person", value: "Person" },
        ],
        layout: "dropdown",
      },
      initialValue: "Organization",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "text",
      name: "description",
      rows: 3,
      description: "One paragraph describing what this organisation does and where it operates",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "image",
      name: "logo",
      description: "Square logo on a solid background. Used by search engines, not by the site.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "string",
      name: "foundingDate",
      description: "Four digit year",
      validation: (Rule) => Rule.regex(/^\d{4}$/, { name: "four digit year" }),
    }),
    defineField({
      type: "array",
      name: "founders",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ parent }) => parent?.type === "Person",
    }),
    defineField({
      type: "number",
      name: "numberOfEmployees",
      validation: (Rule) => Rule.integer().positive(),
      hidden: ({ parent }) => parent?.type === "Person",
    }),
    defineField({
      type: "string",
      name: "telephone",
      title: "Phone",
      description: "Main contact number, in international format",
      validation: (Rule) => Rule.regex(/^\+?[0-9\s\-()]*$/, { name: "valid phone number" }),
    }),
    defineField({
      type: "string",
      name: "areaServed",
      description: "Where the work is done, e.g. a country name or 'Worldwide'",
    }),
    defineField({
      type: "array",
      name: "knowsAbout",
      description: "Areas of expertise, one per entry",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      type: "array",
      name: "sameAs",
      title: "Profile URLs",
      description: "LinkedIn, Instagram and any other profile that represents this same entity",
      of: [defineArrayMember({ type: "url" })],
    }),
    defineField({
      type: "postalAddress",
      name: "address",
      description: "Head office. Enables local business signals in search.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Organisation",
      };
    },
  },
});
