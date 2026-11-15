import { graphql } from "../generated";

// Every mutation answers 200 even when Shopify rejects the change; the reasons are in
// userErrors (rejected) and warnings (applied with caveats, e.g. less stock than asked for).

export const cartCreateMutation = graphql(`
  mutation CartCreateMutation($input: CartInput, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
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
        target
      }
    }
  }
`);

export const cartLinesAddMutation = graphql(`
  mutation CartLinesAddMutation(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
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
        target
      }
    }
  }
`);

export const cartLinesUpdateMutation = graphql(`
  mutation CartLinesUpdateMutation(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
        target
      }
    }
  }
`);

export const cartLinesRemoveMutation = graphql(`
  mutation CartLinesRemoveMutation(
    $cartId: ID!
    $lineIds: [ID!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
        target
      }
    }
  }
`);

// A cart's market is fixed when it's created; changing locale moves it to the new one.
export const cartBuyerIdentityUpdateMutation = graphql(`
  mutation CartBuyerIdentityUpdateMutation(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
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
        target
      }
    }
  }
`);

// Replaces the whole list: pass every code that should stay applied.
export const cartDiscountCodesUpdateMutation = graphql(`
  mutation CartDiscountCodesUpdateMutation(
    $cartId: ID!
    $discountCodes: [String!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
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
        target
      }
    }
  }
`);

export const cartGiftCardCodesAddMutation = graphql(`
  mutation CartGiftCardCodesAddMutation(
    $cartId: ID!
    $giftCardCodes: [String!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartGiftCardCodesAdd(cartId: $cartId, giftCardCodes: $giftCardCodes) {
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
        target
      }
    }
  }
`);

export const cartGiftCardCodesRemoveMutation = graphql(`
  mutation CartGiftCardCodesRemoveMutation(
    $cartId: ID!
    $appliedGiftCardIds: [ID!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartGiftCardCodesRemove(cartId: $cartId, appliedGiftCardIds: $appliedGiftCardIds) {
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
        target
      }
    }
  }
`);

export const cartNoteUpdateMutation = graphql(`
  mutation CartNoteUpdateMutation(
    $cartId: ID!
    $note: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
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
        target
      }
    }
  }
`);

// Replaces every cart attribute; they carry over to the order.
export const cartAttributesUpdateMutation = graphql(`
  mutation CartAttributesUpdateMutation(
    $cartId: ID!
    $attributes: [AttributeInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
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
        target
      }
    }
  }
`);
