import { graphql } from "../generated";

export const cartByIdQuery = graphql(`
  query CartById($cartId: ID!) {
    cart(id: $cartId) {
      ...Cart
    }
  }
`);
