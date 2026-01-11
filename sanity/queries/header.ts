import { graphql } from "../generated";

export const headerQuery = graphql(`
  query HeaderQuery {
    allHeader {
      ...Header
    }
  }
`);
