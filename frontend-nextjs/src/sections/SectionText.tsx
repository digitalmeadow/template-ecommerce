import type { SectionTextFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";

interface Props {
  sectionData: SectionTextFragment;
}

export default function SectionText({ sectionData }: Props) {
  if (!sectionData.textRaw) return null;

  return (
    <section
      data-color-scheme={sectionData.colorScheme ?? undefined}
      id={sectionData.id ?? undefined}
      className="section-text mx-auto mt-[var(--s40)] mb-[var(--s64)] w-[var(--container-width)] text-center max-sm:mt-0 max-sm:mb-[var(--s80)]"
    >
      <PortableText value={sectionData.textRaw} />
    </section>
  );
}
