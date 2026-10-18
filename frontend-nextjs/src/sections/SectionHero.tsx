import type { CSSProperties } from "react";
import type { SectionHeroFragment } from "sanity-nextjs/generated/graphql";
import FontSizeFillWidth from "@/layouts/FontSizeFillWidth";

interface Props {
  sectionData: SectionHeroFragment;
}

export default function SectionHero({ sectionData }: Props) {
  const characters = (sectionData.heading ?? "").trim().split("");

  return (
    <section
      data-color-scheme={sectionData.colorScheme ?? undefined}
      id={sectionData.id ?? undefined}
      className="section-hero mx-auto mt-[var(--s200)] mb-[var(--s40)] w-[var(--container-width)] max-[64rem]:mt-[calc(var(--s200)+var(--s24))]"
    >
      {sectionData.heading && (
        <FontSizeFillWidth>
          <h1 className="uppercase" aria-label={sectionData.heading}>
            {characters.map((char, index) => (
              <span
                key={index}
                aria-hidden="true"
                className="hero-char"
                style={{ "--char-index": index } as CSSProperties}
              >
                {/* Spans are inline-flex (reset), which collapses a lone space to zero width. */}
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>
        </FontSizeFillWidth>
      )}
    </section>
  );
}
