import { GraphQLClient } from "graphql-request";
import { createClient } from "@sanity/client";
import { SANITY_API_VERSION, SANITY_PROJECT_ID } from "./config";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.NEXT_PUBLIC_SANITY_VIEWER_API_TOKEN;
const preview = process.env.NEXT_PUBLIC_PREVIEW === "true";
const perspective = preview ? "drafts" : "published";

if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
if (!token) throw new Error("Missing NEXT_PUBLIC_SANITY_VIEWER_API_TOKEN");

export const sanityClient = new GraphQLClient(
  `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/graphql/${dataset}/default?perspective=${perspective}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

export const sanityClientGroq = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token,
});
