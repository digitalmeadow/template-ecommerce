# AGENTS.md — template-ecommerce

Shared rules for every package. This repo is a starter: it gets copied into new projects, so keep the patterns identical across projects.

**Also read the file for the area you're working in:**

| Working in                                                      | Read                  |
| --------------------------------------------------------------- | --------------------- |
| `frontend/` (Astro)                                             | `AGENTS_ASTRO.md`     |
| `frontend-nextjs/` (Next.js)                                    | `AGENTS_NEXTJS.md`    |
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
pnpm format | format:check            # prettier, root config; frontends extend it with their plugin
pnpm gen                              # cms graphql deploy → sanity, sanity-nextjs, shopify codegen
pnpm --filter cms validate-documents [id]   # run Studio validation over the dataset, with full paths
```

Run `pnpm gen` after changing `cms/schemas/**`, `sanity*/fragments/**` or `sanity*/queries/**`. Codegen introspects the **deployed** GraphQL schema, so a new schema field can't be typed until `sanity graphql deploy` lands (needs a Sanity login with deploy rights on the project). Never edit `generated/` by hand.

## Philosophy

- **Comments are rare.** One line, _why_ not _what_. No banners or decoration.
- **Files are short and do one thing.** Split by responsibility.
- **Flat, literal naming** — `SectionText`, not `TextSectionRenderer`.
- **Copy the conventions, not just the logic.** Match the nearest existing file.
- **Never assume data presence.** Fragment props are `| null | undefined` and guarded.

## Env

One real file, the root `.env` (gitignored; copy `.env.example`). Every package symlinks its own `.env` to it (`frontend/.env -> ../.env`, etc.); the symlinks are committed. Workers Builds never reads it: non-secret build values are `DEPLOY_ENVIRONMENTS` in `frontend/config.ts` (keyed by `CLOUDFLARE_ENV`), and secrets live on each Worker.

- The Sanity dataset is **private**: `SANITY_VIEWER_API_TOKEN` and other tokens are server-only. So is `SHOPIFY_PRIVATE_API_TOKEN`; the browser reaches Shopify through the same-origin proxy. Never expose them as Astro `context: "client"` or `NEXT_PUBLIC_*`.
- `SANITY_PROJECT_ID` / `SANITY_DATASET` are duplicated as `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` because the Studio bundle only sees the `SANITY_STUDIO_` prefix.
- `WEBSITE_URL` drives canonicals, sitemap, robots and JSON-LD `@id`s.
- `INDEXABLE` is derived in `astro.config.mjs` (false on the drafts site and branch Previews) and drives `noindex` + robots.
- Adding a secret: `frontend/astro.config.mjs` env schema, `.env.example`, `frontend/wrangler.jsonc` `secrets.required` per environment; then on each Worker a secret build variable (prerendering validates every secret) and a runtime secret (`npx wrangler secret put <NAME> --env <env>`, plus `npx wrangler preview base-config secret put <NAME> --env production` for Previews).

## Data fetching (READ BEFORE ADDING A QUERY)

A static build renders every page in one process, so **a query in the wrong place multiplies by the page count**. The dataset is metered.

- **Site-wide data goes in one query.** `queries/globals.ts` fetches header, footer, cart, meta, organisation, analytics, announcement banner, cookie consent and location notice settings in one request via `getGlobals()`. Layout passes results down as props; components never fetch for themselves.
- **Route-wide data is fetched once per route**, then handed to each page (Astro: `getStaticPaths` props; Next: cached bulk query looked up by slug). Detail pages make no per-page Sanity request for their own document.
- **Build-wide values are memoised** by `buildScoped` / `buildScopedByKey` (`lib/cache.ts` in each frontend; shared by Sanity and Shopify fetches). They cache the _promise_ so concurrent renders share one request, and are inert in dev and on the preview (drafts) site so content stays live.
- **Links** resolve against one cached `_id → {_type, slug}` map — never a query per link. Unpublished/unknown targets warn and render without a link instead of failing the build.
- If a bulk query grows too large, paginate (`limit`/`offset`) rather than reverting to per-page queries.

## SEO / structured data

- Meta resolves CMS meta → document's own fields (`resolveMeta`) → `metaSettings` → organisation description. No copy is authored in code.
- Canonicals/OG URLs come from the site URL (`Astro.site` / `metadataBase`), never a per-page env read.
- JSON-LD: Organisation + WebSite on every page (Organisation has a stable `@id` other schemas reference), Breadcrumb on detail pages, Product on product pages. `compact()` strips empty branches; `<` is escaped when serialised.
- Preview builds are `noindex` (meta + `X-Robots-Tag`) and robots disallows all.

## Analytics + consent

Two destinations, one consent decision. GTM: `analyticsSettings.gtmId` in the CMS; configure GA4 etc. inside GTM, and use its History Change trigger for page views (client-side navigations are `pushState`). Banner copy is the `cookieConsent` singleton (no document, no banner, so GTM never loads).

Astro (Next: GTM after consent only, pending parity):

- Shopify's Customer Privacy API (`lib/consent/customerPrivacy.ts`, loaded once per visit by `Analytics.astro`) says whether the visitor's region needs a choice (`shouldShowBanner()`). The banner only shows there; elsewhere tracking is allowed unless the visitor declines. Consent is never recorded on the visitor's behalf.
- The banner's choice (`lib/consent/consent.ts`, `cookie-consent:change`) is passed to Shopify with `setTrackingConsent`, which applies it to Shopify analytics and checkout.
- Shopify admin analytics: `lib/analytics/shopifyAnalytics.ts` is the bus Shopify's `shopify.js` listens on (Headless channel attribution); events wait for consent, then replay. Needs the same-origin Storefront API proxy.
- GA4 ecommerce events go to the `dataLayer` (`lib/analytics/dataLayer.ts`), held until consent is decided.
- Call sites use `lib/analytics/track.ts` only: page, product, collection and search views, cart changes (diffed against the last server cart), cart view, begin checkout.

## CMS (`cms/`)

- `schemas/` organised `documents/`, `fields/`, `sections/`, `settings/`.
- **Rich text** is the `richText(RICH_TEXT_STYLES.default | extended | full, { required })` field factory, not a named type. Prefer a preset over raw options; pass `required` to the factory rather than adding `validation`. The stored shape is always a block array, so changing presets needs no migration.
- **Nested objects must be named types** in `schemas/fields/` (e.g. `postalAddress`) — Sanity's GraphQL deploy rejects anonymous inline objects.
- **Optional object validation**: use the helpers in `utils/validation.ts` so untouched optional fields don't demand inner required values. Inner fields: `Rule.custom(requiredInUse({ isEmpty, hasValue, message }))`. A required `media`/`link` field: `Rule.required().custom(requiredMedia | requiredLink)` (required alone passes a seeded, empty object).
- **Previews**: every type says what it is. Use `utils/preview.tsx` (`previewText`, `pluralize`, `mediaSelection` + `previewMedia`, `linkSelection` + `linkSubtitle`); select media through `mediaSelection` so Mux thumbnails resolve.
- **Announcement banner** (`announcementBanner` singleton): shown above the header when `enabled`. Dismissal is stored against the document's `_updatedAt`, so editing it shows it again, and it's applied pre-paint by an inline script (`lib/announcement.ts`) so it never flashes.
- **Section colour scheme**: every section has `colorScheme` (`colorSchemeField`, light/dark), rendered as `data-color-scheme` on its root; both frontends re-scope their colour variables under that attribute.
- **Sections** register once, in `sectionSchemas` (`schemas/sections/sections.ts`), which feeds both `schemaTypes` and every page's `sections` array.
- **Linkable types**: `LINKABLE_DOCUMENT_TYPES` in `frontend/config.ts` (mirrored in `frontend-nextjs/src/config.ts`); the Studio reads it, and each type must have a route pattern (compile-time `satisfies`).
- **A new singleton** must be registered in: `schemas/index.ts`, `structure/`, `SINGLETON_DOCUMENT_TYPES` in `cms/config.ts` (which also drops its "Create" template), and (if it has a route) `SANITY_DOCUMENT_ROUTE_PATTERNS` in both frontends' config. Types with no route go in `UNPREVIEWABLE_DOCUMENT_TYPES`.
- **Media**: `media.type` is `image` | `video` (Mux, looping image replacement) | `vimeo` (Vimeo URL, alternative provider).
- **Forms**: `form` documents (groups of `formField`, `formConsent` terms) rendered by `sectionForm`. Submissions POST multipart `FormData` (+ `formId`) to `/api/forms` (Astro), which validates them with zod against the form's fields (built to `/forms.json` at deploy, so no Sanity read per submission), answers `{ ok, message, errors }` with errors keyed by field name, and saves a read-only `formSubmission` document (Studio → Library → Form Submissions; uploads become file assets) with the editor token.

## Deployment (Cloudflare Workers Builds)

Cloudflare builds and deploys from git; no GitHub Actions. Each `env` in `frontend/wrangler.jsonc` is its own Worker in the client's Cloudflare account, connected to the repo:

```
production          main             static, published; Sanity deploy hook
production-preview  main             SSR, drafts, noindex; code changes only
branch Previews     any other branch production build via `wrangler preview`, noindex
```

Worker build settings (dashboard → Settings → Build):

- Root directory `frontend`; build watch paths `frontend/*`, `sanity/*`, `shopify/*`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.tool-versions`; build cache on.
- Build command `pnpm install --frozen-lockfile --filter frontend... && pnpm build`; deploy and Preview commands stay the defaults (`npx wrangler deploy` / `npx wrangler preview`). Preview builds on production only.
- Build variables: `CLOUDFLARE_ENV=<env>`, `SKIP_DEPENDENCY_INSTALL=1` (skips the whole-workspace install), and every `secrets.required` name as a secret.
- Runtime secrets are set once per Worker (deploys keep them): `npx wrangler secret bulk --env <env>` and, for Previews, `npx wrangler preview base-config secret bulk --env production`, each fed a JSON or `.env` file.

`CLOUDFLARE_ENV` selects the env at build; the adapter writes a redirected config into `dist/` that `wrangler deploy` follows. Node comes from `.tool-versions` (an LTS the build image preinstalls), pnpm from `packageManager`. Lint + typecheck run in a pre-push hook (`simple-git-hooks`), not in builds.

Rebuilds on content:

- **Sanity**: a webhook (create/update/delete, published only, projection `{}`) POSTs to the production Worker's deploy hook. The drafts site renders live and needs none.
- **Shopify** needs no webhook: Sanity Connect's sync writes product create/delete and title/handle/status edits to Sanity, which fires the Sanity webhook. Price-only changes don't rebuild (static prices update on the next build; product pages read live price and stock from `/api/product`). Shopify's `products/update` also fires on orders, so hooking it up would rebuild on every sale.
- A hook that fires while its last build is still queued or initializing returns that build instead of starting another, so bursts collapse. Limits: 10 builds/min per Worker.

Deploy hook URLs are credentials (no auth header): keep them only in the webhook settings; delete and recreate one if it leaks.

`/api/shopify-sanity-sync` (on production) requires `SHOPIFY_SANITY_SYNC_SECRET`: set the Sanity Connect custom sync URL to `…/api/shopify-sanity-sync?secret=<value>` (or send `Authorization: Bearer <value>`); anything else gets 401.

To add an environment: an `env` in `wrangler.jsonc`, its `DEPLOY_ENVIRONMENTS` entry, then a Worker connected to the repo with the settings above.

## New project checklist

Replace the template's values:

- `frontend/wrangler.jsonc`: `name` (worker names derive from it) + `account_id`.
- `shopify/config.ts`: `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_PUBLIC_API_TOKEN`; `.env` `SHOPIFY_PRIVATE_API_TOKEN` (same Headless channel storefront).
- `DEPLOY_ENVIRONMENTS` in `frontend/config.ts`: `*.workers.dev` (or custom domain) URLs + Sanity project/dataset; `SANITY_STUDIO_PREVIEW_URL` in `.env.example`.
- `LOCALES` in `frontend/config.ts`: one per Shopify market, default first (unprefixed). Curated on purpose (each is a URL prefix and a full copy of the site; Shopify's country-selector guide recommends a static list); locales Shopify doesn't sell to are left out at build.
- `THEME_COLOR` in both frontends' config (browser UI + manifest, which is generated with the organisation name) and the `web-app-manifest-*.png` / favicon icons in each `public/`.
- Cloudflare: connect each `env`'s Worker to the repo with the build settings in Deployment, and set its runtime secrets (plus the Previews Base on production).
- Sanity webhook → the production deploy hook; Sanity Connect sync URL → production.
- Sanity project + dataset: `.env` (`SANITY_*` and `SANITY_STUDIO_*`), then `pnpm gen`.

## What NOT to do

- No `sanityClient.request()` in a component that renders on more than one page, or in a detail page for its own document.
- No secrets in client bundles.
- No `@sanity/image-url` — image URLs are built in `lib/sanity/images.ts`. No hand-rolled `<img>`/`<a>` for Sanity data — use `SanityImage`/`SanityLink`.
- No component libraries, no CSS-in-JS.
- No decorative or obvious comments.
