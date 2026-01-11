import { graphql } from "../generated";

export const productByHandleQuery = graphql(`
  query ProductByHandleQuery($handle: String!) {
    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {
      ...Product
    }
  }
`);
