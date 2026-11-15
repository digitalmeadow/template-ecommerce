import Styles from "../Styles.astro";
import { STYLE_PARTS, componentEntry } from "../entry";

export const styleEntries = STYLE_PARTS.map((part) =>
  componentEntry("Styles", part, Styles, { part }, { padded: false }),
);
