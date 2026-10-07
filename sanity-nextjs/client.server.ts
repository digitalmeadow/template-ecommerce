import "server-only";

import { GraphQLClient } from "graphql-request";
import { createClient } from "@sanity/client";
import { SANITY_API_VERSION } from "./config";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_VIEWER_API_TOKEN;
const perspective = process.env.PREVIEW === "true" ? "drafts" : "published";

if (!projectId) throw new Error("Missing SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing SANITY_DATASET");
if (!token) throw new Error("Missing SANITY_VIEWER_API_TOKEN");

export const sanityClient = new GraphQLClient(
  `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/graphql/${dataset}/default?perspective=${perspective}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

export const sanityClientGroq = createClient({
  projectId,
  dataset,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token,
  perspective,
});
