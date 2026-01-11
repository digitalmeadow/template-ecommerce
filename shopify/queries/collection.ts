import { graphql } from "../generated";

export const collectionByHandleQuery = graphql(`
  query CollectionQuery($handle: String!, $productCursor: String) {
    collectionByHandle(handle: $handle) {
      ...Collection
    }
  }
`);
