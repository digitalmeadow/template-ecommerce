import { type SectionAccordionsOrSectionCollectionOrSectionHeroOrSectionText } from "sanity-nextjs/generated/graphql";
import SectionHero from "./SectionHero";

interface Props {
  sections:
    | (SectionAccordionsOrSectionCollectionOrSectionHeroOrSectionText | null)[]
    | null
    | undefined;
}

export default function SectionsRenderer({ sections }: Props) {
  if (!sections) return null;

  return (
    <>
      {sections.map((section) => {
        if (!section) return null;

        switch (section.__typename) {
          case "SectionHero":
            return <SectionHero key={section._key} sectionData={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
