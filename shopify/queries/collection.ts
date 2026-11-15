import { graphql } from "../generated";

export const collectionByHandleQuery = graphql(`
  query CollectionByHandleQuery(
    $handle: String!
    $first: Int!
    $after: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...Collection
    }
  }
`);
