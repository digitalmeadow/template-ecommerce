import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "frontend/config";
import { defineLocations, type DocumentLocationResolvers } from "sanity/presentation";

// "Used on" links for the Presentation tool, from the same route patterns the frontends use.
export const locations: DocumentLocationResolvers = Object.fromEntries(
  Object.entries(SANITY_DOCUMENT_ROUTE_PATTERNS).map(([type, pattern]) => [
    type,
    defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        shopifyTitle: "shopify.title",
        handle: "shopify.handle.current",
      },
      resolve: (document) => {
        const slug = document?.slug ?? document?.handle;
        if (pattern.includes("[slug]") && !slug) return null;
        return {
          locations: [
            {
              title: document?.title ?? document?.shopifyTitle ?? type,
              href: pattern.replace("[slug]", slug ?? ""),
            },
          ],
        };
      },
    }),
  ]),
);
