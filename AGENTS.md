# AGENTS.md — template-ecommerce

Monorepo guidelines for AI agents implementing the Next.js ecommerce frontend.

## Workspace layout

```
sanity/          — Typed GraphQL queries + codegen for Astro frontend
sanity-nextjs/   — Same as sanity/ but for Next.js (process.env, no astro:env)
shopify/         — Shopify Storefront API queries + client
frontend/        — Reference implementation: Astro frontend (read-only, do not edit)
frontend-nextjs/ — Target: Next.js frontend (what you build here)
cms/             — Sanity Studio config (schemas, structure)
```

## Philosophy

- **No comments** unless the code itself is not self-explanatory
- **Read the Astro source** in `frontend/src/` as the spec — every component, pattern, and data flow exists there
- **Files are short.** Components do one thing
- **Flat naming** over nested abstractions — `ProductPrice` not `PriceWidgetController`
- **Standard patterns everywhere** — copy the conventions, not just the logic

## Conventions

### Component structure

Every component follows this shape:

```tsx
import type { SomeFragment } from "sanity-nextjs/generated/graphql";
import { cn } from "@/lib/utils";

interface Props {
  someData: SomeFragment;
  className?: string;
}

export default function ComponentName({ someData, className }: Props) {
  if (!someData) return null;
  return <div className={cn("component-name", className)}>...</div>;
}
```

- Props interface at top, named `Props`
- Destructure in function signature
- Guard clause: `if (!data) return null` when data is nullable
- Default export, function declaration (not arrow)
- All imports at the top of the file — no inline `import()`, no inline `await import(...)`
- `cn()` used for conditional Tailwind classes
- Root element gets component's semantic class name (kebab-case, matching component name)

### Path aliases (`@/*` = `src/*`)

Directory map mirrors the Astro frontend:
```
src/
  blocks/       — Reusable UI blocks (PriceDisplay, QuantitySelector, LocaleSelector)
  components/   — Page-level chrome (Header, Footer, CookiesBanner)
  fields/       — Field renderers (SanityImage, SanityMedia, SanityLink, PortableText, MuxVideo)
  layouts/      — Composite layout primitives (Accordion, Carousel, Overlay, PageLayout)
  lib/          — Utility functions (fetches, Sanity image helpers, link resolution, Shopify helpers)
  meta/         — SEO/meta components
  sections/     — Section renderers + SectionsRenderer discriminator
  styles/       — Global CSS (reset, theme, fonts)
```

### Sections pattern

Pages are composed of sections discriminated by `__typename`. The `SectionsRenderer` maps typename → component:

```tsx
switch (section.__typename) {
  case "SectionHero":     return <SectionHero key={section._key} sectionData={section} />;
  case "SectionText":     return <SectionText key={section._key} sectionData={section} />;
  case "SectionCollection": return <SectionCollection key={section._key} sectionData={section} />;
  case "SectionAccordions": return <SectionAccordions key={section._key} sectionData={section} />;
}
```

### Data fetching

Two patterns, both server-side:

1. **Sanity-only** (pages, home, header, footer): call `sanityClient.request(query)` directly in the server component
2. **Shopify + Sanity merge** (products, collections): fetch from both APIs, merge into a typed composite object

Queries are imported from `sanity-nextjs/queries/*` (typed GraphQL documents). The client is `sanityClient` from `sanity-nextjs`.

Use `fetchProductShopifySanity(handle)` and `fetchCollectionShopifySanity(handle)` patterns from `frontend/src/lib/fetches/` — port these to `frontend-nextjs/src/lib/fetches/`.

### Styles

- **Tailwind v4** (`@import "tailwindcss"` + `@theme` block in `theme.css`)
- Design tokens via CSS custom properties mapped to Tailwind's `@theme`:
  - `--color-background` → `bg-background`
  - `--color-foreground` → `text-foreground`
  - `--color-accent` → `text-accent` / `bg-accent`
  - `--color-muted` → `text-muted`
  - `--color-surface` → `bg-surface`
  - `--color-border` → `border-border`
