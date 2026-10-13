import { graphql } from "../generated";

export const productByHandleQuery = graphql(`
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...Product
    }
  }
`);

// Every product's prices for one market in a page, so a build costs one request per market.
export const productPricesQuery = graphql(`
  query ProductPrices($countryCode: CountryCode, $cursor: String)
  @inContext(country: $countryCode) {
    products(first: 250, after: $cursor) {
      edges {
        node {
          handle
          ...ProductPrice
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
