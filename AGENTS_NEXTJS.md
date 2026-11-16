# AGENTS_NEXTJS.md — `frontend-nextjs/`

Next.js mirror of the Astro site. Read `AGENTS.md` first. Ecommerce specifics: `AGENTS_ECOMMERCE.md`.

The Astro app (`frontend/src/`) is the reference implementation and its structure is the standard: read the equivalent there before building something here, then port the logic and adapt rendering to React. Framework-free modules (`lib/**`, `stores/**`, `scripts/*.ts`) are copies of Astro's with `@/` imports and `process.env`; keep them in step.

## Directory map (`frontend-nextjs/src`)

Same folders and file names as Astro's `frontend/src` (see `AGENTS_ASTRO.md`), with React-specific deviations:

```
app/          Routes (Astro: pages/). [locale]/ holds every page and the root layout; route handlers sit outside it
blocks/       + LocaleSelectorClient, AnnouncementDismiss, ColorSchemeSwitch (client halves)
components/   + HeaderNav, CookiesBannerClient, AnalyticsClient, cart/CartClient (client halves of server components)
fields/       + MuxVideoPlayer; no portableTextComponents/ (marks live in PortableText)
layouts/      Primitives; no PageLayout (app/[locale]/layout.tsx)
lib/          As Astro, + shopify/renderLocale, shopify/useLocale, useBrowserValue, utils (cn); no elements.ts or events.ts (React passes props)
meta/         JsonLd, metadata (Astro: Meta.astro)
proxy.ts      Locale routing (see Locales)
sections/     + SectionHeroHeading (client half)
styleGuide/   Style guide, dev + preview only
styles/       Astro's tokens/, base/, globals/ verbatim + index.css (entry), theme.css (@theme), utilities.css, transitions.css
svgs/         Logo.tsx (no SVG loader configured)
```

## Component structure

```tsx
import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import { cn } from "@/lib/utils";

interface Props {
  media: MediaFragment | null | undefined;
  className?: string;
}

export default function ComponentName({ media, className }: Props) {
  if (!media) return null;
  return <div className={cn("component-name", className)}>...</div>;
}
```

- `Props` interface at top; destructure in the signature; guard nullable data. Data props are named for what they hold (`product`, `media`).
- Default export, function declaration. All imports at the top, no inline `import()`.
- `cn()` for conditional classes; root element gets the kebab-case component class, as in Astro.
- Interactive parts are minimal `"use client"` files (`XClient` / a plainly named child) under a server component. No compound components, no render props.

## Server vs client

