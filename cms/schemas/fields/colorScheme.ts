import { defineField } from "sanity";

// A plain string, so it needs no named type; frontends render it as `data-color-scheme`.
export const colorSchemeField = defineField({
  type: "string",
  name: "colorScheme",
  title: "Colour scheme",
  options: {
    list: [
      { title: "Light", value: "light" },
      { title: "Dark", value: "dark" },
    ],
    layout: "radio",
    direction: "horizontal",
  },
  initialValue: "light",
});
