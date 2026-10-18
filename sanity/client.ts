import { GraphQLClient } from "graphql-request";
import { createClient } from "@sanity/client";
import { SANITY_PROJECT_ID, SANITY_DATASET, PREVIEW } from "astro:env/client";
import { SANITY_VIEWER_API_TOKEN } from "astro:env/server";
import { SANITY_API_VERSION } from "./config";

const perspective = PREVIEW === "true" ? "drafts" : "published";

export const sanityClient = new GraphQLClient(
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/graphql/${SANITY_DATASET}/default?perspective=${perspective}`,
  {
    headers: {
      Authorization: `Bearer ${SANITY_VIEWER_API_TOKEN}`,
    },
  },
);

export const sanityClientGroq = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: SANITY_VIEWER_API_TOKEN,
  perspective,
});
