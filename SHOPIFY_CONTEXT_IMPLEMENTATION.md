# Shopify @inContext Implementation

This document explains how Shopify's `@inContext` directive is implemented site-wide for automatic localization.

## Overview

All Shopify GraphQL queries and mutations now automatically include the `@inContext` directive with the appropriate `country` and `language` parameters based on the current locale.

## How It Works

### 1. Updated Queries & Mutations

All Shopify queries and mutations now accept `country` and `language` parameters and use the `@inContext` directive:

```graphql
query ProductByHandle($handle: String!, $country: CountryCode, $language: LanguageCode)
@inContext(country: $country, language: $language) {
  productByHandle(handle: $handle) {
    ...Product
  }
}
```

**Updated files:**
- `shopify/queries/product.ts`
- `shopify/queries/collection.ts`
- `shopify/queries/cart.ts`
- `shopify/mutations/cart.ts`

### 2. Context Helper Functions

**Server-side (Astro components):**

```typescript
// frontend/src/lib/shopify.ts

// Get context variables from pathname
const context = getShopifyContextVars(Astro.url.pathname);

// Use with queries
await shopifyClient.request(productQuery, { 
  handle: "my-product",
  ...context  // Adds country & language
});
```

**Client-side (Web Components):**

```typescript
// Get context from DOM
function getShopifyContext() {
  const country = document.documentElement.dataset.country || "AU";
  const language = document.documentElement.dataset.language || "EN";
  return { country, language };
}

// Use with mutations
const context = getShopifyContext();
await shopifyClient.request(cartCreateMutation, {
  cartInput: { ... },
  ...context
});
```

### 3. DOM Context

The PageLayout sets context on the HTML element for client-side access:

```astro
<html
  lang={currentLocale}
  data-locale={currentLocale}
  data-currency={localeConfig.currency}
  data-country={localeConfig.country}
  data-language={localeConfig.language}
>
```

## Usage Examples

### Server-Side (Astro Components)

```astro
---
import { shopifyClient } from "shopify/client";
import { productByHandleQuery } from "shopify/queries/product";
import { getShopifyContextVars } from "../lib/shopify";

const context = getShopifyContextVars(Astro.url.pathname);

const product = await shopifyClient.request(productByHandleQuery, {
  handle: "my-product",
  ...context
});
---
```

### Client-Side (Web Components)

```typescript
function getShopifyContext() {
  const country = document.documentElement.dataset.country || "AU";
  const language = document.documentElement.dataset.language || "EN";
  return { country, language };
}

async function addToCart() {
  const context = getShopifyContext();
  
  await shopifyClient.request(cartLinesAddMutation, {
    cartId: "...",
    lines: [...],
    ...context
  });
}
```

## Updated Components

All components that make Shopify requests have been updated:

**Server-side:**
- `frontend/src/lib/fetches/productShopifySanity.ts`
- `frontend/src/sections/SectionCollection.astro`

**Client-side:**
- `frontend/src/components/cart/Cart.astro`
- `frontend/src/sections/product/ProductAddToCart.astro`

## Next Steps

After implementing these changes:

1. **Regenerate GraphQL types:**
   ```bash
   cd shopify
   pnpm codegen
   ```

2. **Test with different locales:**
   - Switch between markets using the LocaleSelector
   - Verify prices show in correct currency
   - Check that translated content appears (if available in Shopify)

3. **Add more locales:**
   ```typescript
   // frontend/src/lib/locale.ts
   export const LOCALE_CONFIG = {
     "fr-CA": {
       language: "FR",
       country: "CA", 
       currency: "CAD",
       label: "Canada (French)",
       pathPrefix: "/fr",
       default: false,
     },
     // ... existing locales
   };
   ```

## Benefits

✅ **Automatic localization** - All Shopify data is contextualized  
✅ **Currency-aware** - Prices shown in correct currency  
✅ **Translation support** - Content translated based on language  
✅ **Clean implementation** - Context passed automatically via helper functions  
✅ **Type-safe** - Full TypeScript support with codegen

## Important Notes

- Context variables are **optional** in all queries - they default to shop's primary market if not provided
- The `@inContext` directive only affects Shopify data, not Sanity CMS content
- Client-side code reads context from DOM data attributes set by server
- Cart operations are locale-specific (separate carts per locale/currency)
