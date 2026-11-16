# AGENTS_ECOMMERCE.md — Shopify, cart, products

Read `AGENTS.md` first, then the frontend file (`AGENTS_ASTRO.md` / `AGENTS_NEXTJS.md`). Paths below are relative to either frontend's `src/` unless stated.

## Sources of truth

- **Shopify** owns commerce data: title, handle, price, variants, availability, collections membership.
- **Sanity** owns editorial data on synced `product` / `productVariant` / `collection` documents (media, accordions, related products, meta). Those documents are created by Sanity Connect via production's `/api/shopify-sanity-sync` (secret-protected, see `AGENTS.md` Deployment) — never create or duplicate them in the Studio.
- Products and collections route by `shopify.handle`, not a Sanity slug.

## `shopify/` package

Typed Storefront API fragments/queries via codegen, `createShopifyClient` (fetch; public or private token, optional buyer IP, no redirects, 30s timeout, `ShopifyError`, queries retry on 5xx/429/`THROTTLED`, mutations never), config with store domain + API version, and `utils/ids` (`shopifyIdFromGid`). `shopifyClient` is the public-token client straight to the store (`introspect`).

Codegen reads the committed `shopify/schema.json`, so `pnpm gen` runs offline. Bump `SHOPIFY_API_VERSION` to the latest stable each quarter, then refresh it with `pnpm --filter shopify introspect`.

Server client (`lib/shopify/`, both frontends; Next marks these `server-only`):

- `shopifyServer` (`serverClient.ts`) — private token, for build-time reads. `createBuyerShopifyClient(request)` adds the buyer IP for on-demand routes acting for a buyer.

```ts
import { productByHandleQuery } from "shopify/queries/product";
import { shopifyServer } from "@lib/shopify/serverClient";

const { product } = await shopifyServer.request(productByHandleQuery, { handle });
```

Country-specific pricing uses `@inContext(country: $country)`. Shopify silently answers an unknown or disabled country with the primary market, so market-specific reads go through `requestWithContext` and compare `context.country` with the country requested. Currency always comes from the response `Money` (`currencyCode`), never from config.

## Shopify routes (on-demand)

Same paths and contracts in both frontends (Astro `pages/`, Next `app/**/route.ts`), except where noted.

- `/api/{version}/graphql.json` — Storefront API proxy (`lib/shopify/proxy.ts`). Forwards an allowlist of headers, swaps in the private token + `Shopify-Storefront-Buyer-IP`, and returns Shopify's session cookies only on POSTs that already hold `_shopify_essential` or are the consent script's `Shopify-Storefront-Consent-Management: 1` request. Shopify's consent/analytics scripts call it too, so it must stay same-origin and unprefixed.
- `/api/cart`, `/checkout` — the cart (see Cart).
- `/api/product` — live price and stock for a product page.
- `/partials/product-browser`, `/partials/predictive-search` — on-demand HTML (see Collections and search). Next: `/api/product-browser`, `/api/predictive-search` return JSON that client components render.
- `/cart/{variantId}:{qty},…` — cart permalinks, redirected to the store.
- Unclaimed paths: Shopify default paths (`/pages/x`, `/collections/x/products/y`) → ours, then the store's URL redirects, then the 404 page with a 404 status. Astro: `[...notFound].ts` at request time (`lib/shopify/redirects.ts`, edge-cached an hour; `respondNotFound`, `lib/responses.ts`). Next: `buildRedirects()` (`lib/shopify/redirects.ts`) bakes them into `next.config.ts` `redirects()` at build (an admin change lands on the next build); `app/[locale]/[...notFound]` renders the 404.

## Merged fetches (`lib/fetches/`)

`fetchProductShopifySanity(handle, locale, sanityProduct?)` and `fetchCollectionShopifySanity(handle, locale, sanityCollection?)` fetch both APIs in parallel and merge into `ProductShopifySanity` / `CollectionShopifySanity`.

- Pass the Sanity document when the route already holds it (it does — see route data in `AGENTS.md`) to skip a Sanity request.
- Shopify reads are `@inContext(country, language)` and cached per `{locale}:{handle}`; Sanity is market-neutral, so extra locales cost Shopify requests, never Sanity ones. A locale Shopify has no market for warns and shows primary-market prices.
- Thumbnails pair a Shopify `ProductCard` with its Sanity thumbnail from one build-wide query (`fetchSanityProductThumbnails` → `pairProductThumbnails`); a product missing from either is skipped. Collections return their cards directly; related products fetch cards by handle (`fetchProductThumbnailsByHandle`). Collection sections are cached per locale and handle (`fetchShopifyCollectionWithThumbnails`).
- Shopify localization (locale selector options) is `buildScoped`.

## Locales

