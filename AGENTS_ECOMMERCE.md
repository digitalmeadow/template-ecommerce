# AGENTS_ECOMMERCE.md — Shopify, cart, products

Read `AGENTS.md` first, then the frontend file (`AGENTS_ASTRO.md` / `AGENTS_NEXTJS.md`). Paths below are relative to either frontend's `src/` unless stated.

## Sources of truth

- **Shopify** owns commerce data: title, handle, price, variants, availability, collections membership.
- **Sanity** owns editorial data on synced `product` / `productVariant` / `collection` documents (media, accordions, related products, meta). Those documents are created by Sanity Connect via the api worker's `/api/shopify-sanity-sync` (Astro) — never create or duplicate them in the Studio.
- Products and collections route by `shopify.handle`, not a Sanity slug.

## `shopify/` package

Typed Storefront API fragments/queries via codegen, a `shopifyClient` (`GraphQLClient` with `X-Shopify-Storefront-Access-Token`), config with store domain + API version, and `utils/ids` (`shopifyIdFromGid`, `shopifyGidFromId`).

```ts
import { shopifyClient } from "shopify/client";
import { productByHandleQuery } from "shopify/queries/product";
const { productByHandle } = await shopifyClient.request(productByHandleQuery, { handle });
```

Country-specific pricing uses `@inContext(country: $countryCode)`.

## Merged fetches (`lib/fetches/`)

`fetchProductShopifySanity(handle, sanityProduct?)` and `fetchCollectionShopifySanity(handle, sanityCollection?)` fetch both APIs in parallel and merge into `ProductShopifySanity` / `CollectionShopifySanity`.

- Pass the Sanity document when the route already holds it (it does — see route data in `AGENTS.md`) to skip a Sanity request.
- `fetchProductThumbnailShopifySanity` and prices-per-locale are `buildScopedByKey` — each product's thumbnail and prices are fetched once per build however many pages show them.
- Collection thumbnails fetch in parallel; a failed thumbnail is logged and skipped.
- Shopify localization (locale selector options) is `buildScoped`.

## Locales

`lib/shopify/locale.ts`: `LOCALE_CONFIG` maps locale codes (`en-AU`, `en-NZ`, `en-US`) to Shopify country/currency/language. `getStoredLocale()` reads `localStorage`; `getCountryCode()` / `getCurrency()` derive from it. The locale selector stores the choice and reloads. Prices for every locale are baked in at build (`pricesPerLocale`) and picked client-side.

## Cart (nanostores)

`stores/cart.ts` — `$cart` (persistent atom), computed `$cartCount`, `$cartTotal`, `$checkoutUrl`, `$cartLines`, `$isCartEmpty`, and actions `loadCart`, `createCart`, `addToCart`, `updateLineQuantity`, `removeLine`. Synced to `localStorage` under a locale/currency-scoped key (`lib/shopify/cart.ts` `getStorageKey`) and re-fetched from Shopify on load.

`stores/ui.ts` — `cartOpen` atom + `setCartOpen`. The cart drawer (Overlay `right`) subscribes; checkout redirects to `$checkoutUrl`.

The cart is persisted chrome: `loadCart()` runs once from the cart itself, not from every button or page.

## Product components and events

Product components communicate through DOM events on a shared `[data-product-root]` ancestor:

- `product:variant-change` — `{ variantId, availableForSale }`, emitted when the selected options change.
- `product:request-variant-update` — asks the selector to re-emit current state.

`ProductVariantSelector` (option radios → matching variant, `data-variants` JSON), `ProductPrice` (reads `data-prices` for the current locale, "from" prefix for ranges, compare-at), `ProductAddToCart` (variant id + quantity → `addToCart`, opens the cart), `QuantitySelector` (min/max, `data-state="updating"`), `PriceDisplay` (`Intl.NumberFormat`, `standard` | `compare-at`).

## Structured data

Product pages emit a `Product` schema with an `AggregateOffer` (min/max price, currency, availability) and the organisation as brand.

## What NOT to do

- No per-page Shopify requests that could be shared (thumbnails, prices, localization) — go through the keyed caches.
- No editing synced Shopify fields in Sanity; they're overwritten on sync.
- No duplicate/unpublish of product variants in the Studio (actions are removed deliberately).
