import { graphql } from "../generated";

export const productByHandleQuery = graphql(`
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...Product
    }
  }
`);

export const productPriceByHandleQuery = graphql(`
  query ProductPriceByHandle($handle: String!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    productByHandle(handle: $handle) {
      ...ProductPrice
    }
  }
`);
