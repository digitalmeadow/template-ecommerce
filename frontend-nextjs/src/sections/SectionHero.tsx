import SanityImage from "@/fields/SanityImage";
import { SectionHeroFragment } from "sanity-nextjs/generated/graphql";

interface Props {
  sectionData: SectionHeroFragment;
}

export default function SectionHero({ sectionData }: Props) {
  return (
    <section className="section-hero">
      <h1>{sectionData.heading}</h1>
      {sectionData.backgroundMedia?.image && (
        <SanityImage
          imageData={sectionData.backgroundMedia.image}
          layout="width"
        />
      )}
    </section>
  );
}
