import { graphql } from "../generated";

export const cartQuery = graphql(`
  query CartQuery {
    allCart {
      ...Cart
    }
  }
`);
