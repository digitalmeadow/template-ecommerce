# Copilot Instructions for Template Ecommerce

This is a monorepo built with **Astro**, **Sanity CMS**, and **Shopify**, connected via GraphQL and deployed to **Cloudflare Workers**.

## 🏗 Architecture & Stack

- **Package Manager**: `pnpm` (Workspace enabled).
- **Frontend**: Astro 5 (Hybrid rendering) + Cloudflare Adapter (`@astrojs/cloudflare`).
- **CMS**: Sanity Studio v3 (`/cms`).
- **Commerce**: Shopify Storefront API.
- **Data Layer**:
  - `sanity` package: Shared Sanity client, queries, and generated types.
  - `shopify` package: Shared Shopify client, queries, and generated types.

## 📁 Repository Structure

- `frontend/`: Main Astro application.
- `cms/`: Sanity Studio configuration and schemas.
- `sanity/`: Shared library for Sanity interaction (ApiClient, Queries, Types).
- `shopify/`: Shared library for Shopify interaction (ApiClient, Queries, Types).

## 🔄 Data Flow & Type Safety

Strict type safety is enforced via GraphQL codegen.

1.  **Modify Queries**: Edit `*.ts` files in `sanity/queries/` or `shopify/queries/`.
2.  **Generate Types**: Run `pnpm gen` (or `pnpm --filter <pkg> gen`) to update TypeScript definitions.
    - This runs `graphql-codegen` and updates `*/generated/graphql.ts`.
3.  **Consume Data**:
    - Import client from `sanity/client` or `shopify/client`.
    - Import queries from `sanity/queries/...`.
    - Import types from `sanity/generated/graphql`.

### Sanity Preview Pattern

The frontend handles draft/published content selection:

```typescript
import { selectDocument } from "../lib/sanity/drafts";
// ... fetch data ...
const componentQuery: HeaderQueryQuery =
  await sanityClient.request(headerQuery);
const headerData = selectDocument(componentQuery.allHeader);
```

Always use `selectDocument` when fetching singleton or document data to handle preview mode gracefully.

## 🎨 Frontend Development Patterns (Astro)

### Component Structure

- **Blocks/Sections**: `src/blocks/` and `src/sections/` map to CMS components.
- **Fields**: Primitives (Images, Links, Video) live in `src/fields/`.

### Styling

- **Methodology**: Scoped CSS (`<style>` blocks) + Global CSS Variables.
- **Variables**: Defined in `src/styles/` (e.g., `--margin`, `--s8`, `--font-body`).
- **Do not use Tailwind**: Use vanilla CSS with variables available in `base.css`.

### Client-Side Interactivity

- **Vanilla JS**: Use `<script>` tags inside Astro components.
- **Event-Driven**: Components communicate via custom window events (e.g., `cart:updated`, `product:add-to-cart`).
- **Reactivity**: No client-side framework (React/Vue) or DOM diffing.
  - **Pattern**: Destroy and recreate the DOM subtree with current state (`container.innerHTML = ''` → loop & clone template).
  - **Templates**: Use `<template>` tags for repeating elements to support this pattern.
  - **Example**: See `Cart.astro`—it fetches new state, clears the list, and re-renders lines from a template.

## 🛠 Critical Workflows

- **Development**: `pnpm dev` runs everything (Astro + Sanity Studio).
- **Codegen**: ALWAYS run `pnpm gen` after changing GraphQL queries or Sanity schemas.
- **Env Variables**: Managed in `astro.config.mjs` via `env.schema` (Astro 5). Access them via `import { PREVIEW } from "astro:env/client"` (or `server`).

## 🚀 Deployment

- **Preview**: `pnpm preview` simulates the Cloudflare environment locally (`wrangler`).
- **Modes**:
  - `PREVIEW=true`: SSR mode (live previews).
  - `PREVIEW=false`: Static mode (SSG).
