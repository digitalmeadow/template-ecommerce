import { createClient } from "@sanity/client";
import { PREVIEW, SANITY_DATASET, SANITY_PROJECT_ID } from "astro:env/client";
import { SANITY_VIEWER_API_TOKEN } from "astro:env/server";
import { GraphQLClient } from "graphql-request";
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
