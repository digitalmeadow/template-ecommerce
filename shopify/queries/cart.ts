import { graphql } from "../generated";

export const cartByIdQuery = graphql(`
  query CartByIdQuery($cartId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`);

export const cartCheckoutUrlQuery = graphql(`
  query CartCheckoutUrlQuery($cartId: ID!) {
    cart(id: $cartId) {
      checkoutUrl
      totalQuantity
    }
  }
`);
