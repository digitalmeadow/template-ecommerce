import { graphql } from "../generated";

export const urlRedirectByPathQuery = graphql(`
  query UrlRedirectByPathQuery($query: String!) {
    urlRedirects(first: 1, query: $query) {
      nodes {
        target
      }
    }
  }
`);
