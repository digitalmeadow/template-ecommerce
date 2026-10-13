import { sectionAccordions } from "./sectionAccordions";
import { sectionCollection } from "./sectionCollection";
import { sectionForm } from "./sectionForm";
import { sectionHero } from "./sectionHero";
import { sectionTabs } from "./sectionTabs";
import { sectionText } from "./sectionText";

// One list feeds both schema registration and every page's `sections` array.
export const sectionSchemas = [
  sectionHero,
  sectionText,
  sectionCollection,
  sectionAccordions,
  sectionTabs,
  sectionForm,
];

export const pageSections = sectionSchemas.map((section) => ({
  type: section.name,
  name: section.name,
}));