- **Color scheme** controlled via `data-color-scheme="light|dark"` on `<html>` — uses CSS `@media (prefers-color-scheme: dark)` as fallback
- **Responsive breakpoints**: 500px (mobile), 1000px (tablet-ish) — use Tailwind's `max-sm:` and `max-lg:` equivalents or custom
- **Spacing scale** from Astro: `--s4` through `--s400` (4px → 400px) — prefer Tailwind spacing utilities but keep custom values via `theme.css` `@theme` if needed
- Grid system: 16-column, container-max-width: 1400px, gutter 20px (16px mobile)

### Images

- `SanityImage` is a client component (`"use client"`) — uses Next.js `<Image>` with a custom loader
- LQIP blur-up: show base64 placeholder then fade to full image on load
- Layout modes: `width` (fill width), `height` (fill height), `cover`, `contain`
- Image loader constructs Sanity CDN URLs: `{url}?w={width}&fit=max&auto=format&q={quality}`

### Interactive components

Lean into React — use React-native primitives and packages, not web components. Each interactive component is a `"use client"` file. Keep them minimal — no compound component patterns, no render props.

**Carousel** — `"use client"`. Wraps `embla-carousel-react` (already installed) matching the Astro carousel API: `align`, `dragFree`, `loop`, `skipSnaps`, `slidesToScroll`. Expose `api` ref for external prev/next buttons. Accept children as slides.

**Overlay** — `"use client"`. State via `useState` (open/close). Expose `open()`/`close()`/`toggle()` methods via `useImperativeHandle` or lift state to parent. Lock scroll: set `overflow: hidden` on `document.scrollingElement`, store `window.scrollY`, restore on close. Close on Escape key + backdrop click. Layout modes: `fullscreen`, `right`. The cart overlay uses the `right` layout.

**Accordion** — `"use client"`. State via `useState`. Accept `group` prop — on open, dispatch `CustomEvent` so siblings close. Animate expand/collapse via CSS `grid-template-rows: 0fr / 1fr` transition. Slots: summary (header), content (expandable body).

**CookieBanner** — `"use client"`. Read localStorage for consent. Show banner if no consent stored. Accept/Decline write to localStorage with 30-day expiry. Uses `data-visible` attribute for show/hide.

**QuantitySelector** — `"use client"`. Controlled or uncontrolled input with min/max validation. Emit change event. Buttons disabled at bounds. Loading state via `data-state="updating"`.

**PriceDisplay** — `"use client"` or server component. Format amount using `Intl.NumberFormat` with currency code. Variants: `standard`, `compare-at` (line-through). Optional `prefix` ("from" for price ranges).

**Cart (full drawer)** — `"use client"`. Renders inside an Overlay. Subscribes to `$cart`, `$cartTotal`, `$cartLines`, `$checkoutUrl` from cart store. Renders line items, total, checkout button. Empty state message from Sanity `cartQuery`. Checkout redirects to Shopify `checkoutUrl`.

**CartButton** — `"use client"`. Subscribes to `$cartCount`. On click, sets `cartOpen` store to `true`.

**CartLineItem** — `"use client"`. Renders single cart line: image thumbnail, product title, variant title (hidden if single default variant), QuantitySelector, remove button, price with optional compare-at.

**ProductVariantSelector** — `"use client"`. Radio buttons for each product option. On change, finds matching variant by selected options, updates hidden `data-variant-id` input, dispatches `product:variant-change` event on parent `[data-product-root]`. Exposes variant data via `data-variants` JSON attribute.

**ProductAddToCart** — `"use client"`. Reads variant ID from hidden input + quantity from QuantitySelector. Calls `addToCart()` from cart store. Sets `cartOpen` to `true` on success. Shows loading state. Reads `availableForSale` from variant-change events.

