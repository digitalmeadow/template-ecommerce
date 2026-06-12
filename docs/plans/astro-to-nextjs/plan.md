## Goal
Port the Astro frontend to Next.js in `frontend-nextjs/`, matching component parity with `frontend/src/`.

## Key Context

**Existing** (already in `frontend-nextjs/src/`):
- `app/layout.tsx` — font, html/body, no Header/Footer yet
- `app/page.tsx` — home page, fetches `homeQuery`, renders `SectionsRenderer`
- `sections/SectionsRenderer.tsx` — only handles `SectionHero`
- `sections/SectionHero.tsx` — heading + background image
- `fields/SanityImage.tsx` — blur-up, layout modes, next/image
- `lib/sanity/images.ts` — loader + sizes helper
- `lib/utils.ts` — `cn()`
- `blocks/ColorSchemeSwitch.tsx` — light/dark toggle

**Data packages** (no changes needed):
- `sanity-nextjs/` — `sanityClient`, typed queries/fragments, via `process.env`
- `shopify/` — `shopifyClient`, typed queries/mutations, `shopify/utils/ids`

**Deps installed**: `nanostores`, `@nanostores/persistent`, `@nanostores/react`, `embla-carousel-react`, `@mux/mux-player-react`, `@mux/blurup`, `@portabletext/react`, `clsx`, `tailwind-merge`

**Route patterns** (from `frontend/config.ts`):
```ts
SANITY_DOCUMENT_ROUTE_PATTERNS = {
  home: "/", page: "/[slug]", product: "/products/[slug]", collection: "/collections/[slug]",
  header: "/", footer: "/",
};
```

**Styles**: Tailwind v4 with `@theme` mapping CSS custom properties to Tailwind tokens. Color scheme via `data-color-scheme` on `<html>`.

---

## Plan:

### Phase 1: Utility ports (no React)

1. `src/lib/shopify/locale.ts` — Port from `../frontend/src/lib/shopify/locale.ts`. Drop `getLocaleFromPath()` (Astro-specific). Keep `LOCALE_CONFIG`, `getStoredLocale()`, `getCountryCode()`, `getCurrency()`, `isValidLocale()`, type `LocaleCode`. Export `DEFAULT_LOCALE` and `LOCALE_STORAGE_KEY`.

2. `src/lib/shopify/cart.ts` — Port from `../frontend/src/lib/shopify/cart.ts`. Only `getStorageKey()` + constants `CART_ID_STORAGE_KEY_SUFFIX`, `CART_DATA_STORAGE_KEY_SUFFIX`.

3. `src/lib/sanity/links.ts` — Port from `../frontend/src/lib/sanity/links.ts`. `resolveLinkHref()`, `resolveSanityHref()`, `sanityFileUrlFromRef()`, and the GROQ reference resolver. Import `SANITY_PROJECT_ID` from `sanity-nextjs/config`. Import `sanityClientGroq` — needs creating in sanity-nextjs or inlining. Use `SANITY_DOCUMENT_ROUTE_PATTERNS` from local `config.ts`.

4. `src/config.ts` — New. `SANITY_DOCUMENT_ROUTE_PATTERNS` from `../frontend/config.ts`.

### Phase 2: Fields

5. `src/fields/PortableText.tsx` — `"use client"`. Wraps `@portabletext/react`. Accept `value: any`, `className?: string`, `style?: "default" | "large"`. Components map: `block` renders Tailwind-styled html elements, `marks` delegates to `SanityLink` for link marks. Add Tailwind classes for portable-text paragraphs, lists, spacing.

6. `src/fields/SanityLink.tsx` — Server component (resolves href async). Props: `linkData: LinkFragment | null | undefined`, `className?: string`, `children`. Resolves href via `resolveLinkHref()`, computes target/rel/download from link type. Renders `<a>` or `<Link>` (next/link for internal). Falls back to children if no linkData.

7. `src/fields/SanityMedia.tsx` — Server component. Props: `mediaData: MediaFragment | null | undefined`, `layout?: "width" | "height" | "cover" | "contain"`, `sizes?`, `loading?`, `mediaId?`. Discriminates `mediaData.type`: `"image"` → `<SanityImage>`, `"video"` → `<MuxVideo>`. Uses conditional JSX.

