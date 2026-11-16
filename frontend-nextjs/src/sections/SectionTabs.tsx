import type { SectionTabsFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import SanityMedia from "@/fields/SanityMedia";
import Tabs from "@/layouts/Tabs";

interface Props {
  section: SectionTabsFragment;
}

export default function SectionTabs({ section }: Props) {
  const tabItems = (section.tabItems ?? []).filter((item) => item != null);

  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-tabs g-page-margin g-section-lg"
      id={section.id ?? undefined}
    >
      <Tabs
        id={section._key ?? undefined}
        className="grid grid-cols-2 items-start gap-(--gutter) mobile:grid-cols-1"
        triggersClassName="flex flex-col border-b border-rule"
        triggerClassName="border-t border-rule py-4 text-left text-text-subtle transition-colors duration-(--duration-default) ease-out hover:text-text data-[state=active]:text-text"
        panelsClassName="pl-[calc(var(--column)+var(--gutter))] mobile:mt-10 mobile:pl-0"
        panelClassName="flex flex-col gap-y-8"
        items={tabItems.map((item, index) => ({
          key: item._key ?? String(index),
          trigger: item.title,
          panel: (
            <>
              <PortableText value={item.contentRaw} />
              {item.media && <SanityMedia media={item.media} sizes={[50, 100, 100]} />}
            </>
          ),
        }))}
      />
    </section>
  );
}
