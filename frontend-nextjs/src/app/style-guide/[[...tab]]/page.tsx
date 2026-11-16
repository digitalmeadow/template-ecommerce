import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ENTRIES, groupEntries } from "@/styleGuide/entries";
import { isScheme, isStyleGuideEnabled, isWidthId, TABS } from "@/styleGuide/entry";
import StyleGuide from "@/styleGuide/StyleGuide";

interface Props {
  params: Promise<{ tab?: string[] }>;
  searchParams: Promise<{ scheme?: string; width?: string }>;
}

async function findTab(params: Props["params"]) {
  const { tab = [] } = await params;
  if (tab.length > 1) return undefined;
  return TABS.find((item) => item.id === (tab[0] ?? "sections"));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tab = await findTab(params);
  return { title: `Style Guide: ${tab?.title ?? "Not found"}` };
}

export default async function StyleGuidePage({ params, searchParams }: Props) {
  await connection();
  const tab = await findTab(params);
  if (!isStyleGuideEnabled || !tab) notFound();

  const { scheme, width } = await searchParams;
  // Entries hold components, which can't cross into the client UI: it gets ids and titles only.
  const groups = groupEntries(ENTRIES[tab.id]).map(
    ([group, entries]) =>
      [group, entries.map(({ id, title, height }) => ({ id, group, title, height }))] as [
        string,
        { id: string; group: string; title: string; height?: number }[],
      ],
  );

  return (
    <StyleGuide
      key={tab.id}
      tab={tab.id}
      groups={groups}
      scheme={isScheme(scheme) ? scheme : "light"}
      width={isWidthId(width) ? width : "desktop"}
    />
  );
}
