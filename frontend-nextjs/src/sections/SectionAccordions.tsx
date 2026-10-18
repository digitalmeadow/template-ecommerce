import type { SectionAccordionsFragment } from "sanity-nextjs/generated/graphql";
import Accordion from "@/layouts/Accordion";
import PortableText from "@/fields/PortableText";

interface Props {
  sectionData: SectionAccordionsFragment;
}

export default function SectionAccordions({ sectionData }: Props) {
  if (!sectionData.accordions?.length) return null;

  return (
    <section
      data-color-scheme={sectionData.colorScheme ?? undefined}
      id={sectionData.id ?? undefined}
      className="section-accordions mx-auto mt-[var(--s120)] mb-[var(--s64)] flex w-[var(--container-width)] flex-col items-center"
    >
      {sectionData.accordions.map((accordion) => {
        if (!accordion) return null;
        return (
          <div
            className="w-[calc(8*var(--column)+7*var(--gutter))] max-sm:w-full"
            key={accordion.summary}
          >
            <Accordion
              group="default"
              summary={accordion.summary}
              content={<PortableText value={accordion.contentRaw} />}
            />
          </div>
        );
      })}
    </section>
  );
}
