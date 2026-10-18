# AGENTS_NEXTJS.md — `frontend-nextjs/`

Next.js mirror of the Astro site. Read `AGENTS.md` first. Ecommerce specifics: `AGENTS_ECOMMERCE.md`.

The Astro app (`frontend/src/`) is the reference implementation and its structure is the standard — read the equivalent there before building something here, then port the logic and adapt rendering to React.

## Directory map (`frontend-nextjs/src`)

Same folders and file names as Astro's `frontend/src` (see `AGENTS_ASTRO.md`), with React-specific deviations:

```
app/          Routes (Astro: pages/) + robots.ts, sitemap.ts, api/geo
blocks/       + ColorSchemeSwitch, AnnouncementDismiss (client halves)
components/   + HeaderNav, CookiesBannerClient, cart/CartClient (client halves of server components)
decorations/  PageTransition
dev/          Grid
fields/       + MuxVideoPlayer, form/FormClient, form/Icon*; no portableTextComponents/ (marks live in PortableText)
fonts/        next/font (Astro: @font-face in styles/fonts.css)
layouts/      Primitives; no PageLayout (app/layout.tsx)
lib/          As Astro, + useBrowserValue, utils (cn), forms/{fields,schema}, *.client.ts (browser-only reads); no elements.ts (React calls components through props)
meta/         JsonLd, metadata (Astro: Meta.astro)
scripts/      ScriptMeasurements, ScriptAnimations + reveal, parallax, wordsReveal
sections/     SectionsRenderer + one per section; product/ (ProductMain, ProductRelated + ProductRelatedCarousel, parts)
stores/       nanostores (shared logic with Astro)
styles/       globals.css (Tailwind entry + page layout), theme.css (@theme), header.css, footer.css + Astro's files
svgs/         Logo.tsx (no SVG loader configured)
utils/        splitIntoWords
```

`.client.ts` modules read `window`/`localStorage` behind a `typeof window` guard, so they're safe to import from code that also renders on the server.

## Component structure

```tsx
import type { SomeFragment } from "sanity-nextjs/generated/graphql";
import { cn } from "@/lib/utils";

interface Props {
  someData: SomeFragment | null | undefined;
  className?: string;
}

export default function ComponentName({ someData, className }: Props) {
  if (!someData) return null;
  return <div className={cn("component-name", className)}>...</div>;
}
```

- `Props` interface at top; destructure in the signature; guard nullable data.
- Default export, function declaration.
- All imports at the top — no inline `import()`.
- `cn()` for conditional Tailwind classes; root element gets the kebab-case component class.
- Interactive components are `"use client"` files kept minimal — no compound components, no render props.

## Server vs client

- Sanity access is server-only: `sanity-nextjs/client.server` (`import "server-only"`). There is no browser Sanity client.
- `PortableText` is server-only (link marks render async `SanityLink`). Never import it in a `"use client"` file — render it in a server component and pass the node down (see `SectionForm` → `FormClient`, `SectionTabs`, `CartClient`).
- Public env is mapped in `next.config.ts` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `_DATASET`) from the shared root `.env`. Never map a token.

## Data fetching

- `getGlobals()` (`lib/sanity/globals.ts`) — one request for header, footer, cart, meta, organisation, analytics, announcement banner, cookie consent, location notice. The layout fetches it and passes props down.
- `buildScoped` / `buildScopedByKey` (`lib/cache.ts`) — module-level promise memo, active only when `NEXT_PHASE === "phase-production-build"` and `PREVIEW !== "true"`, wrapped in React `cache()` so layout, `generateMetadata` and page share one request per render.
- Next can't pass props from `generateStaticParams`, so during the build routes look their document up in a cached bulk query (`getPages`, `getProducts`, `getCollections`, `getHome` in `lib/sanity/paths.ts`). Outside the build (`buildCacheEnabled` false: dev, preview), `getPage` etc. fetch just that slug instead of the whole collection.
- No server actions for data fetching; no `loading.tsx`/`error.tsx` unless specified.
- Don't call `headers()`/`cookies()` in the layout — it forces every page dynamic.

## SEO

- `generateMetadata` per route via `buildMetadata` (`meta/metadata.ts`); `metadataBase` from `WEBSITE_URL`.
- JSON-LD through `meta/JsonLd.tsx`. `app/robots.ts` and `app/sitemap.ts`.
- `app/layout.tsx`: `viewport.themeColor` is `THEME_COLOR` (`src/config.ts`); `appleWebApp.title` is the organisation name (omitted when unset). `not-found.tsx` titles itself from meta settings → organisation name → "Page not found".

## Styles

