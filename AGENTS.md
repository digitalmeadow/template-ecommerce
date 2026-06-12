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

Lean into React — use React-native primitives and packages, not web components.

**Carousel** — `embla-carousel-react` (already installed). Thin wrapper matching the Astro Carousel API (align, dragFree, loop, skipSnaps, slidesToScroll).

**Accordion** — `"use client"` React component with `useState` for open/close. Accept `group` prop — on open, dispatch a custom DOM event so siblings in the same group close. Use CSS grid `grid-template-rows: 0fr / 1fr` for the animated expand.

**Overlay** — `"use client"` component. Render via portal or conditional render. Lock scroll by setting `overflow: hidden` on `document.scrollingElement`. Trap focus. Close on Escape + backdrop click. Layout modes: `fullscreen`, `right`.

**CookieBanner** — `"use client"` component. Read/write consent from `localStorage`. Show/hide based on stored consent state. Minimal — no external deps.

All interactive components follow the same shape as server components but with `"use client"` and React hooks for state. Keep them minimal — no compound component patterns, no render props.

### State management (NanoStores)

Use NanoStores with `@nanostores/react`. Port store definitions from `frontend/src/stores/` as-is (they're framework-agnostic). Use `useStore()` from `@nanostores/react` to subscribe in React components.

```ts
import { useStore } from "@nanostores/react";
import { cartStore } from "@/stores/cart";

export default function CartButton() {
  const cart = useStore(cartStore);
  // ...
}
```

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

- `SectionHero` — Done. Reference for the pattern
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

Port from `frontend/src/lib/shopify/`:
- `cart.ts` — Cart API operations
- `locale.ts` — Locale detection, country/currency mapping

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
