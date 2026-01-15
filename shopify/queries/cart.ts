import { graphql } from "../generated";

export const cartByIdQuery = graphql(`
  query CartById($cartId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`);