8. `src/fields/MuxVideo.tsx` — `"use client"`. Props: `videoData: MuxVideoFragment | null | undefined`, `layout?`, `loading?`, `mediaId?`. Uses `@mux/blurup` server-side for placeholder — move blur-up generation to a server-only `generateBlurUp()` helper exported separately. Client component renders `<MuxPlayer>` from `@mux/mux-player-react` with `playbackId`, `poster`, `loop`, `muted`, `autoPlay`. Blur-up placeholder shows while video loads. Layout classes.

### Phase 3: Layout primitives

9. `src/layouts/Overlay.tsx` — `"use client"`. Props: `id: string`, `layout?: "fullscreen" | "right"`, `ariaLabel?: string`, `children` (3 slots: header/content/footer via named props or children structure). State: `useState<boolean>` for open. Expose via context or store — use `cartOpen` store from Phase 4 for cart overlay. Methods: `open()`, `close()`, `toggle()`. Lock scroll on body. Escape + backdrop close. Animate via Tailwind transitions.

10. `src/layouts/Accordion.tsx` — `"use client"`. Props: `group?: string`, `initOpen?: boolean`, `summary: ReactNode`, `content: ReactNode`. State: `useState<boolean>` for open. On open, dispatch `CustomEvent(`accordion:opened:${group}`)` on window so siblings close. Listen for same event. Animate via `grid-template-rows` transition (Tailwind arbitrary: `grid-rows-[0fr]` / `grid-rows-[1fr]` with `transition-[grid-template-rows]`).

11. `src/layouts/Carousel.tsx` — `"use client"`. Props: `id?: string`, `className?: string`, `align?`, `dragFree?`, `loop?`, `skipSnaps?`, `slidesToScroll?`, `children`. Wraps `useEmblaCarousel()` from `embla-carousel-react`. Expose `api` ref via `useImperativeHandle` for prev/next triggers. Accept slides as children array.

12. `src/components/CookiesBanner.tsx` — `"use client"`. Props with defaults for message, acceptLabel, declineLabel. Check localStorage on mount. Show/hide via state. Accept/Decline write to localStorage with 30-day expiry timestamp. Uses `data-visible` for CSS control.

### Phase 4: Stores + fetchers

13. `src/stores/cart.ts` — Port from `../frontend/src/stores/cart.ts`. `persistentAtom` for `$cart`, computed atoms (`$cartCount`, `$cartTotal`, `$checkoutUrl`, `$cartLines`, `$isCartEmpty`), action functions (`loadCart`, `createCart`, `addToCart`, `updateLineQuantity`, `removeLine`). Imports shopify client/queries/mutations from `shopify/*`. Uses `getStorageKey()` from `@/lib/shopify/cart`.

14. `src/lib/fetches/productShopifySanity.ts` — Port from `../frontend/src/lib/fetches/productShopifySanity.ts`. Types `ProductShopifySanity`, `ProductThumbnailShopifySanity`, `PricesPerLocale`. Functions: `fetchProductShopifySanity(handle)`, `fetchProductThumbnailShopifySanity(handle)`, private `fetchPricesPerLocale(handle)`. Parallel Shopify + Sanity fetches.

15. `src/lib/fetches/collectionShopifySanity.ts` — Port from `../frontend/src/lib/fetches/collectionShopifySanity.ts`. Type `CollectionShopifySanity`. Function `fetchCollectionShopifySanity(handle)`. Fetches collection from both APIs, resolves product thumbnails.

### Phase 5: Page chrome

17. `src/svgs/logo.svg` — Copy from `../frontend/src/svgs/logo.svg`.

18. `src/dev/Grid.tsx` — `"use client"`. Port from `../frontend/src/dev/Grid.astro`. Renders a 16-column grid overlay for layout debugging. Toggle via `?grid` query param or data attribute.

19. `src/blocks/LocaleSelector.tsx` — `"use client"`. Fetches `localizationsQuery` (can be server-rendered or passed as prop). Dropdown of available countries from Shopify. On change: `localStorage.setItem('preferred-locale', value)`, `window.location.reload()`.

