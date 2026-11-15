import type {
  AccordionFragment,
  SectionAccordionsFragment,
  SectionCollectionFragment,
  SectionFormFragment,
  SectionHeroFragment,
  SectionTabsFragment,
  SectionTextFragment,
  TabItemFragment,
} from "sanity/generated/graphql";
import { sectionEntry, type Entry } from "../entry";
import {
  block,
  form,
  formFields,
  formTerms,
  key,
  lorem,
  media,
  paragraph,
  richText,
  richTextBody,
  type ImageName,
} from "./content";

// Shopify creates `frontpage` in every store, so this renders real products in any project.
const COLLECTION_HANDLE = "frontpage";

// Sections inherit the frame's scheme (colorScheme: null), so the scheme switch applies to all.
const base = () => ({ _key: key(), id: null, colorScheme: null });

const hero = (heading: string): SectionHeroFragment => ({
  ...base(),
  __typename: "SectionHero",
  heading,
  textRaw: null,
  mediaBackground: null,
});

const text = (textRaw: unknown): SectionTextFragment => ({
  ...base(),
  __typename: "SectionText",
  textRaw,
});

const accordion = (summary: string, content: string): AccordionFragment => ({
  __typename: "Accordion",
  summary,
  contentRaw: paragraph(content),
});

const accordionItems = [
  accordion("Shipping", "Orders ship within two working days from our warehouse."),
  accordion("Returns", "Unridden boards can be returned within 30 days for a full refund."),
  accordion("Warranty", lorem.long),
  accordion("Sizing", "Stand the board on its tail: it should reach between your chin and nose."),
  accordion("Care", "Wax every few days on snow and store it dry, out of direct sun."),
];

const accordions = (items: AccordionFragment[]): SectionAccordionsFragment => ({
  ...base(),
  __typename: "SectionAccordions",
  accordions: items,
});

const tabItem = (title: string, content: string, imageName?: ImageName): TabItemFragment => ({
  __typename: "TabItem",
  _key: key(),
  title,
  contentRaw: paragraph(content),
  media: imageName ? media.image(imageName) : null,
});

const tabItems = [
  tabItem("Liquid", lorem.medium, "snowboardLiquid"),
  tabItem("Oxygen", "Light and lively, with a softer flex for park laps.", "snowboardOxygen"),
  tabItem("Hydrogen", "Stiff and damp for speed on groomers.", "snowboardHydrogen"),
  tabItem("Specs", "Text only: no media on this tab."),
];

const tabs = (items: TabItemFragment[]): SectionTabsFragment => ({
  ...base(),
  __typename: "SectionTabs",
  tabItems: items,
});

const formSection = (
  heading: string | null,
  sectionForm: SectionFormFragment["form"],
): SectionFormFragment => ({
  ...base(),
  __typename: "SectionForm",
  heading,
  form: sectionForm,
});

const collection = (handle: string, title: string): SectionCollectionFragment => ({
  ...base(),
  __typename: "SectionCollection",
  collection: {
    __typename: "Collection",
    _id: `sg-collection-${handle}`,
    meta: null,
    shopify: {
      __typename: "ShopifyCollection",
      title,
      handle: { __typename: "Slug", current: handle },
    },
  },
});

export const sectionEntries: Entry[] = [
  sectionEntry("Hero", "Short heading", hero("Headless")),
  sectionEntry("Hero", "Long heading", hero("Built for the whole mountain")),

  sectionEntry("Text", "Every block type", text(richTextBody)),
  sectionEntry(
    "Text",
    "One paragraph",
    text(
      richText(
        block([
          { text: lorem.medium },
          { text: " Read more about the " },
          { text: "process", link: "#" },
          { text: "." },
        ]),
      ),
    ),
  ),

  sectionEntry("Accordions", "One item", accordions(accordionItems.slice(0, 1))),
  sectionEntry("Accordions", "Five items", accordions(accordionItems)),

  sectionEntry("Tabs", "Two tabs", tabs(tabItems.slice(0, 2))),
  sectionEntry("Tabs", "Four tabs, one without media", tabs(tabItems)),

  sectionEntry(
    "Form",
    "Every field type",
    formSection(
      "Get in touch",
      form(
        [
          {
            heading: "About you",
            fields: [formFields.text, formFields.email, formFields.tel, formFields.select],
          },
          {
            heading: "Your enquiry",
            fields: [
              formFields.radioGroup,
              formFields.checkboxGroup,
              formFields.textarea,
              formFields.file,
              formFields.files,
            ],
          },
        ],
        [formTerms.privacy, formTerms.newsletter],
      ),
    ),
  ),
  sectionEntry(
    "Form",
    "One field, no heading",
    formSection(null, form([{ heading: null, fields: [{ ...formFields.email, width: "half" }] }])),
  ),

  sectionEntry("Collection", "Featured", collection(COLLECTION_HANDLE, "Featured")),
];
