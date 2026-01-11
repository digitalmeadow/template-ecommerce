import { GraphQLClient } from "graphql-request";

export const sanityClient = new GraphQLClient(
  `https://${import.meta.env.SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${
    import.meta.env.SANITY_DATASET
  }/default`,
  {
    headers: {
      Authorization: `Bearer ${import.meta.env.SANITY_VIEWER_API_TOKEN}`,
    },
  }
);