- **Tailwind v4**: `globals.css` is the entry (`@import "tailwindcss"`, then every file below, then page-layout rules). `theme.css` holds `@theme` only; the values it points at (`--theme-*`, light/dark `data-color-scheme`, brand colours) are in `colors.css`. Tokens: `bg-background`, `text-foreground`, `text-accent`, `text-muted`, `bg-surface`, `border-border`.
- Otherwise the files match Astro's: `reset`, `base` (body font, focus ring, selection), `fonts`, `text`, `spacing`, `elements`, `forms` (placeholder; forms are styled with Tailwind), `animations.css` (transition/reveal/parallax tokens, reveal, view transitions) + `animations.ts` (JS easings, `damp`, `prefersReducedMotion`; keep in sync). `header.css`/`footer.css` are Next-only (Astro scopes them in the component).
- Spacing scale `--s4 … --s200` via arbitrary values (`mt-[var(--s40)]`).
- Typography helpers are `@utility` (`text-body`, `text-inherit`) so they compose with variants. Easings (`--ease-out-cubic`, `--ease-sweep`) live in `@theme`, which makes them utilities too (`ease-out-cubic`). Focus rings use `--color-focus`.
- Utilities: `u-container` (`spacing.css`), `visually-hidden` (`elements.css`), both `@utility`.
- Breakpoints `64rem` / `32rem`.
- No CSS-in-JS, no component libraries.

## Fields

- `SanityImage` — `"use client"`, Next `<Image>` with a custom loader (crop rect, hotspot `object-position`, widths from 64), LQIP blur-up, `priority` prop. Layout modes `width | height | cover | contain`.
- `SanityMedia` — async; `image` → SanityImage, `video` → MuxVideo, `vimeo` → VimeoVideo. Vimeo oEmbed (ratio + thumbnail) and Mux blur-up are fetched server-side through the build-cached `lib/video.ts`. Placeholders are `.placeholder` / `placeholderSrc`.
- `SanityLink` — resolves any link type; plain content when the target can't resolve. Resolution is split: `resolveSanityLink` (async, fills page refs from the cached map) feeds the pure `resolveLink() → { href, kind, newTab }` in `lib/sanity/resolve.ts`; render attributes via `anchorAttributes()`.

## Layout primitives

- `Tabs` — `items: { key, trigger, panel }[]`, `initialIndex`, `orientation`, `onChange`; tablist/tab/tabpanel roles, inactive panels `inert`.
- `Filter` — `facets`, `items: { key, facets, search?, node }[]`, `search`, `empty`; URL query is the source of truth (`q` for search).
- `Dropdown` — `id`, `trigger`, `children` (panel), `onToggle`; outside click / Escape close.
- `FontSizeFillWidth` — wraps one child, fits its glyphs to the container width (ResizeObserver).
- `Carousel` — `embla-carousel-react`; `align`, `dragFree`, `loop`, `skipSnaps` (default true), `slidesToScroll`, `breakpoints`, `watchResize`; exposes `api`.
- `Accordion` — `summary` (string) renders a heading (`headingLevel`, default 2) wrapping a `<button aria-expanded aria-controls>`; `content` node; closed content is `inert`; `group` closes siblings via window events.
- `Overlay` (controlled: `open` + `onClose`; `fullscreen` | `right`, iOS-safe scroll lock, focus trap via `lib/focus.ts`, focus restore, Escape/backdrop close, `inert` while closed).
- `SectionsRenderer` derives its union from `PageFragment["sections"]`; the `satisfies never` default makes an unrendered section a compile error. Every section root renders `data-color-scheme` and `id`.
- Every page needs an `<h1>`; pages render a `.visually-hidden` one when no hero provides it (`hasHeroHeading()` in `lib/sanity/sections.ts`).

## Forms

`SectionForm` (server) normalises the CMS form (`lib/forms/fields.ts`) and renders `FormClient` with pre-rendered rich text. Client validation (`lib/forms/schema.ts`), honeypot, POST multipart `FormData` (+ `formId`) to `FORM_ENDPOINT` in `src/config.ts` (unset → error + warning, no request).

## Motion + transitions

- `ScriptAnimations` (mounted in the layout) sets `html[data-js]` pre-hydration (hence `suppressHydrationWarning` on `<html>`) and re-initialises attribute-driven motion on every pathname change: `data-animate-reveal`, `data-animate-parallax`, `data-animate-parallax-wrapper`, `data-animate-words` (static server-rendered text only). Reduced motion disables all of it.
- `decorations/PageTransition` uses React's `<ViewTransition>` keyed by pathname and moves focus to `#main` after navigation. Delete it and its `animations.css` rules to remove transitions.
- Reveal marks revealed elements with `data-revealed`.

## State (nanostores)

`useStore()` from `@nanostores/react`. Store definitions are shared with Astro — see `AGENTS_ECOMMERCE.md`. Persistent stores (`$cart`) are read from `localStorage` before hydration, so components pass the server value: `useStore($cartCount, { ssr: () => 0 })` (a stable reference for arrays).

## Browser-only values

Read `localStorage`, consent etc. with `useBrowserValue(read, serverValue, subscribe?)` (`lib/useBrowserValue.ts`, a `useSyncExternalStore` wrapper), not `useEffect` + `setState`.

## Fonts

`next/font/local` in `src/fonts/index.ts`; the generated CSS variable is applied on `<html>` and mapped to `--font-body` etc. in `styles/fonts.css`.

## What NOT to do

- No shadcn/ui or component libraries.
- No `useEffect` for things that should be events.
- No wrappers around `<a>` or `<img>` beyond `SanityLink`/`SanityImage`.
- No server actions for data fetching.
