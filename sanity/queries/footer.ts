import { graphql } from "../generated";

export const footerQuery = graphql(`
  query FooterQuery {
    allFooter {
      ...Footer
    }
  }
`);