20. `src/components/cart/CartButton.tsx` — `"use client"`. Subscribes to `$cartCount` via `useStore()`. On click: `setCartOpen(true)`. Calls `loadCart()` on mount via `useEffect`. Renders button with count badge.

21. `src/components/Header.tsx` — Async server component. Fetches `headerQuery`. Renders logo SVG, nav items via `<SanityLink>`, `<LocaleSelector>`, `<CartButton>`. Sticky positioning. Matches Astro header styles.

22. `src/components/Footer.tsx` — Async server component. Fetches `footerQuery`. Renders `<PortableText>` for body, nav items via `<SanityLink>`, `<SanityMedia>` for background.

23. `src/meta/Meta.tsx` — Server component. Generates `<title>`, `<meta>` tags. Accepts `metaData: MetaFragment | null`, `metaSettingsData: MetaSettingsFragment | null`. Uses `WEBSITE_URL` from `process.env`. Canonical URL from `headers()` or passed path.

24. `src/app/layout.tsx` — Modify. Wrap children in `<Header />` + `<Footer />` + `<Cart />` + `<CookiesBanner />` + `<Grid />`. Fetch `metaSettingsQuery` for default meta. Add `<Meta>` component. Keep existing font/body structure.

25. `src/scripts/ScriptSpacing.tsx` — `"use client"`. Sets `--vw` and `--scrollbar` CSS vars on `<html>`. Runs on mount + resize via `useEffect` + `ResizeObserver`.

26. `src/scripts/ScriptTextFillWidth.tsx` — `"use client"`. Provides the `data-text-fill-width` CSS + JS that dynamically scales heading font size to fill parent width. Marks `<style>` with the base rules, runs the sizing loop on mount + resize.

### Phase 6: Remaining sections

27. `src/sections/SectionText.tsx` — Server component. Props: `sectionData: SectionTextFragment`. Renders `<PortableText value={sectionData.textRaw} />` in a centered `<section>`.

28. `src/sections/SectionCollection.tsx` — Async server component. Props: `sectionData: SectionCollectionFragment`. Gets collection handle from `sectionData.collection.shopify.handle.current`. Fetches Shopify collection + product thumbnails. Renders heading + `<ProductThumbnailsGrid>`.

29. `src/sections/SectionAccordions.tsx` — Server component. Props: `sectionData: SectionAccordionsFragment`. Maps `sectionData.accordions` → `<Accordion>` with summary + `<PortableText>` content.

30. `src/sections/SectionsRenderer.tsx` — Extend. Add `SectionText`, `SectionCollection`, `SectionAccordions` cases to the switch.

### Phase 7: Pages

31. `src/app/page.tsx` — Modify. Wrap in `<PageLayout>` (or layout.tsx already provides chrome). Ensure `homeQuery` result's meta is passed to `<Meta>`.

32. `src/app/[slug]/page.tsx` — New. `generateStaticParams` from `pagesQuery`. Fetches `pageQuery(slug)`. Renders `<SectionsRenderer>` with page sections.

33. `src/app/not-found.tsx` — New. Minimal 404 page.

### Phase 8: Product components

34. `src/blocks/PriceDisplay.tsx` — `"use client"`. Props: `amount?: string`, `currency?: string`, `variant?: "standard" | "compare-at"`, `prefix?: string`. Formats via `Intl.NumberFormat`. `compare-at` gets line-through + muted opacity. `prefix` prepends text (e.g., "from").

35. `src/blocks/QuantitySelector.tsx` — `"use client"`. Props: `min?: number`, `max?: number`, `initial?: number`, `onChange?: (value: number) => void`. Controlled/uncontrolled. +/- buttons. Emits `quantity-selector:quantity-changed` custom event.

36. `src/sections/product/ProductThumbnail.tsx` — Server component. Props: `productData: ProductThumbnailShopifySanity`. Renders link to product page, `<SanityMedia>` thumbnail, title, `<ProductPrice>`.

