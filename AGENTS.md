# AGENTS.md — template-ecommerce

Shared rules for every package. This repo is a starter: it gets copied into new projects, so keep the patterns identical across projects.

**Also read the file for the area you're working in:**

| Working in | Read |
| --- | --- |
| `frontend/` (Astro) | `AGENTS_ASTRO.md` |
| `frontend-nextjs/` (Next.js) | `AGENTS_NEXTJS.md` |
| Anything touching Shopify, cart, products, collections, locales | `AGENTS_ECOMMERCE.md` |

## Workspace layout

```
frontend/        Astro site (primary, deployed to Cloudflare Workers)
frontend-nextjs/ Next.js mirror of the Astro site
cms/             Sanity Studio (schemas, structure, document actions)
sanity/          Typed GraphQL fragments/queries + codegen + clients for Astro (astro:env)
sanity-nextjs/   Same fragments/queries for Next.js (process.env, server-only client)
shopify/         Shopify Storefront API fragments/queries + client
```

`sanity/` and `sanity-nextjs/` hold identical `fragments/` and `queries/` — change both together.

## Commands (repo root)

```
pnpm dev | build | lint | typecheck   # fan out to every package
pnpm gen                              # cms graphql deploy → sanity, sanity-nextjs, shopify codegen
pnpm --filter cms validate-documents [id]   # run Studio validation over the dataset, with full paths
```

Run `pnpm gen` after changing `cms/schemas/**`, `sanity*/fragments/**` or `sanity*/queries/**`. Codegen introspects the **deployed** GraphQL schema, so a new schema field can't be typed until `sanity graphql deploy` lands (needs a Sanity login with deploy rights on the project). Never edit `generated/` by hand.

## Philosophy

- **Comments are rare.** One line, *why* not *what*. No banners or decoration.
- **Files are short and do one thing.** Split by responsibility.
- **Flat, literal naming** — `SectionText`, not `TextSectionRenderer`.
- **Copy the conventions, not just the logic.** Match the nearest existing file.
- **Never assume data presence.** Fragment props are `| null | undefined` and guarded.

## Env

One real file, the root `.env` (gitignored; copy `.env.example`). Every package symlinks its own `.env` to it (`frontend/.env -> ../.env`, etc.); the symlinks are committed. In CI nothing is read from files — values come from `.github/workflows/deploy.yml`.

- The Sanity dataset is **private**: `SANITY_VIEWER_API_TOKEN` and other tokens are server-only. Never expose them as Astro `context: "client"` or `NEXT_PUBLIC_*`.
- `SANITY_PROJECT_ID` is duplicated as `SANITY_STUDIO_PROJECT_ID` because the Studio bundle only sees the `SANITY_STUDIO_` prefix.
- `WEBSITE_URL` drives canonicals, sitemap, robots and JSON-LD `@id`s.
- Adding a runtime secret: `frontend/astro.config.mjs` env schema, `.env.example`, `deploy.yml` (build env + wrangler `secrets`), and `frontend/wrangler.jsonc` `secrets.required` per environment.

## Data fetching (READ BEFORE ADDING A QUERY)

A static build renders every page in one process, so **a query in the wrong place multiplies by the page count**. The dataset is metered.

- **Site-wide data goes in one query.** `queries/globals.ts` fetches header, footer, cart, meta, organisation and analytics settings in one request via `getGlobals()`. Layout passes results down as props; components never fetch for themselves.
- **Route-wide data is fetched once per route**, then handed to each page (Astro: `getStaticPaths` props; Next: cached bulk query looked up by slug). Detail pages make no per-page Sanity request for their own document.
- **Build-wide values are memoised** by `buildScoped` / `buildScopedByKey` (`lib/sanity/cache.ts` in each frontend). They cache the *promise* so concurrent renders share one request, and are inert in dev and on the preview (drafts) site so content stays live.
- **Links** resolve against one cached `_id → {_type, slug}` map — never a query per link. Unpublished/unknown targets warn and render without a link instead of failing the build.
- If a bulk query grows too large, paginate (`limit`/`offset`) rather than reverting to per-page queries.

## SEO / structured data

- Meta resolves CMS meta → document's own fields (`resolveMeta`) → `metaSettings` → organisation description. No copy is authored in code.
- Canonicals/OG URLs come from the site URL (`Astro.site` / `metadataBase`), never a per-page env read.
- JSON-LD: Organisation + WebSite on every page (Organisation has a stable `@id` other schemas reference), Breadcrumb on detail pages, Product on product pages. `compact()` strips empty branches; `<` is escaped when serialised.
- Preview builds are `noindex` (meta + `X-Robots-Tag`) and robots disallows all.

## Analytics + consent

GTM only. `analyticsSettings.gtmId` in the CMS; the script loads only after the cookie banner records consent (`lib/consent/consent.ts` fires `cookie-consent:change`). Configure GA4 etc. inside GTM. Client-side navigations are `pushState`, so use GTM's History Change trigger for page views.

## CMS (`cms/`)

- `schemas/` organised `documents/`, `fields/`, `sections/`, `settings/`.
- **Rich text** is the `richText({ headings, lists, italic, strong, link, images })` field factory, not a named type: each field opts into only what it renders, and the stored shape is always a block array so changing options needs no migration.
- **Nested objects must be named types** in `schemas/fields/` (e.g. `postalAddress`) — Sanity's GraphQL deploy rejects anonymous inline objects.
- **Optional object validation**: use the helpers in `utils/validation.ts` (`isEmptyLink`, `isEmptyButton`, `isEmptyMedia`, `requireMetaFields`) so untouched optional fields don't demand inner required values.
- **A new singleton** must be registered in: `schemas/index.ts`, `structure/`, `SINGLETON_DOCUMENT_TYPES` in `cms/config.ts`, and (if it has a route) `SANITY_DOCUMENT_ROUTE_PATTERNS` in both frontends' config. Types with no route go in `UNPREVIEWABLE_DOCUMENT_TYPES`.
- **Media**: `media.type` is `image` | `video` (Mux, looping image replacement) | `vimeo` (Vimeo URL, alternative provider).
- **Forms**: `form` documents (groups of `formField`, `formConsent` terms) rendered by `sectionForm`. Submissions POST multipart `FormData` (+ `formId`) to the frontend's `FORM_ENDPOINT`; no endpoint ships with the template.

## Deployment (Cloudflare Workers)

One workflow, `.github/workflows/deploy.yml`, with a matrix of targets:

```
production          main     static, published
production-preview  main     SSR, drafts, noindex
staging             staging  static, published
api                 api      hosts /api/deploy + /api/shopify-sanity-sync
```

- Push to `main` deploys production + production-preview; `staging`/`api` deploy themselves; manual dispatch picks one or `all`.
- Sanity publish webhook → api worker `/api/deploy` → dispatches `deploy.yml` with `environment: all`. Dispatches within 30s of a queued/running run are coalesced.
- Each environment deploys one at a time (concurrency group) because Wrangler can't write secrets while a version is pending.
- To add an environment: add it to the `TABLE` in `deploy.yml`, the `options` list, and `env` in `wrangler.jsonc`.

## What NOT to do

- No `sanityClient.request()` in a component that renders on more than one page, or in a detail page for its own document.
- No secrets in client bundles.
- No `@sanity/image-url` — image URLs are built in `lib/sanity/images.ts`. No hand-rolled `<img>`/`<a>` for Sanity data — use `SanityImage`/`SanityLink`.
- No component libraries, no CSS-in-JS.
- No decorative or obvious comments.
