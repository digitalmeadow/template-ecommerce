import { graphql } from "../generated";

export const collectionByHandleQuery = graphql(`
  query CollectionByHandleQuery($handle: String!) {
    allCollection(
      where: { shopify: { handle: { current: { eq: $handle } } } }
    ) {
      ...Collection
    }
  }
`);

export const collectionsQuery = graphql(`
  query CollectionsQuery {
    allCollection {
      ...Collection
    }
  }
`);
