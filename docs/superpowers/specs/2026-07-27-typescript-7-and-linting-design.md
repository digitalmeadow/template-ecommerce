# TypeScript 7 upgrade + monorepo linting/typecheck coverage

## Problem

1. Repo is on TypeScript 6.0.3 (root/cms) / ^5 (frontend-nextjs). TypeScript 7.0.2 (latest npm `latest` tag, released 2026-07-08) is out — the native Go-rewrite compiler, shipped as per-platform binaries via `optionalDependencies`.
2. Lint/typecheck coverage across the 6-package pnpm workspace is inconsistent and, for the package that's actually deployed, nonexistent:
   - Only `cms` and `frontend-nextjs` have any ESLint config.
   - `cms` has the config but no `lint` script wired up — never runs.
   - `frontend` (the Astro app — the only package any GitHub Actions workflow builds/deploys) has zero lint and zero type-checking. `astro build` doesn't type-check by default.
   - `sanity`, `sanity-nextjs`, `shopify` are real TS source libraries (imported directly by the frontends as workspace deps) with no tsconfig/eslint.
   - Root `pnpm lint` (`-r`) silently skips packages without a `lint` script, so it only ever covered 2 of 6 packages.
   - No CI workflow (`deploy-production.yml`, `deploy-staging.yml`, `deploy-api.yml`) runs lint or typecheck before deploying — they just `pnpm build` then deploy.
   - Pre-existing version drift: `frontend-nextjs` pinned `typescript ^5` while everything else was already on `6.0.3`.

## Goals

- Every package in the workspace builds with TypeScript 7.0.2.
- Every package has a working `lint` script (ESLint) and a `typecheck` script (`tsc --noEmit` / `astro check`), runnable individually or via root `pnpm lint` / `pnpm typecheck`.
- `frontend`'s build path actually surfaces type diagnostics (it currently doesn't).
- CI fails before deploy if lint or typecheck fails, for the workflows that build `frontend`.

## Known risk, accepted

`typescript-eslint` (peer range `>=4.8.4 <6.1.0`, even on canary) and `@astrojs/check` (peer range `^5.0.0 || ^6.0.0`) do not yet officially claim support for TypeScript 7. These are peer-range declarations, not proof of breakage — parsing/type-checking frequently keeps working on newer compiler versions before peer ranges catch up — but this is unverified until we actually run the tools.

Decision: upgrade to TS7 everywhere anyway, then verify by actually running lint/typecheck in every package. If something genuinely breaks (not just a peer-dependency warning), surface it as an explicit decision point (e.g. disable a specific type-aware rule, pin one package back) rather than silently downgrading or disabling checks.

## Design

### 1. Version bump
`typescript@7.0.2` as an explicit devDependency in every package: root, `frontend`, `frontend-nextjs`, `cms`, `sanity`, `sanity-nextjs`, `shopify`. (Explicit per-package rather than relying on root hoisting, for clarity in a workspace where packages are consumed as source.)

### 2. Tooling for currently-uncovered packages
- **`frontend`** (Astro): add `eslint`, `eslint-plugin-astro`, `typescript-eslint`, `@astrojs/check` as devDeps. New `eslint.config.mjs` (typescript-eslint recommended + astro recommended, astro parser for `.astro` files). New scripts: `lint` (`eslint .`), `typecheck` (`astro check`).
- **`sanity`, `sanity-nextjs`, `shopify`** (plain TS source libs, no framework): add `tsconfig.json` (strict, noEmit, module/target matching their consumers) + a minimal shared-shape `eslint.config.mjs` (typescript-eslint recommended, no framework plugin). New scripts: `lint`, `typecheck` (`tsc --noEmit`).
- **`cms`**: config already exists (`@sanity/eslint-config-studio`) — just add `lint` (`eslint .`) and `typecheck` (`tsc --noEmit`) scripts to `package.json`.
- **`frontend-nextjs`**: already has ESLint config + tsconfig, and `next build` already type-checks by default. Add a standalone `typecheck` (`tsc --noEmit`) script for fast feedback outside a full build. Otherwise just verify it still passes post-upgrade.

### 3. Root aggregation
Root `package.json` gets a `typecheck` script (`pnpm run --parallel -r typecheck`), matching the existing `lint` pattern. `pnpm lint && pnpm typecheck` becomes the one pair of commands that surfaces every diagnostic, in every package, with file locations.

### 4. CI gate
Add a `Lint & typecheck` step to `deploy-production.yml`, `deploy-staging.yml`, `deploy-api.yml`, after `Install dependencies` and before `Build`, scoped to `working-directory: frontend` (matching how these workflows already only ever build/deploy `frontend`): run `pnpm lint && pnpm typecheck`. Workflow fails before the Cloudflare deploy step if either fails.

### 5. Verification (part of implementation, not follow-up)
After the upgrade, actually run `pnpm lint` and `pnpm typecheck` (and `pnpm build`) across the whole workspace. Fix real, pre-existing diagnostics that surface. If TS7 causes a genuine functional break (not just a peer-warning) in typescript-eslint or `@astrojs/check`, stop and raise it as a decision point rather than quietly working around it.

## Explicitly out of scope
- No new CI workflow for `frontend-nextjs` — none exists today and none was requested. It gets upgraded and its existing lint/typecheck verified, but isn't wired into any deploy pipeline.
- No change to what CI actually deploys (still only `frontend`).

## Rollout
Single branch, all packages upgraded together (small monorepo, tightly coupled via workspace deps — no value in a partial/staged rollout here). Verify locally (`pnpm -r lint`, `pnpm -r typecheck`, `pnpm -r build`) before pushing.
