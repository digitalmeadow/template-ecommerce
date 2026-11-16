import { componentEntry, STYLE_PARTS } from "../entry";
import Styles from "../Styles";

export const styleEntries = STYLE_PARTS.map((part) =>
  componentEntry("Styles", part, Styles, { part }, { padded: false }),
);
