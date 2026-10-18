# AGENTS_ASTRO.md — `frontend/`

Astro site. Read `AGENTS.md` first. Ecommerce specifics: `AGENTS_ECOMMERCE.md`.

**No JS framework.** Interactivity is native custom elements and `<script>` blocks. No React/Vue/Svelte, no `client:*`.

## Astro + client router (READ THIS FIRST)

`PageLayout.astro` mounts `<ClientRouter />`: navigations swap the DOM in place. Every interactive or animated component must follow one of these three patterns or it will double-bind, leak, or stop working after the first navigation.

### 1. Custom element — self-contained interactivity

For behaviour scoped to one subtree (tabs, carousel, dropdown, filter, form, quantity selector).

```astro
<my-widget>...</my-widget>

<script>
  class MyWidget extends HTMLElement {
    connectedCallback() {
      // bind listeners, read attributes (kebab-case)
    }
    disconnectedCallback() {
      // release everything bound above
    }
  }
  customElements.define("my-widget", MyWidget);
</script>
```

- `connectedCallback` re-runs per navigation; everything bound there must be released in `disconnectedCallback`.
- State lives in `data-*` / `data-state` attributes, not class toggling.
- Cross-element coordination is a `CustomEvent` on `window` or a shared ancestor.
- Types other files need (event details, element APIs) live in `lib/events.ts` / `lib/elements.ts`, never imported from a `.astro` file or its `.astro.0.mts` virtual module.

### 2. Lifecycle `<script>` — page-wide effects that query the DOM

A module `<script>` runs once on first load and **never again** after navigation. Bind to router events:

```astro
<script>
  let cleanups: (() => void)[] = [];

  document.addEventListener("astro:page-load", () => {
    cleanups = [];
    document.querySelectorAll<HTMLElement>(".thing").forEach((element) => {
      // bind, push teardown into cleanups
    });
  });

  document.addEventListener("astro:before-swap", () => {
    cleanups.forEach((cleanup) => cleanup());
  });
</script>
```

- `astro:page-load` fires on initial load **and** after every swap. `astro:before-swap` fires before the next page replaces this one.
- Handle N instances (`querySelectorAll` + loop) — Astro emits a component's script once however many times it renders.
- Guard motion with `prefers-reduced-motion`.

### 3. Inline pre-paint `<script is:inline>` — state needed before first paint

`ScriptMeasurements` (`--vw`, `--scrollbar`) and `ScriptAnimations` (`html[data-js]`). The router replaces `<html>` attributes on swap, so re-apply on `astro:after-swap`.

### Persisted chrome

Header, cart overlay, cookie banner + analytics, and `PageTransition` are wrapped in `transition:persist` elements so they survive swaps. Persisted nodes are **moved** during a swap, so their custom elements disconnect and reconnect — cleanup in `disconnectedCallback` is still mandatory. Server-rendered per-page state inside them goes stale (e.g. the active nav link), so re-derive it on `astro:page-load`.

## Directory map (`frontend/src`)

```
blocks/       Small reusable UI (ButtonSubmit, PriceDisplay, QuantitySelector, LocaleSelector)
components/   Page chrome (Header, Footer, AnnouncementBanner, CookiesBanner, LocationNotice, Analytics, cart/Cart, cart/CartButton, cart/CartLineItem)
decorations/  Non-content visual layers (PageTransition)
dev/          Dev-only overlays (Grid)
fields/       Sanity value renderers (SanityImage, SanityMedia, MuxVideo, VimeoVideo, SanityLink, PortableText, FormField, FormTerm, form/*)
layouts/      Primitives (PageLayout, Accordion, Carousel, Dropdown, Filter, FontSizeFillWidth, Overlay, Tabs)
lib/          cache, sanity/ (globals, links, resolve, images, meta, structuredData, paths, staticPaths, sections), shopify/, fetches/, forms/, consent/, announcement, focus, video, events, elements
meta/         Meta, JsonLd
pages/        Routes (+ robots.txt.ts, api/)
scripts/      ScriptMeasurements, ScriptAnimations + motion controllers (reveal, parallax, wordsReveal)
sections/     SectionsRenderer + one file per section type; product/ (ProductMain, ProductRelated + their parts)
stores/       nanostores
styles/       Global CSS + animations.ts
svgs/         Inline SVGs
utils/        Small helpers
```

Aliases (`tsconfig.json`): `@config` → `./config.ts`; `@blocks @components @decorations @dev @fields @layouts @lib @meta @pages @scripts @sections @stores @styles @svgs @utils` → `src/*`.

## Components

```astro
---
import type { SomeFragment } from "sanity/generated/graphql";

interface Props {
  someData: SomeFragment | null | undefined;
}

const { someData }: Props = Astro.props;
---

{someData && <div class="component-name">...</div>}
```

- `Props` interface; destructure `const { ... }: Props = Astro.props`.
- Data props typed to generated fragments, `| null | undefined`, guarded.
- Root element carries the kebab-case class matching the component name.
- Styles in the component's scoped `<style>`; `:global(...)` only when necessary.

### Sections

`SectionsRenderer.astro` maps `__typename` → component; each `SectionX.astro` takes `{ section: SectionXFragment }`. To add one: schema in `cms/schemas/sections` + register in `sections.ts`, fragment in both `sanity*/fragments/sections` and the `Page`/`Home` fragments, `pnpm gen`, then `SectionX.astro` + its case.

### Pages

