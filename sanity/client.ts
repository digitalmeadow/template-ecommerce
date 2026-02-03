import { GraphQLClient } from "graphql-request";
import { SANITY_PROJECT_ID } from "./config";
import {
  SANITY_DATASET,
  SANITY_VIEWER_API_TOKEN,
  PREVIEW,
} from "astro:env/client";

export const sanityClient = new GraphQLClient(
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v2026-01-01/graphql/${SANITY_DATASET}/default?perspective=${PREVIEW === "true" ? "preview" : "published"}`,
  {
    headers: {
      Authorization: `Bearer ${SANITY_VIEWER_API_TOKEN}`,
    },
  },
);
