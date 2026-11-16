import type { SectionAccordionsFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import Accordion from "@/layouts/Accordion";

interface Props {
  section: SectionAccordionsFragment;
}

export default function SectionAccordions({ section }: Props) {
  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-accordions flex flex-col items-center g-page-margin g-section-md"
      id={section.id ?? undefined}
    >
      {section.accordions?.map((accordion, index) => {
        if (!accordion) return null;
        return (
          <div key={index} className="w-full max-w-[calc(8*var(--column)+7*var(--gutter))]">
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
