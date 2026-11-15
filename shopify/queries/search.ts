import { graphql } from "../generated";

export const searchProductsQuery = graphql(`
  query SearchProductsQuery(
    $query: String!
    $first: Int!
    $after: String
    $filters: [ProductFilter!]
    $sortKey: SearchSortKeys
    $reverse: Boolean
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    search(
      query: $query
      first: $first
      after: $after
      productFilters: $filters
      sortKey: $sortKey
      reverse: $reverse
      types: [PRODUCT]
      unavailableProducts: LAST
    ) {
      totalCount
      productFilters {
        ...ProductFilterGroup
      }
      nodes {
        ... on Product {
          ...ProductCard
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const predictiveSearchQuery = graphql(`
  query PredictiveSearchQuery(
    $query: String!
    $limit: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      query: $query
      limit: $limit
      limitScope: EACH
      types: [PRODUCT, COLLECTION, QUERY]
      unavailableProducts: LAST
    ) {
      queries {
        text
      }
      products {
        ...ProductCard
      }
      collections {
        handle
        title
      }
    }
  }
`);
