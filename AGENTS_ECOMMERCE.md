# AGENTS_ECOMMERCE.md — Shopify, cart, products

Read `AGENTS.md` first, then the frontend file (`AGENTS_ASTRO.md` / `AGENTS_NEXTJS.md`). Paths below are relative to either frontend's `src/` unless stated.

## Sources of truth

- **Shopify** owns commerce data: title, handle, price, variants, availability, collections membership.
- **Sanity** owns editorial data on synced `product` / `productVariant` / `collection` documents (media, accordions, related products, meta). Those documents are created by Sanity Connect via the api worker's `/api/shopify-sanity-sync` (Astro; secret-protected, see `AGENTS.md` Deployment) — never create or duplicate them in the Studio.
- Products and collections route by `shopify.handle`, not a Sanity slug.

## `shopify/` package

Typed Storefront API fragments/queries via codegen, a `shopifyClient` (`GraphQLClient` with `X-Shopify-Storefront-Access-Token`), config with store domain + API version, and `utils/ids` (`shopifyIdFromGid`).

Codegen reads the committed `shopify/schema.json`, so `pnpm gen` runs offline. After bumping `SHOPIFY_API_VERSION`, refresh it with `pnpm --filter shopify introspect`.

```ts
import { shopifyClient } from "shopify/client";
import { productByHandleQuery } from "shopify/queries/product";
const { product } = await shopifyClient.request(productByHandleQuery, { handle });
```

Country-specific pricing uses `@inContext(country: $countryCode)`. Shopify silently answers an unknown or disabled country with the primary market, so market-specific reads go through `shopifyRequestWithContext` and compare `context.country` with the country requested. Currency always comes from the response `Money` (`currencyCode`), never from `LOCALE_CONFIG`.

## Merged fetches (`lib/fetches/`)

`fetchProductShopifySanity(handle, sanityProduct?)` and `fetchCollectionShopifySanity(handle, sanityCollection?)` fetch both APIs in parallel and merge into `ProductShopifySanity` / `CollectionShopifySanity`.

- Pass the Sanity document when the route already holds it (it does — see route data in `AGENTS.md`) to skip a Sanity request.
- `fetchProductThumbnailShopifySanity` is `buildScopedByKey`, so each thumbnail is fetched once per build.
- Prices: `productPricesQuery` pages through every product once per locale (`buildScopedByKey` on the locale), so a build costs one request per market. Locales Shopify has no market for are omitted, and readers fall back to `DEFAULT_LOCALE`.
- Thumbnails fetch in parallel; a failed one is logged and skipped. Every path (collection pages, collection sections, related products) goes through `fetchProductThumbnailsShopifySanity`, and collection sections are cached per handle (`fetchShopifyCollectionWithThumbnails`).
- Shopify localization (locale selector options) is `buildScoped`.

## Locales

`lib/shopify/locale.ts`: `LOCALE_CONFIG` maps locale codes (`en-AU`, `en-NZ`, `en-US`) to Shopify country/currency/language. `getStoredLocale()` reads `localStorage`; `getCountryCode()` / `getCurrency()` derive from it. The locale selector stores the choice and reloads. Prices for every locale are baked in at build (`pricesPerLocale`) and picked client-side.

## Location notice

`LocationNotice` suggests the visitor's store and never redirects. The country comes from `/api/geo`: CF-IPCountry on the Astro worker, and CF-IPCountry or `x-vercel-ip-country` in Next. It's fetched once per session (`lib/shopify/geo.ts`) and mapped to a `LOCALE_CONFIG` entry. The notice appears only when that store differs from the stored locale and the visitor hasn't dismissed it for that country. While the cookie banner can show, it waits for a consent decision so the two never stack. Copy is the `locationNotice` singleton; `{market}` is replaced with the store label. There's no geo header in dev or locally, so no notice.

## Cart (nanostores)

`stores/cart.ts` — `$cart`, `$cartError`, computed `$cartCount`, `$cartTotal`, `$checkoutUrl`, `$cartLines`, and actions `loadCart`, `addToCart`, `updateLineQuantity`, `removeLine`.

One storage mechanism: `$cart` is a `persistentJSON<CartFragment | undefined>` under a locale/currency-scoped key (`getCartStorageKey()` in `lib/shopify/cart.ts`; Next: `cart.client.ts` → `shopify_{locale}_{currency}_cart`). The whole cart is the stored value; its `id` is the cart id (no separate id key). Setting `undefined` removes the key. The key is fixed at module load, which is safe because changing locale reloads the page. Next: on the server there's no storage, so `$cart` stays empty there; the stored cart is read before hydration, so components hydrate with `useStore(store, { ssr: () => emptyValue })`. `loadCart()` renders the stored cart instantly, then refreshes it from Shopify (a `null` reply — expired/completed — clears it).

`stores/ui.ts` — `$cartOpen` atom + `setCartOpen`. The cart drawer (Overlay `right`) subscribes; checkout redirects to `$checkoutUrl`.

The cart is persisted chrome: `loadCart()` runs once from the cart itself (Astro: `Cart.astro`'s module script; Next: `CartClient` mount effect), not from every button or page.

`cartCreate` sets `buyerIdentity.countryCode` to fix the checkout currency. Mutations answer 200 even when Shopify rejects a change, so every payload goes through `applyCartPayload`. It reads `userErrors`/`warnings` and catches lines that were silently dropped (merchandise not sold in the market), then sets `$cartError`, which the cart announces in a `role="alert"` region.

## Product components and events

Product components communicate through DOM events on a shared `[data-product-root]` ancestor (types in `lib/events.ts`; `Variant` + `DEFAULT_VARIANT_TITLE` in `lib/shopify/variants.ts`):

- `product:variant-change` — `{ variantId, availableForSale }`, emitted when the selected options change.
- `product:request-variant-update` — asks the selector to re-emit current state.

`ProductMain` (gallery, purchase, accordions; `.product-main`) and `ProductRelated` (carousel `#product-related-carousel`) make up the product page. `ProductVariantSelector` (option radios → matching variant, `data-variants` JSON), `ProductPrice` (reads `data-prices` for the current locale, "from" prefix for ranges, compare-at), `ProductAddToCart` (variant id + quantity → `addToCart`, opens the cart), `QuantitySelector` (min/max, `data-state="updating"`), `PriceDisplay` (`Intl.NumberFormat`, `standard` | `compare-at`).

## Structured data

Product pages emit a `Product` schema with an `AggregateOffer` (min/max price, currency, availability) and the organisation as brand.

## What NOT to do

- No per-page Shopify requests that could be shared (thumbnails, prices, localization) — go through the keyed caches.
- No editing synced Shopify fields in Sanity; they're overwritten on sync.
- No duplicate/unpublish of product variants in the Studio (actions are removed deliberately).
