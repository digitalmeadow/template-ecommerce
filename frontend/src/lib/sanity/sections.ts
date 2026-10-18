import type { SectionHeroFragment } from "sanity/generated/graphql";

type SectionLike = { __typename?: string } | null | undefined;

const isSectionHero = (section: SectionLike): section is SectionHeroFragment =>
  section?.__typename === "SectionHero";

// Every page needs an h1; a hero with a heading provides it.
export function hasHeroHeading(sections: SectionLike[] | null | undefined): boolean {
  return Boolean(sections?.some((section) => isSectionHero(section) && section.heading));
}
