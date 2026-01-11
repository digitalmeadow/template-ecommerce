import { graphql } from "../generated";

export const homeQuery = graphql(`
  query HomeQuery {
    allHome {
      ...Home
    }
  }
`);
