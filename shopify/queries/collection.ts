import { graphql } from "../generated";

export const collectionByHandleQuery = graphql(`
  query CollectionQuery($handle: String!, $productCursor: String) {
    collection(handle: $handle) {
      ...Collection
    }
  }
`);