Detail routes build paths in `lib/sanity/paths.ts` and pass whole documents as props. Resolve them with `propsForSlug()` — the preview site is `output: "server"`, where `getStaticPaths` doesn't run and `Astro.props` is empty:

```astro
export async function getStaticPaths() {
  return buildPagePaths();
}
const resolved = await propsForSlug(Astro.props, Astro.params.slug, loadPageProps);
if (!resolved) return Astro.rewrite("/404");
```

Pass `metaData={resolveMeta(doc)}` and page JSON-LD via the `jsonLd` prop of `PageLayout` (`<slot />` renders in `<main>`, not `<head>`). Every page needs an `<h1>` — render a `.visually-hidden` one when no hero provides it (`hasHeroHeading()` in `lib/sanity/sections.ts`).

### Fields

- `SanityImage` — `getSanityImageProps()` builds `srcset`/`sizes` (widths 64–2200), applies crop as a pixel rect and hotspot as `object-position`, emits width/height. The LQIP placeholder fades out on load. `priority` for above-the-fold images.
- `SanityMedia` — `image` → SanityImage, `video` → MuxVideo (looping image replacement), `vimeo` → VimeoVideo.
- `SanityLink` — resolves any link type; renders a bare `<slot/>` when the target can't resolve.
- `PortableText` — wraps `astro-portabletext`; custom marks in `portableTextComponents/`.

### Layout primitives

- `Tabs` — slots `triggers` (`[data-tab-trigger]`) and `panels` (`[data-tab-panel]`, same order); emits `tabs:change`.
- `Dropdown` — slots `trigger` (contains `[data-dropdown-trigger]`) and `panel`; `open()/close()/toggle()`; emits `dropdown:toggle`.
- `Filter` — contract in the file's frontmatter: `[data-filter-option]` radios + optional `[data-filter-search]`, `[data-filter-card]` with `data-{facet}`, syncs to the URL query, emits `filter:change`.
- `FontSizeFillWidth` — wraps one child and scales its font so the glyphs exactly fill the parent width.
- `Carousel` — Embla; `align`, `dragFree`, `loop`, `skipSnaps` (default true), `slidesToScroll`, `breakpoints`, `watchResize`. Buttons anywhere with `data-carousel-trigger-prev|next="<id>"` scroll it (delegated).
- `Accordion` — `summary` prop renders a heading (`headingLevel`, default 2) wrapping a `<button aria-expanded>`; content in slot `content`; `group` closes siblings.
- `Overlay` (`fullscreen` | `right`; the cart uses `right`). Traps focus (`lib/focus.ts`), restores it on close, and is `inert` while closed. Open with `data-trigger-overlay-open|close|toggle="<id>"` (delegated) or the element's `open()`/`close()`.

### Forms

`SectionForm` renders a CMS `form` through `FormField` → `fields/form/Field*`, with consent terms (`FormTerm`), a honeypot and client validation. Submission POSTs multipart `FormData` (+ `formId`) to `FORM_ENDPOINT` in `frontend/config.ts`; unset → shows an error and warns. An endpoint may reply with JSON `{ ok?, message?, errors? }` (`lib/forms/types.ts`); multi-value fields are read with `getAll()`.

## Styles — plain CSS + custom properties

Global sheets imported in order by `PageLayout.astro`: `reset, base, colors, spacing, text, elements, forms, animations, fonts`.

- **Colors**: palette + semantic tokens (`--color-background`, `--color-text`, `--color-shape-stroke`, `--color-error`). Style against semantic tokens.
- **Spacing**: `--s4 … --s200`, overridden under `@media (max-width: 64rem)`.
- **Grid**: `--column-count`, `--margin`, `--gutter`, `--container-width` (from JS-set `--vw`), `--column`. Span N columns with `calc(N * var(--column) + (N - 1) * var(--gutter))`.
- **`.u-container`** on the element itself centres it at container width — don't nest a wrapper.
- **`.visually-hidden`** for screen-reader-only content.
- **Breakpoints**: `64rem` primary, `32rem` mobile; mobile-last `max-width` queries. rem, not px, so user font size is respected.

## Motion

`motion` package (`animate`, `scroll`). Tokens live in `animations.css` (`--ease-out-cubic`, `--ease-sweep`, `--transition-default`, `--transition-media-load`, reveal/parallax tokens); `animations.ts` mirrors the numbers JS needs (`easeOutCubic`, durations).

Attribute-driven, wired globally by `ScriptAnimations` (init on `astro:page-load`, teardown on `astro:before-swap`):

- `data-animate-reveal` — opacity reveal once in view (sets `data-revealed`). Hidden state gated on `html[data-js]`, so no-JS and reduced-motion always show content.
- `data-animate-words` — word-by-word reveal.
- `data-animate-parallax` — media drift inside its overflow-hidden frame (SanityImage, VimeoVideo).
- `data-animate-parallax-wrapper` — drifts the element itself.

Bespoke motion uses the lifecycle pattern. When a section owns an element's `transform`, don't also give it a parallax attribute.

`PageTransition` wraps the router loader (`astro:before-preparation`) to cover, swap, then reveal on `astro:page-load`. Delete it (and its mount in `PageLayout`) if a project doesn't want transitions.

## What NOT to do

- No React/Vue/Svelte, no `client:*`.
- No module `<script>` that queries the DOM at top level; no custom element without `disconnectedCallback` cleanup.
- No Tailwind, no CSS-in-JS.
- No `sanityClient.request()` in shared components — use `getGlobals()` / route props.