One locale per Shopify market, in `LOCALES` (`config.ts`: `path`, `country`, `language`, `label`; currency always comes from Shopify). The first is the default and is served unprefixed; the rest live at `/{path}/…`. When the build starts, `getSellableLocales` (`astro.config.mjs` / `next.config.ts`) drops locales Shopify no longer sells to, and fails the build if the default's country has no market; `LOCALE_LIST` is that filtered list.

- Astro i18n `fallback` with `fallbackType: "rewrite"` builds every locale from the same page files, so pages never branch on locale beyond reading `getLocale(Astro.currentLocale)`. On those pages `Astro.url` is the unprefixed path.
- Next: pages live under `app/[locale]` (the root layout; static params from `LOCALE_LIST`). `src/proxy.ts` rewrites unprefixed URLs to the default's segment and 301s the default prefix. Server components read `getRenderLocale()` (`lib/shopify/renderLocale.ts`, `next/root-params`), client components `useLocale()`; route handlers take `?locale=`.
- Internal hrefs go through `localizeHref(href, locale)` (`SanityLink`, header logo, thumbnails, cart lines, JSON-LD URLs). Browser code reads the page's locale with `getPageLocale()` (`<html data-locale>`).
- `PageLayout` sets `lang` (`getHtmlLang`: `en-AU`), the localized canonical and hreflang alternates (+ `x-default`); the sitemap lists default URLs with every locale as an alternate.
- `/en-au/…` (default prefix) 301s to the unprefixed path (Astro: the catch-all; Next: the proxy).
- The selector (`LocaleSelector`) lists locales Shopify has a market for, labelled with Shopify's currency, and `switchLocale()` navigates to the same page in the other locale.

## Location notice

`LocationNotice` suggests the visitor's store and never redirects. The country comes from `/api/geo`: CF-IPCountry on the Astro worker, `x-vercel-ip-country` on Vercel (Next). It's fetched once per session (`lib/shopify/geo.ts`) and mapped to a locale. The notice appears only when that store differs from the page's locale and the visitor hasn't dismissed it for that country. While the cookie banner can show, it waits for a consent decision so the two never stack. Copy is the `locationNotice` singleton; `{market}` is replaced with the store label. There's no geo header in dev or locally, so no notice.

## Cart

### Server-owned

The cart lives on the server (both frontends); the browser never builds GraphQL for it.

