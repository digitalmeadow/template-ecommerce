import type { Entry, TabId } from "./entry";
import { componentEntries } from "./fixtures/components";
import { elementEntries } from "./fixtures/elements";
import { sectionEntries } from "./fixtures/sections";
import { styleEntries } from "./fixtures/styles";

/** Every framed preview, by tab. New sections and components add an entry here. */
export const ENTRIES: Record<TabId, Entry[]> = {
  sections: sectionEntries,
  components: componentEntries,
  elements: elementEntries,
  styles: styleEntries,
};

export const findEntry = (id: string | undefined) =>
  Object.values(ENTRIES)
    .flat()
    .find((entry) => entry.id === id);

/** Entries grouped for the sidebar and page headings, in fixture order. */
export const groupEntries = (entries: Entry[]) =>
  Object.entries(Object.groupBy(entries, (entry) => entry.group)) as [string, Entry[]][];
