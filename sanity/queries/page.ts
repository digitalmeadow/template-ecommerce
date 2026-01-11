import { graphql } from "../generated";

export const pageQuery = graphql(`
  query PageQuery($slug: String!) {
    allPage(where: { slug: { current: { eq: $slug } } }) {
      ...Page
    }
  }
`);

export const pagesQuery = graphql(`
  query PagesQuery {
    allPage {
      ...Page
    }
  }
`);
