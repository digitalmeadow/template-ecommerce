import recessGroups from "stylelint-config-recess-order/groups";

const groupContaining = (property) =>
  recessGroups.find((group) => group.properties.includes(property));

const boxGroup = groupContaining("margin");
const marginGroup = { properties: boxGroup.properties.filter((p) => p.startsWith("margin")) };
const paddingGroup = { properties: boxGroup.properties.filter((p) => p.startsWith("padding")) };
const positionGroup = groupContaining("position");
const sizeGroup = groupContaining("width");

// Outside in: where the box sits, its spacing, its size, then how it lays out children and looks.
const propertyGroups = [
  positionGroup,
  marginGroup,
  paddingGroup,
  sizeGroup,
  ...recessGroups.filter((group) => ![positionGroup, boxGroup, sizeGroup].includes(group)),
].map((group) => ({ ...group, emptyLineBefore: "never", noEmptyLineBetween: true }));

/** @type {import('stylelint').Config} */
const config = {
  plugins: ["stylelint-order"],
  ignoreFiles: ["**/dist/**", "**/.astro/**", "**/.next/**", "**/.sanity/**", "**/.wrangler/**"],
  rules: {
    "order/properties-order": propertyGroups,
  },
  overrides: [
    {
      files: ["**/*.astro"],
      customSyntax: "postcss-html",
    },
  ],
};

export default config;
