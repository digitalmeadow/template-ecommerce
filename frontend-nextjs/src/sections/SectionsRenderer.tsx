import type { PageFragment } from "sanity-nextjs/generated/graphql";
import SectionAccordions from "./SectionAccordions";
import SectionCollection from "./SectionCollection";
import SectionForm from "./SectionForm";
import SectionHero from "./SectionHero";
import SectionTabs from "./SectionTabs";
import SectionText from "./SectionText";

// Derived from the fragment, so a section added to the GraphQL union fails the switch below until rendered.
type Section = NonNullable<NonNullable<PageFragment["sections"]>[number]>;

interface Props {
  sections: (Section | null)[] | null | undefined;
}

export default function SectionsRenderer({ sections }: Props) {
  return (
    <>
      {sections?.map((section) => {
        if (!section) return null;

        switch (section.__typename) {
          case "SectionHero":
            return <SectionHero key={section._key} section={section} />;
          case "SectionText":
            return <SectionText key={section._key} section={section} />;
          case "SectionCollection":
            return <SectionCollection key={section._key} section={section} />;
          case "SectionAccordions":
            return <SectionAccordions key={section._key} section={section} />;
          case "SectionTabs":
            return <SectionTabs key={section._key} section={section} />;
          case "SectionForm":
            return <SectionForm key={section._key} section={section} />;
          default:
            section satisfies never;
            return null;
        }
      })}
    </>
  );
}
