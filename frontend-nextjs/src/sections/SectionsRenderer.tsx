import type { PageFragment } from "sanity-nextjs/generated/graphql";
import SectionHero from "./SectionHero";
import SectionText from "./SectionText";
import SectionCollection from "./SectionCollection";
import SectionAccordions from "./SectionAccordions";
import SectionTabs from "./SectionTabs";
import SectionForm from "./SectionForm";

// Derived from the fragment, so a section added to the GraphQL union fails the switch below until rendered.
type Section = NonNullable<NonNullable<PageFragment["sections"]>[number]>;

interface Props {
  sections: (Section | null)[] | null | undefined;
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
          case "SectionTabs":
            return <SectionTabs key={section._key} sectionData={section} />;
          case "SectionForm":
            return <SectionForm key={section._key} sectionData={section} />;
          default:
            section satisfies never;
            return null;
        }
      })}
    </>
  );
}