37. `src/sections/product/ProductThumbnailsGrid.tsx` — Server component. Props: `productsData: ProductThumbnailShopifySanity[]`. 4-col grid (2-col mobile). Every 6th item spans 2 cols/rows. Uses `hover-group` class for grayscale hover effect.

38. `src/sections/product/ProductPrice.tsx` — `"use client"`. Reads `data-prices` from `[data-product-root]` ancestor. Renders `<PriceDisplay>` for price + compare-at. Listens to `product:variant-change`. Initializes with lowest-variant price ("from" prefix for ranges).

39. `src/sections/product/ProductVariantSelector.tsx` — `"use client"`. Props: `productData: ProductShopifySanity`. Exports variant data as `data-variants` JSON. Radio buttons per option. On change: finds matching variant, updates hidden input, dispatches `product:variant-change` on `[data-product-root]`. Hidden if single default variant.

40. `src/sections/product/ProductAddToCart.tsx` — `"use client"`. Reads variant ID from `[data-variant-id]` + quantity from QuantitySelector. Calls `addToCart()`, sets `cartOpen(true)`. Shows loading state. Disabled when unavailable.

41. `src/sections/product/ProductPurchase.tsx` — Server component (data), client child components. Renders title, `<ProductPrice>`, `<ProductVariantSelector>`, `<ProductAddToCart>`, `<QuantitySelector>`. Sticky sidebar on desktop.

42. `src/sections/product/ProductGallery.tsx` — Server component. Props: `productData: ProductShopifySanity`. Vertical stack of `<SanityMedia>` for thumbnail + gallery.

43. `src/sections/product/ProductSection.tsx` — Async server component. Props: `productData: ProductShopifySanity`. Two-column layout: `<ProductGallery>` + `<ProductPurchase>` with accordions.

44. `src/sections/product/RelatedProductsSection.tsx` — Server component. Props: `productsData: ProductThumbnailShopifySanity[] | null`. `<Carousel>` of `<ProductThumbnail>` items with prev/next triggers.

### Phase 9: Product + collection pages

45. `src/app/products/[slug]/page.tsx` — New. `generateStaticParams` from `productsQuery`. Fetches `fetchProductShopifySanity(slug)`. Renders `<ProductSection>` + `<RelatedProductsSection>`. Passes meta with Shopify title fallback.

46. `src/app/collections/[slug]/page.tsx` — New. `generateStaticParams` from `collectionsQuery`. Fetches `fetchCollectionShopifySanity(slug)`. Renders `<SectionHero>` with collection title + `<ProductThumbnailsGrid>`.

### Phase 10: Cart

47. `src/components/cart/CartLineItem.tsx` — `"use client"`. Subscribes to `$cartCount`. On click: `setCartOpen(true)`. Calls `loadCart()` on mount.

48. `src/components/cart/Cart.tsx` — `"use client"`. Props: `line: CartLineFragment`. Renders thumbnail, title, variant title (hidden if default), `<QuantitySelector>`, remove button, price + compare-at.

48. `src/components/cart/Cart.tsx` — Async server component (fetches `cartQuery` for messages + note), client child for interactivity. Renders inside `<Overlay id="cart" layout="right">`. Subscribes to `$cart`, `$cartTotal`, `$cartLines`, `$checkoutUrl`. Renders line items, total, empty message, checkout button. Closes overlay via `setCartOpen(false)`.

## Files to Modify
- `src/app/layout.tsx` — add Header/Footer/Cart/CookiesBanner/Meta
- `src/app/page.tsx` — ensure PageLayout integration
- `src/sections/SectionsRenderer.tsx` — add SectionText, SectionCollection, SectionAccordions

## New Files (48 total)

**svgs/ (1)**
- `src/svgs/logo.svg`

**dev/ (1)**
- `src/dev/Grid.tsx`

**lib/ (4)**
- `src/config.ts`
- `src/lib/shopify/locale.ts`
- `src/lib/shopify/cart.ts`
- `src/lib/sanity/links.ts`

**fetches/ (2)**
- `src/lib/fetches/productShopifySanity.ts`
- `src/lib/fetches/collectionShopifySanity.ts`

**stores/ (2)**
- `src/stores/cart.ts`
- `src/stores/ui.ts`

