import { graphql } from "../generated";

export const collectionByHandleQuery = graphql(`
  query CollectionByHandleQuery($handle: String!, $productCursor: String) {
    collection(handle: $handle) {
      ...Collection
    }
  }
`);