- Sanity access is server-only: `sanity-nextjs/client.server`. `lib/shopify/serverClient.ts`, `proxy.ts` and `lib/sanity/writeClient.ts` import `server-only`.
- `PortableText` is server-only (link marks render async `SanityLink`). Never import it in a `"use client"` file: render it in a server component and pass the node down (`Cart` → `CartClient`, `SectionForm` → `FormClient`).
- Public env is mapped in `next.config.ts` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`, `_PREVIEW`, `_INDEXABLE`, `_SELLABLE_LOCALE_PATHS`) from the shared root `.env`. Never map a token.

## Locales

- `app/[locale]/layout.tsx` is the root layout (`generateStaticParams` from `LOCALE_LIST`, `dynamicParams = false`); it sets `<html lang data-locale>`.
- `src/proxy.ts` rewrites unprefixed URLs to `/{default}/…` and 301s `/{default}/…` to unprefixed. Its matcher skips route handlers, build JSON and files.
- Server components: `await getRenderLocale()` (`next/root-params`). Client components: `useLocale()` (`useParams`). Browser-only code: `getPageLocale()`. Route handlers: `?locale=`.
- Internal hrefs go through `localizeHref`. The default locale's home is `/`, the others `/{path}` (no trailing slash).

## Data fetching

- `getGlobals()` (`lib/sanity/globals.ts`) — one request for every singleton. The layout fetches it and passes props down.
- `buildScoped` / `buildScopedByKey` (`lib/cache.ts`) — module-level promise memo, active only when `NEXT_PHASE === "phase-production-build"` and `PREVIEW !== "true"`, wrapped in React `cache()` so layout, `generateMetadata` and page share one request per render.
- Next can't pass props from `generateStaticParams`, so during the build routes look their document up in a cached bulk query (`getPages`, `getProducts`, `getCollections`, `getHome` in `lib/sanity/paths.ts`). In dev and on the drafts site `getPage` etc. fetch just that slug. On a production server after the build (`isStaticRuntime`) they return null without a request: every document already has its page, so an unknown slug is a 404.
- The drafts site (`PREVIEW=true`) renders every request: the layout calls `connection()`.
- Route handlers never call Sanity per request: they read build JSON (`/forms.json`, `/product-thumbnails.json`, `force-static`) with `loadBuildJson` (`lib/buildAssets.ts`).
- No server actions for data fetching; no `loading.tsx`/`error.tsx` unless specified. Don't call `headers()`/`cookies()` in pages or the layout: it forces them dynamic.

## SEO

- `generateMetadata` per route via `buildMetadata({ meta, locale, pathname })` (`meta/metadata.ts`): localized canonical, hreflang alternates + `x-default`, `og:locale`, `noindex` when not `INDEXABLE` or asked. `metadataBase` is `WEBSITE_URL`.
- JSON-LD through `meta/JsonLd.tsx`; Organisation + WebSite in the layout, page schemas in the page.
- `app/robots.ts`, `app/sitemap.ts` (default-locale URLs with every locale as an alternate), `app/site.webmanifest/route.ts`.
- `INDEXABLE` is false on the drafts site and on Vercel Preview deployments (`VERCEL_ENV`); those also send `X-Robots-Tag: noindex`.

## Styles

Tailwind v4 over Astro's design system. `styles/index.css` imports Tailwind, `theme.css`, then Astro's `tokens/` → `base/` → `globals/` (layer components) → `utilities.css`.

- `g-*` globals are Astro's, verbatim (`g-heading-N`, `g-button*`, `g-form-*`, `g-select`, `g-sr-only`, …). Structure, grid and type utilities are ported with Astro's names (`g-page-margin`, `g-section-*`, `g-container-*`, `g-grid`, `g-col-N`, `g-text-*`, `g-text-link`, `g-underline-*`). Everything else Astro does with utilities or scoped CSS is Tailwind.
- `theme.css` (`@theme inline`) maps role tokens to utilities, so they follow `data-color-scheme`: `text-text`, `text-text-muted`, `bg-background`, `bg-surface`, `border-rule`, `bg-accent`, `*-alpha-N`, `*-highlight-*`. Tailwind's default colours are removed.
- One breakpoint, desktop first: the `mobile:` variant (`max-width: 48rem`). Spacing is Tailwind's scale (`p-4` = `--size-4`); tokens without a utility use arbitrary values (`px-(--margin)`, `gap-(--gutter)`).
- Fonts are `@font-face` in `tokens/fonts.css` (files in `public/fonts`), preloaded by the layout.
- Restyle through tokens, not components. No CSS-in-JS, no component libraries.

## Fields

- `SanityImage` — `"use client"`, Next `<Image>` with a loader built from `getSanityImageProps` (crop rect, hotspot `object-position`, widths 64–2200, sizes triple), LQIP fade, `priority`.
- `SanityMedia` — async server component; `image` → SanityImage, `video` → MuxVideo, `vimeo` → VimeoVideo. Vimeo oEmbed and Mux blur-up are fetched server-side through the build-cached `lib/video.ts`. Product cards render in the browser, so `ProductThumbnail` switches media itself.
- `SanityLink` — resolves any link type and localizes internal hrefs; plain content when the target can't resolve. `resolveSanityLink` (async) feeds the pure `resolveLink()` in `lib/sanity/resolve.ts`; render attributes via `anchorAttributes()`.

## Layout primitives

React APIs; behaviour matches Astro's.

- `Tabs` — `items: { key, trigger, panel }[]`, `initialIndex`, `orientation`, `onChange`; tablist/tab/tabpanel roles, inactive panels `inert`.
- `Filter` — `facets`, `items: { key, facets, search?, node }[]`, `search`, `empty`; URL query is the source of truth (`q` for search).
- `Dropdown` — `id`, `trigger`, `children` (panel), `onToggle`; outside click / Escape close.
- `FontSizeFillWidth` — wraps one child, fits its glyphs to the container width.
- `Carousel` — `embla-carousel-react`; Astro's options; exposes its `api` through `ref` (no delegated `data-carousel-trigger-*`).
- `Accordion` — `summary` renders a heading (`headingLevel`, default 2) wrapping a `<button aria-expanded aria-controls>`; `content` node; closed content is `inert`; `group` closes siblings.
- `Overlay` — controlled (`isOpen` + `onClose`), `layout: "fullscreen" | "right"`; focus trap (`lib/focus.ts`) and restore, `lockScroll`/`unlockScroll`, Escape/backdrop close, `inert` while closed. The owner closes it on navigation.
- `SectionsRenderer` derives its union from `PageFragment["sections"]`; the `satisfies never` default makes an unrendered section a compile error. Every section root renders `data-color-scheme` and `id`.
- Every page needs an `<h1>`; render a `.g-sr-only` one when no hero provides it (`hasHeroHeading()`).

## Forms

As Astro: `SectionForm` (server) renders `FormClient` with pre-rendered rich text, `FormField` → `fields/form/Field*`, consent terms, honeypot, client validation (`lib/forms/schema.ts`, zod), multipart POST to `/api/forms`, server `errors` shown inline. Form state lives in React (`ButtonSubmit` takes `state` / `isReady`).

## Motion + transitions

- `ScriptMeasurements` and `ScriptAnimations` render inline pre-paint scripts in `<head>` (`--vw` / `--scroll-padding-top`, `html[data-js]`) (hence `suppressHydrationWarning` on `<html>`). Attribute-driven motion (`data-animate-reveal`, `-words`, `-parallax`, `-parallax-wrapper`) re-initialises on every pathname change; reduced motion disables it.
- `decorations/PageTransition` wraps the page in React's `<ViewTransition>` keyed by pathname (sweep styles in `styles/transitions.css`) and moves focus to `#main` after navigation. Delete it and that file to remove transitions.

