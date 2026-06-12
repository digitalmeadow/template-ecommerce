import { GraphQLClient } from "graphql-request";
import { SANITY_PROJECT_ID } from "./config";

const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_VIEWER_API_TOKEN;
const preview = process.env.PREVIEW === "true";
const perspective = preview ? "drafts" : "published";

if (!dataset) throw new Error("Missing SANITY_DATASET");
if (!token) throw new Error("Missing SANITY_VIEWER_API_TOKEN");

export const sanityClient = new GraphQLClient(
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v2026-01-01/graphql/${dataset}/default?perspective=${perspective}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);
