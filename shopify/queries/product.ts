import { graphql } from "../generated";

export const productByHandleQuery = graphql(`
  query ProductByHandleQuery($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
`);

// Every product's prices for one market in a page (frontend-nextjs bakes all markets into one build).
export const productPricesQuery = graphql(`
  query ProductPricesQuery($countryCode: CountryCode, $cursor: String)
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

export const productCardByHandleQuery = graphql(`
  query ProductCardByHandleQuery($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductCard
    }
  }
`);

export const productLiveByHandleQuery = graphql(`
  query ProductLiveByHandleQuery($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      availableForSale
      variants(first: 250) {
        nodes {
          ...ProductVariantLive
        }
      }
    }
  }
`);
