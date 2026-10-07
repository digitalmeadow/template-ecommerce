import BoldIcon from "@sanity/icons/Bold";
import ImageIcon from "@sanity/icons/Image";
import ItalicIcon from "@sanity/icons/Italic";
import { defineArrayMember } from "sanity";
import Italics from "../../components/marks/Italics";

export interface RichTextOptions {
  headings?: boolean;
  lists?: boolean;
  italic?: boolean;
  strong?: boolean;
  link?: boolean;
  images?: boolean;
}

// A field factory, not a type: each field opts into only the features it renders, and the stored
// shape stays a plain block array, so changing options never needs a migration.
export function richText(options: RichTextOptions = {}) {
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
  };
}
