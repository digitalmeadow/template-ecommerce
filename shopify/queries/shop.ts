import { graphql } from "../generated";

export const shopQuery = graphql(`
  query ShopQuery {
    shop {
      id
      name
      customerAccountUrl
    }
  }
`);

// The store's legal pages, authored in Shopify admin (Settings → Policies).
export const shopPoliciesQuery = graphql(`
  query ShopPoliciesQuery($language: LanguageCode) @inContext(language: $language) {
    shop {
      privacyPolicy {
        ...ShopPolicy
      }
      refundPolicy {
        ...ShopPolicy
      }
      shippingPolicy {
        ...ShopPolicy
      }
      termsOfService {
        ...ShopPolicy
      }
    }
  }
`);
