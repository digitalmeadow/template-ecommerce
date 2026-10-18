import type { SectionTabsFragment } from "sanity-nextjs/generated/graphql";
import Tabs from "@/layouts/Tabs";
import PortableText from "@/fields/PortableText";
import SanityMedia from "@/fields/SanityMedia";

interface Props {
  sectionData: SectionTabsFragment;
}

export default function SectionTabs({ sectionData }: Props) {
  const tabItems = (sectionData.tabItems ?? []).filter((item) => Boolean(item));
  if (tabItems.length === 0) return null;

  return (
    <section
      data-color-scheme={sectionData.colorScheme ?? undefined}
      className="section-tabs mt-[var(--s120)] bg-surface py-[var(--margin)]"
      id={sectionData.id ?? undefined}
    >
      <Tabs
        className="u-container grid grid-cols-2 items-start gap-[var(--gutter)] max-[64rem]:grid-cols-1"
        triggersClassName="border-border flex flex-col border-b"
        triggerClassName="border-border text-muted data-[state=active]:border-foreground data-[state=active]:text-foreground hover:border-foreground hover:text-foreground cursor-pointer border-t py-[var(--s20)] text-left text-[1.5rem] transition-colors duration-[var(--transition-default-duration)]"
        panelsClassName="h-full pl-[calc(var(--column)+var(--gutter))] max-[64rem]:mt-[var(--s64)] max-[64rem]:pl-0"
        panelClassName="flex flex-col justify-between gap-y-[var(--s120)] max-[64rem]:justify-start"
        items={tabItems.map((item, index) => ({
          key: item?._key ?? String(index),
          trigger: item?.title,
          panel: (
            <>
              <PortableText value={item?.contentRaw} />
              {item?.media && (
                <div className="mt-[var(--s32)]">
                  <SanityMedia mediaData={item.media} sizes={[50, 100, 100]} />
                </div>
              )}
            </>
          ),
        }))}
      />
    </section>
  );
}