- `/api/cart` (`pages/api/cart.ts` → `performCartAction` in `lib/shopify/cartServer.ts`): `GET ?locale=` returns the cart, `POST` runs one `CartAction` (`lib/shopify/cartActions.ts`: `add`, `update`, `remove`, `discount-apply`/`-remove`, `gift-card-apply`/`-remove`, `note`, `attributes`) as JSON `{ locale, action }` or a native form post (`intent` + fields; answers 303 back to the referer, so add to cart works without JS). Private token + buyer IP. Cross-site form posts are rejected (Astro's origin check; Next checks `Origin` in the handler).
- The cart id is the `cart` cookie (`lib/shopify/cartCookie.ts`: token without the gid prefix, 14 days, `SameSite=Lax`, readable by JS). The server sets it on create and clears it when the cart is dead.
- Dead carts (expired, or completed at checkout: `cart: null` / a `cartId` userError) are replaced on `add` and dropped otherwise. A cart from another market is moved to the request's locale (`cartBuyerIdentityUpdate`), so one cart follows the buyer across locales.
- Every mutation returns `userErrors` + `warnings`, mapped to `CartMessage`s pinned to the line (`lineId`) or discount code they concern. Silent failures are detected: merchandise dropped by the market, a gift card that didn't apply. A discount code Shopify doesn't recognise is taken back off the cart (it would otherwise stay, inapplicable, re-warning on every change).
- `/checkout` reads the cookie and redirects to a fresh `checkoutUrl` (it changes with the cart and consent); the drawer's checkout is a plain link to it.

`stores/cart.ts`: `$cart` is a `persistentJSON` snapshot (`cart-snapshot`) painted on load before the refresh lands, cleared when the cookie is gone. `$cartMessages`, `$cartPending` (line ids, or `add`/`discount`/`gift-card`/`note`/`attributes`), computed `$cartLines`, `$cartCount` (`totalQuantity`), `$cartSubtotal`, `$cartTotal`. Actions: `loadCart`, `addToCart`, `updateLineQuantity`, `removeLine`, `applyDiscountCode`, `removeDiscountCode`, `applyGiftCard`, `removeGiftCard`, `updateNote`, `updateAttributes`. Requests run one at a time (no out-of-order responses); quantity changes and removals are optimistic and roll back on failure.

The drawer (Astro `Cart.astro`, persisted chrome; Next `Cart` + `CartClient`) runs `loadCart()` once per visit. It renders lines, discount and gift card forms, the order note (saved on change), the total, and cart-level messages in a `role="alert"` region; `CartLineItem` shows its own messages and caps quantity at `quantityAvailable` when Shopify reports it.

## Product page

Fragments: `ProductCard` (thumbnails, collection grids) and `Product` (product pages: options with `optionValues` + swatches, every variant via `variants(first: 250)`). Option state is computed from the variant list, so stores must stay under 250 variants per product (Shopify's encoded variant strings would otherwise be needed). Images use `url(transform:)` (`Image` fragment). A product active in Sanity but missing from the Headless channel is left out of the build with a warning (`isProductInShopify`), and `fetchProductShopifySanity` returns null for it.

Astro components communicate through DOM events on a shared `[data-product-root]` ancestor (types in `lib/events.ts`; helpers in `lib/shopify/variants.ts`):

- `product:variant-change` — `{ variant }` (id, options, availability, stock, price), emitted when the selection changes.
- `product:request-variant-update` — asks the selector to re-emit; components send it on init.
- `product:live-data` — `{ availableForSale, variants }` from `ProductLive`.

Next: `ProductPurchase` (client) owns the selection and live data and passes them down as props; same behaviour below.

- `ProductVariantSelector` — the static HTML opens on the first available variant (`getInitialVariant`); the script applies `?Color=Red&Size=M` (and maps Liquid's `?variant=<id>` to it), keeps the URL in sync with `history.replaceState`, and marks each value `data-exists` / `data-available` for the current selection. Picking any value lands on a real variant (`resolveVariant`).
- `ProductLive` — fetches `/api/product?handle=&locale=` (live price and stock, edge/CDN-cached 60s) and dispatches `product:live-data`; the built values stay until it lands, so nothing flashes.
- `ProductPrice` — cards: price range ("from"); product pages: the opening variant's price, following `product:variant-change`. Compare-at only renders when discounted.
- `ProductAddToCart` — submit button of `ProductPurchase`'s `<form action="/api/cart">` (works without JS); JS intercepts → `addToCart`, opens the cart. "Sold Out" and the quantity cap (`quantityAvailable`) follow the selected variant.
- `PriceDisplay` — `formatMoney` (`lib/shopify/money.ts`), rendered into the static HTML and reformatted when `amount`/`currency` change.

## Collections and search

`ProductBrowser` (sort, facets, grid, load more) serves collection pages and `/search`. The static page holds the default first page (`PRODUCTS_PER_PAGE`, built with the market's prices); filtering, sorting, paging and search re-render it on the worker at `/partials/product-browser` (same components, swapped in by the element). URLs use Shopify's Liquid parameters (`filter.p.vendor`, `filter.v.option.color`, `filter.v.price.gte`, `sort_by=price-ascending`; `lib/shopify/filters.ts`), built from each facet value's `input`. Without JS the controls are a GET form.

- Partials render outside their locale's URL, so they set `Astro.locals.locale`; components read the locale with `getRenderLocale(Astro)`, never `Astro.currentLocale` directly. Next's JSON endpoints take `?locale=` and the browser renders with `useLocale()`.
- Grids pair Shopify `ProductCard`s with Sanity thumbnails. At build that's one Sanity query for every product (`fetchSanityProductThumbnails`); on the worker it's `/product-thumbnails.json`, built once per deploy, so on-demand routes never call Sanity.
- Header search (`SearchForm`) is a GET form to `/search`; as you type it shows `/partials/predictive-search` (products, collections, query suggestions; 150ms debounce, aborts stale requests). `/search` is noindex and out of the sitemap.

## Accounts and policies

- The header links to Shopify-hosted customer accounts (`getCustomerAccountUrl()`: the vanity domain when set, else `shopify.com/{shopId}/account`). The Customer Account API isn't wired; add it per project if accounts must live on-site.
- Store policies written in Shopify admin build at `/policies/{handle}` (Shopify's own paths) and are linked from the footer.

## Structured data

Product pages emit a `ProductGroup` (`variesBy` for color/size/material/pattern options) with one `Product` + `Offer` per variant (sku, gtin, price, currency, availability, option URL); single-variant products emit a plain `Product`.

## What NOT to do

- No per-page Shopify requests that could be shared (thumbnails, prices, localization) — go through the keyed caches.
- No Sanity requests from on-demand routes (partials, `/api/*` buyer endpoints) — they'd be metered per visit; use build output like `/product-thumbnails.json`.
- No `getLocale(Astro.currentLocale)` in components — `getRenderLocale(Astro)`, so partials render in the right market.
- No editing synced Shopify fields in Sanity; they're overwritten on sync.
- No duplicate/unpublish of product variants in the Studio (actions are removed deliberately).
