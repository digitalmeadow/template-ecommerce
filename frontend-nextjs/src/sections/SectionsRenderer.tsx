import type {
  SectionHeroFragment,
  SectionTextFragment,
  SectionCollectionFragment,
  SectionAccordionsFragment,
} from "sanity-nextjs/generated/graphql";
import SectionHero from "./SectionHero";
import SectionText from "./SectionText";
import SectionCollection from "./SectionCollection";
import SectionAccordions from "./SectionAccordions";

type SectionUnion =
  | SectionHeroFragment
  | SectionTextFragment
  | SectionCollectionFragment
  | SectionAccordionsFragment;

interface Props {
  sections: (SectionUnion | null)[] | null | undefined;
}

export default function SectionsRenderer({ sections }: Props) {
  if (!sections) return null;

  return (
    <>
      {sections.map((section) => {
        if (!section) return null;
        console.log("Rendering section:", section);

        switch (section.__typename) {
          case "SectionHero":
            return <SectionHero key={section._key} sectionData={section} />;
          case "SectionText":
            return <SectionText key={section._key} sectionData={section} />;
          case "SectionCollection":
            return (
              <SectionCollection key={section._key} sectionData={section} />
            );
          case "SectionAccordions":
            return (
              <SectionAccordions key={section._key} sectionData={section} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
