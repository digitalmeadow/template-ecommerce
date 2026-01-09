import { GraphQLClient } from "graphql-request";

export const sanityClient = new GraphQLClient(
  `https://${import.meta.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v1/graphql/${import.meta.env.SANITY_STUDIO_DATASET}/default`,
  {}
);
