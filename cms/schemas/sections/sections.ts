import { defineArrayMember } from "sanity";

// Selected sections per page type
export const pageSections = [
  defineArrayMember({ type: "sectionHero", name: "sectionHero" }),
  defineArrayMember({ type: "sectionText", name: "sectionText" }),
  defineArrayMember({ type: "sectionCollection", name: "sectionCollection" }),
  defineArrayMember({ type: "sectionAccordions", name: "sectionAccordions" }),
  defineArrayMember({ type: "sectionTabs", name: "sectionTabs" }),
  defineArrayMember({ type: "sectionForm", name: "sectionForm" }),
];
