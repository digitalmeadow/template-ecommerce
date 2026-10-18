import { graphql } from "../generated";

export const cartCreateMutation = graphql(`
  mutation CartCreateMutation($cartInput: CartInput, $countryCode: CountryCode)
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
      warnings {
        code
        message
      }
    }
  }
`);

export const cartLinesUpdateMutation = graphql(`
  mutation CartLinesUpdateMutation(
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
      warnings {
        code
        message
      }
    }
  }
`);

export const cartLinesAddMutation = graphql(`
  mutation CartLinesAddMutation($lines: [CartLineInput!]!, $cartId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
      warnings {
        code
        message
      }
    }
  }
`);

export const cartLinesRemoveMutation = graphql(`
  mutation CartLinesRemoveMutation($lineIds: [ID!]!, $cartId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {
      cart {
        ...Cart
      }
      userErrors {
        code
        field
        message
      }
      warnings {
        code
        message
      }
    }
  }
`);
