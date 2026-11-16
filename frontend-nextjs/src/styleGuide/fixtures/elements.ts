import PortableText from "@/fields/PortableText";
import SanityMedia from "@/fields/SanityMedia";
import DemoButtons from "../demos/DemoButtons";
import DemoFormControls from "../demos/DemoFormControls";
import DemoHeadings from "../demos/DemoHeadings";
import DemoLinks from "../demos/DemoLinks";
import DemoText from "../demos/DemoText";
import { componentEntry, type Entry } from "../entry";
import { media, richTextBody } from "./content";

export const elementEntries: Entry[] = [
  componentEntry("Typography", "Headings", DemoHeadings, {}),
  componentEntry("Typography", "Text", DemoText, {}),
  componentEntry("Typography", "Links", DemoLinks, {}),

  componentEntry("Buttons", "Variants", DemoButtons, {}),

  componentEntry("Forms", "Controls", DemoFormControls, {}),

  componentEntry("Rich Text", "Every block type", PortableText, { value: richTextBody }),

  componentEntry("Media", "Image", SanityMedia, { media: media.image("wordmark") }),
  componentEntry("Media", "Vimeo", SanityMedia, { media: media.vimeo() }),
];