**ProductPrice** — `"use client"`. Reads `data-prices` JSON from closest `[data-product-root]`. Renders price for current locale (lowest variant, "from" prefix for ranges). Listens to `product:variant-change` for variant-specific pricing. Shows compare-at price when present.

**LocaleSelector** — `"use client"`. Dropdown of available countries from Shopify `localizationsQuery`. On change, stores preference in `localStorage` and reloads page.

**MuxVideo** — `"use client"`. Renders `<MuxPlayer>` from `@mux/mux-player-react`. Blur-up placeholder via `@mux/blurup`. Aspect ratio from Mux asset data. Layout modes: `width`, `height`, `cover`, `contain`.

### State management (NanoStores)

Use NanoStores with `@nanostores/react`. Port store definitions from `frontend/src/stores/` as-is (framework-agnostic atom definitions). Use `useStore()` from `@nanostores/react` to subscribe.

**`stores/cart.ts`** — port verbatim. Defines `$cart` (persistent atom with JSON encode/decode), computed atoms (`$cartCount`, `$cartTotal`, `$checkoutUrl`, `$cartLines`, `$isCartEmpty`), and action functions (`loadCart`, `createCart`, `addToCart`, `updateLineQuantity`, `removeLine`). State is synced to localStorage and re-fetched from Shopify on load.

**`stores/ui.ts`** — simple `atom<boolean>`:
```ts
import { atom } from "nanostores";
export const cartOpen = atom(false);
export const setCartOpen = (open: boolean) => cartOpen.set(open);
```

Usage in React:
```tsx
import { useStore } from "@nanostores/react";
import { $cartCount, loadCart } from "@/stores/cart";

export default function CartButton() {
  const count = useStore($cartCount);
  useEffect(() => { loadCart(); }, []);
  return <button onClick={() => setCartOpen(true)}>Cart ({count})</button>;
}
```

### Cross-component communication

Some product components use custom DOM events on a shared `[data-product-root]` ancestor:
- `product:variant-change` — emitted when variant selection changes (detail: `{ variantId, availableForSale }`)
- `product:request-variant-update` — requests re-emission of current variant state

Use `useEffect` + `addEventListener` on the shared container ref. This pattern preserves the decoupled Astro-style communication without web components.

### Links

