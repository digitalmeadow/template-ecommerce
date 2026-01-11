import { graphql } from "../generated";

export const productByHandleQuery = graphql(`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...Product
    }
  }
`);
