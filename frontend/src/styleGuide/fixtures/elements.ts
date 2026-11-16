import PortableText from "@fields/PortableText.astro";
import SanityMedia from "@fields/SanityMedia.astro";
import DemoButtons from "../demos/DemoButtons.astro";
import DemoFormControls from "../demos/DemoFormControls.astro";
import DemoHeadings from "../demos/DemoHeadings.astro";
import DemoLinks from "../demos/DemoLinks.astro";
import DemoText from "../demos/DemoText.astro";
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