## State (nanostores)

`useStore()` from `@nanostores/react`; store definitions are Astro's (`AGENTS_ECOMMERCE.md`). Persistent stores are read from `localStorage` before hydration, so pass the server value: `useStore($cartCount, { ssr: () => 0 })`.

## Browser-only values

Read `localStorage`, consent, URL state etc. with `useBrowserValue(read, serverValue, subscribe?)` (`lib/useBrowserValue.ts`, a `useSyncExternalStore` wrapper), not `useEffect` + `setState`.

## Style guide

`app/style-guide/[[...tab]]` (index, its own CSS) and `app/style-guide/frame/[id]` (one entry inside the site CSS), only in dev and when `PREVIEW=true` (production `notFound()`s). Same tabs, fixtures and demos as Astro's; `Styles.tsx` lists the classes in `src/styles` and must stay in sync.

## Deployment (Vercel)

- One Vercel project per site, root directory `frontend-nextjs`. Env vars from `.env.example` (plus `WEBSITE_URL`). A second project with `PREVIEW=true` serves drafts.
- Production builds from the production branch; other branches are Preview deployments (noindex).
- Sanity webhook (published only) → the production project's Deploy Hook. Shopify URL redirects and markets are read at build, so they land on the next build.
- `/api/shopify-sanity-sync` on production needs `SHOPIFY_SANITY_SYNC_SECRET`, as in `AGENTS.md`.

## What NOT to do

- No shadcn/ui or component libraries.
- No `useEffect` for things that should be events.
- No wrappers around `<a>` or `<img>` beyond `SanityLink`/`SanityImage`.
- No server actions for data fetching.
- No Sanity request from a route handler — use build JSON.