- `SanityLink` resolves any link type (page, URL, email, phone, file, section) to an `href`
- Page references need GROQ resolution to get `_type` + `slug` (GraphQL doesn't resolve references in Portable Text)
- Route patterns defined in `config.ts`: `SANITY_DOCUMENT_ROUTE_PATTERNS`

### Portable Text

Astro uses `astro-portabletext`. For Next.js, use `@portabletext/react` with a minimal component map:
- `block` → Tailwind-styled paragraphs/headings
- `marks` → link/italic renderers

### Font

Loaded via `next/font/local`: `BIZUDMincho-Regular.woff2` from `public/fonts/`.

### Inline scripts

**Spacing** — sets `--vw` and `--scrollbar` CSS custom properties on `<html>` at page load and on resize. Port as a `"use client"` component with a `ResizeObserver` or `useEffect`.

**Text fill width** — scales headings with `data-text-fill-width` attribute to exactly fit their parent container width. Used by `SectionHero` headings. Port as a `"use client"` component that runs on mount + resize.

### Next.js config

```ts
const nextConfig: NextConfig = {
  reactCompiler: true,
};
```

## Pages to implement (in order)

1. **`/`** — Home page: fetch `homeQuery`, render `SectionsRenderer`
2. **`/products/[slug]`** — Product page: `fetchProductShopifySanity(slug)`, render product sections
3. **`/collections/[slug]`** — Collection page: `fetchCollectionShopifySanity(slug)`, render product grid + hero
4. **`/[slug]`** — Generic pages: fetch `pageQuery`, render `SectionsRenderer`
5. **404** — Not found page

## Sections to implement

- `SectionHero` — Done. Reference for the pattern. Heading uses `data-text-fill-width` + animated color cycling
- `SectionText` — Portable Text block, centered
- `SectionCollection` — Fetch Shopify collection by handle from the section's collection reference, render product grid
- `SectionAccordions` — Accordion group with Portable Text content

## Fields to implement

- `SanityImage` — Done
- `SanityMedia` — Discriminate `image` vs `video`, delegate
- `SanityLink` — Resolve href, render `<a>` or `<Link>` with target/rel
- `PortableText` — `@portabletext/react` wrapper
- `MuxVideo` — `<mux-player>` web component

## Product sections to implement

- `ProductSection` — Main product layout (gallery + purchase sidebar)
- `ProductGallery` — Thumbnail + gallery images as vertical stack
- `ProductPurchase` — Title, price, variant selector, add-to-cart, quantity
- `ProductPrice` — Localized price display (compare-at, prefix "from")
- `ProductVariantSelector` — Option buttons, dispatches variant-change events
- `ProductAddToCart` — Cart integration button
- `ProductThumbnail` — Thumbnail card for grids
- `ProductThumbnailsGrid` — Mosaic grid (every 6th item spans 2 cols)
- `RelatedProductsSection` — Related products grid
- `QuantitySelector` — +/- quantity control
- `PriceDisplay` — Formatted price display with currency symbol

## Shopify integration

### Package structure

The `shopify/` workspace mirrors `sanity/`:  typed GraphQL queries/mutations via codegen, a `shopifyClient` (`GraphQLClient` with `X-Shopify-Storefront-Access-Token`), and config with store domain + API version.

### Client usage

```ts
import { shopifyClient } from "shopify/client";
import { productByHandleQuery } from "shopify/queries/product";

const { productByHandle } = await shopifyClient.request(productByHandleQuery, { handle });
```

Country-specific pricing uses `@inContext(country: $countryCode)` on queries.

### Shopify utility (`shopify/utils/ids`)

- `shopifyIdFromGid(gid: string): string` — extract numeric ID from `gid://shopify/Product/123`
- `shopifyGidFromId(resource, id): string` — reverse

### Locale system (`frontend/src/lib/shopify/locale.ts`)

`LOCALE_CONFIG` maps locale codes (`en-AU`, `en-NZ`, `en-US`) to Shopify country/currency/language codes. `getStoredLocale()` reads from `localStorage`, `getCountryCode()` / `getCurrency()` derive from it. Port this file as-is (no framework deps).

### Cart API (`frontend/src/lib/shopify/cart.ts`)

Just two helpers:
- `getStorageKey(suffix)` — scoped cart localStorage key (`shopify_${locale}_${currency}_${suffix}`)
- Constants `CART_ID_STORAGE_KEY_SUFFIX`, `CART_DATA_STORAGE_KEY_SUFFIX`

### Data fetching pattern (Shopify + Sanity merge)

Port `frontend/src/lib/fetches/productShopifySanity.ts` and `collectionShopifySanity.ts`. These fetch from both APIs in parallel, merge into typed composites (`ProductShopifySanity`, `CollectionShopifySanity`). Product fetches also resolve `pricesPerLocale` (one price query per locale) and `relatedProducts` (recursive thumbnail fetches). Collection fetches resolve its product thumbnails the same way.

## What NOT to do

- No shadcn/ui or component libraries
- No `useEffect` for things that should be events
- No over-abstraction — don't create wrappers around `<a>` or `<img>`
- No CSS-in-JS — Tailwind only
- No server actions for data fetching — use server components with direct async data fetching
- No loading.tsx / error.tsx boilerplate unless spec'd

## Reference chain

When implementing any component:
1. Read the equivalent in `../frontend/src/` first
2. Note the data types from `sanity-nextjs/generated/graphql`
3. Follow the conventions above
4. Port logic exactly, adapt rendering to React/JSX
