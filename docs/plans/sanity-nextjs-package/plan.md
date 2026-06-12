## Goal
Create `sanity-nextjs/` workspace package — Next.js-compatible Sanity client mirroring `sanity/` but using `process.env`.

## Key Context

**Existing `sanity/client.ts`** uses `astro:env/client` for: `SANITY_DATASET`, `SANITY_VIEWER_API_TOKEN`, `PREVIEW`. Config (`SANITY_PROJECT_ID`) is hardcoded in `sanity/config.ts`.

**Existing `.env`** at `frontend/.env` has all needed vars. `sanity-nextjs` reads same vars via `process.env` (server-side only, no `NEXT_PUBLIC_` needed).

**`sanity/` exports**: `@sanity/webhook`, `@sanity/client`, plus internal: `config`, `client`, `queries/*`, `generated/*`.

## Plan:

1. Create `sanity-nextjs/package.json` — depends on `sanity:workspace:*` (for types/queries) + `graphql-request`
2. Create `sanity-nextjs/config.ts` — re-exports `SANITY_PROJECT_ID` from `sanity/config`
3. Create `sanity-nextjs/client.ts` — `GraphQLClient` using `process.env.SANITY_DATASET`, `process.env.SANITY_VIEWER_API_TOKEN`, `process.env.PREVIEW`
4. Create `sanity-nextjs/index.ts` — re-exports everything from `sanity/` plus `client`
5. Update `pnpm-workspace.yaml` — add `sanity-nextjs`
6. Update `frontend-nextjs/package.json` — switch `sanity:workspace:*` → `sanity-nextjs:workspace:*`, add `graphql-request`

## Files to Modify
- `pnpm-workspace.yaml` — add `sanity-nextjs` entry
- `frontend-nextjs/package.json` — swap sanity dep to sanity-nextjs + add graphql-request

## New Files
- `sanity-nextjs/package.json`
- `sanity-nextjs/config.ts`
- `sanity-nextjs/client.ts`
- `sanity-nextjs/index.ts`

## Risks
- Must run `pnpm install` after
- SanityNextJSImage field component imports from `sanity/generated/graphql` — still works via transitive dep through `sanity-nextjs` → `sanity`
