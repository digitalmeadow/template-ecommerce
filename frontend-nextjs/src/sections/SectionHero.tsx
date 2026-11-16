import type { SectionHeroFragment } from "sanity-nextjs/generated/graphql";
import FontSizeFillWidth from "@/layouts/FontSizeFillWidth";
import SectionHeroHeading from "@/sections/SectionHeroHeading";

interface Props {
  section: SectionHeroFragment;
}

export default function SectionHero({ section }: Props) {
  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-hero g-page-margin pt-40 pb-10 mobile:pt-[calc(var(--size-40)+var(--size-6))]"
      id={section.id ?? undefined}
    >
      <FontSizeFillWidth>
        <SectionHeroHeading heading={section.heading ?? ""} />
      </FontSizeFillWidth>
    </section>
  );
}
