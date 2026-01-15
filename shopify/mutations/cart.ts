import { graphql } from "../generated";

export const cartCreateMutation = graphql(`
  mutation CartCreate($cartInput: CartInput, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    cartCreate(input: $cartInput) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);

export const cartLinesUpdateMutation = graphql(`
  mutation CartLinesUpdate(
    $lines: [CartLineUpdateInput!]!
    $cartId: ID!
    $countryCode: CountryCode
  ) @inContext(country: $countryCode) {
    cartLinesUpdate(lines: $lines, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);

export const cartLinesAddMutation = graphql(`
  mutation CartLinesAdd(
    $lines: [CartLineInput!]!
    $cartId: ID!
    $countryCode: CountryCode
  ) @inContext(country: $countryCode) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);

export const cartLinesRemoveMutation = graphql(`
  mutation CartLinesRemove(
    $lineIds: [ID!]!
    $cartId: ID!
    $countryCode: CountryCode
  ) @inContext(country: $countryCode) {
    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);

export const cartBuyerUpdateMutation = graphql(`
  mutation CartBuyerUpdate(
    $buyerIdentity: CartBuyerIdentityInput!
    $cartId: ID!
  ) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`);
