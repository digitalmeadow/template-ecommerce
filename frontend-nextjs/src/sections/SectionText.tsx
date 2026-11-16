import type { SectionTextFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";

interface Props {
  section: SectionTextFragment;
}

export default function SectionText({ section }: Props) {
  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-text g-page-margin g-section-md text-center"
      id={section.id ?? undefined}
    >
      <PortableText value={section.textRaw} />
    </section>
  );
}
