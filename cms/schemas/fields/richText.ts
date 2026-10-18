import BoldIcon from "@sanity/icons/Bold";
import ImageIcon from "@sanity/icons/Image";
import ItalicIcon from "@sanity/icons/Italic";
import { defineArrayMember, type ArrayRule } from "sanity";
import Italics from "../../components/marks/Italics";

export interface RichTextOptions {
  headings?: boolean;
  lists?: boolean;
  italic?: boolean;
  strong?: boolean;
  link?: boolean;
  images?: boolean;
}

// Named presets keep fields from drifting; pass raw options only for a genuine one-off.
export const RICH_TEXT_STYLES = {
  default: { italic: true, strong: true, link: true },
  extended: { headings: true, lists: true, italic: true, strong: true, link: true },
  full: { headings: true, lists: true, italic: true, strong: true, link: true, images: true },
} as const satisfies Record<string, RichTextOptions>;

// A field factory, not a type: each field opts into only the features it renders, and the stored
// shape stays a plain block array, so changing options never needs a migration.
export function richText(options: RichTextOptions = {}, { required = false } = {}) {
  const { headings, lists, italic, strong, link, images } = options;

  return {
    type: "array" as const,
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          ...(headings
            ? [
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
              ]
            : []),
        ],
        lists: lists
          ? [
              { title: "Bullet", value: "bullet" },
              { title: "Number", value: "number" },
            ]
          : [],
        marks: {
          decorators: [
            ...(italic
              ? [{ title: "Italic", value: "italic", icon: ItalicIcon, component: Italics }]
              : []),
            ...(strong ? [{ title: "Strong", value: "strong", icon: BoldIcon }] : []),
          ],
          annotations: [...(link ? [defineArrayMember({ name: "link", type: "link" })] : [])],
        },
      }),
      ...(images ? [defineArrayMember({ type: "image", name: "image", icon: ImageIcon })] : []),
    ],
    validation: (Rule: ArrayRule<unknown[]>) => (required ? Rule.required() : Rule),
  };
}