**fields/ (3)**
- `src/fields/PortableText.tsx`
- `src/fields/SanityLink.tsx`
- `src/fields/SanityMedia.tsx`
- `src/fields/MuxVideo.tsx`

**layouts/ (3)**
- `src/layouts/Overlay.tsx`
- `src/layouts/Accordion.tsx`
- `src/layouts/Carousel.tsx`

**components/ (4)**
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/components/CookiesBanner.tsx`
- `src/components/cart/CartButton.tsx`
- `src/components/cart/CartLineItem.tsx`
- `src/components/cart/Cart.tsx`

**blocks/ (3)**
- `src/blocks/PriceDisplay.tsx`
- `src/blocks/QuantitySelector.tsx`
- `src/blocks/LocaleSelector.tsx`

**sections/ (12)**
- `src/sections/SectionText.tsx`
- `src/sections/SectionCollection.tsx`
- `src/sections/SectionAccordions.tsx`
- `src/sections/product/ProductThumbnail.tsx`
- `src/sections/product/ProductThumbnailsGrid.tsx`
- `src/sections/product/ProductPrice.tsx`
- `src/sections/product/ProductVariantSelector.tsx`
- `src/sections/product/ProductAddToCart.tsx`
- `src/sections/product/ProductPurchase.tsx`
- `src/sections/product/ProductGallery.tsx`
- `src/sections/product/ProductSection.tsx`
- `src/sections/product/RelatedProductsSection.tsx`

**meta/ (1)**
- `src/meta/Meta.tsx`

**scripts/ (2)**
- `src/scripts/ScriptSpacing.tsx`
- `src/scripts/ScriptTextFillWidth.tsx`

**pages/ (3)**
- `src/app/not-found.tsx`
- `src/app/[slug]/page.tsx`
- `src/app/products/[slug]/page.tsx`
- `src/app/collections/[slug]/page.tsx`

## Consumer Files
- `src/app/layout.tsx` — imports Header, Footer, Cart, CookiesBanner, Meta, scripts
- `src/sections/SectionsRenderer.tsx` — imports SectionText, SectionCollection, SectionAccordions
- `src/sections/SectionHero.tsx` — imports SanityMedia (if not already via SanityImage)
- `src/components/Cart.tsx` — imports Overlay, CartLineItem, stores, PriceDisplay, PortableText
- `src/components/CartButton.tsx` — imports cart/ui stores
- `src/components/Header.tsx` — imports SanityLink, LocaleSelector, CartButton, headerQuery
- `src/components/Footer.tsx` — imports PortableText, SanityLink, SanityMedia, footerQuery
- `src/fields/SanityMedia.tsx` — imports SanityImage, MuxVideo
- `src/fields/SanityLink.tsx` — imports resolveLinkHref
- `src/layouts/Overlay.tsx` — imports cartOpen store
- `src/sections/SectionCollection.tsx` — imports ProductThumbnailsGrid, shopifyClient, collectionByHandleQuery
- `src/sections/SectionAccordions.tsx` — imports Accordion, PortableText
- `src/sections/product/*` — cross-imports between product components

## Risks
- **GROQ client**: `resolveLinkHref` in sanity links needs a GROQ client for reference resolution. `sanity-nextjs/client.ts` only creates a GraphQL client. Create a separate `sanityClientGroq` export using `@sanity/client` (already a dep of sanity-nextjs).
- **`@nanostores/persistent`**: uses localStorage — only available client-side. The `persistentAtom` handles this but Next.js SSR may warn. Use dynamic import or `"use client"` wrapper for any component importing stores.
- **MuxVideo blur-up**: `@mux/blurup`'s `createBlurUp()` is async and needs to run server-side. Split into a server component that passes `placeholderDataURL` as prop to a `"use client"` player component.
- **`SANITY_DOCUMENT_ROUTE_PATTERNS`**: Config already exists in `frontend/config.ts` — port to `frontend-nextjs/src/config.ts`. Same values.
- **`SectionCollection`**: fetches Shopify product data in a loop (one request per product). This is the Astro pattern. In Next.js server components this is fine — each request runs independently in the data fetch phase.
