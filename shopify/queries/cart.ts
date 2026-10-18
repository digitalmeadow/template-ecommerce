import { graphql } from "../generated";

export const cartByIdQuery = graphql(`
  query CartByIdQuery($cartId: ID!, $countryCode: CountryCode) @inContext(country: $countryCode) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`);
