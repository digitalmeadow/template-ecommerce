import { graphql } from "../generated";

export const productThumbnailByHandleQuery = graphql(`
  query ProductThumbnailByHandleQuery($handle: String!) {
    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {
      ...ProductThumbnail
    }
  }
`);

// Every product's thumbnail in one request, so grids never ask per product.
export const productThumbnailsQuery = graphql(`
  query ProductThumbnailsQuery {
    allProduct {
      ...ProductThumbnail
    }
  }
`);

export const productByHandleQuery = graphql(`
  query ProductByHandleQuery($handle: String!) {
    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {
      ...Product
    }
  }
`);

export const productsQuery = graphql(`
  query ProductsQuery {
    allProduct {
      ...Product
    }
  }
`);
