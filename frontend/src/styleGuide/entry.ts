import type { ComponentProps } from "astro/types";
import type SectionsRenderer from "@sections/SectionsRenderer.astro";

export const TABS = [
  { id: "sections", title: "Sections" },
  { id: "components", title: "Components" },
  { id: "elements", title: "Elements" },
  { id: "styles", title: "Styles" },
] as const;
export type TabId = (typeof TABS)[number]["id"];

export const STYLE_PARTS = [
  "Typography",
  "Colours",
  "Elements",
  "Structure",
  "Grid",
  "Flex",
  "Sizes",
  "Utilities",
] as const;
export type StylePart = (typeof STYLE_PARTS)[number];

/** Frames render without a scheme attribute for Light, as a page does. */
export const SCHEMES = ["light", "dark"] as const;
export type Scheme = (typeof SCHEMES)[number];

/** Frame widths in px, matching Figma's Desktop and Mobile frames; Fit fills the column. */
export const WIDTHS = { desktop: 1440, mobile: 390, fit: null } as const;
export type WidthId = keyof typeof WIDTHS;

export const isScheme = (value: unknown): value is Scheme => SCHEMES.includes(value as Scheme);
export const isWidthId = (value: unknown): value is WidthId =>
  typeof value === "string" && value in WIDTHS;

/** Any section SectionsRenderer renders. */
export type SectionData = NonNullable<
  NonNullable<ComponentProps<typeof SectionsRenderer>["sections"]>[number]
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any Astro component
type AstroComponent = (props: any) => unknown;

type Render =
  { section: SectionData } | { component: AstroComponent; props: object; padded: boolean };

/** One framed preview: a section with sample data, or a component with props. */
export interface Entry {
  id: string;
  group: string;
  title: string;
  render: Render;
  /** Fixed frame height (px) for parts that fill the viewport, like overlays and fixed bars. */
  height?: number;
}

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const entryId = (group: string, title: string) => `${slug(group)}--${slug(title)}`;

/** A section variant: rendered by SectionsRenderer, as on a page. */
export const sectionEntry = (group: string, title: string, section: SectionData): Entry => ({
  id: entryId(group, title),
  group,
  title,
  render: { section },
});

/** A component with typed props; `padded` wraps it in the section spacing and page margin. */
export const componentEntry = <C extends AstroComponent>(
  group: string,
  title: string,
  component: C,
  props: ComponentProps<C>,
  options: { padded?: boolean; height?: number } = {},
): Entry => ({
  id: entryId(group, title),
  group,
  title,
  render: { component, props, padded: options.padded ?? true },
  height: options.height,
});
