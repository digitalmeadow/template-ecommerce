import { GraphQLClient } from "graphql-request";
import { SANITY_PROJECT_ID, SANITY_API_VERSION } from "./config";
import {
  SANITY_DATASET,
  SANITY_VIEWER_API_TOKEN,
  PREVIEW,
} from "astro:env/client";
import { createClient } from "@sanity/client";

export const sanityClient = new GraphQLClient(
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/graphql/${SANITY_DATASET}/default?perspective=${PREVIEW === "true" ? "drafts" : "published"}`,
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
});
