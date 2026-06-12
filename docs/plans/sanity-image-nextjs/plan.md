## Goal
Port SanityImage from Astro to Next.js using `next/image` with a custom Sanity CDN loader.

## Key Context

**Type** (from `sanity/generated/graphql.ts`):
```ts
type SanityImageFragment = {
  asset?: {
    url?: string | null
    altText?: string | null
    metadata?: {
      lqip?: string | null
      dimensions?: { width?: number | null; height?: number | null; aspectRatio?: number | null } | null
    } | null
  } | null
  hotspot?: { x?: number; y?: number; height?: number; width?: number } | null
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | null
} | null
```

**Loader contract**: `loaderFile` exports default `({ src, width, quality }) => string`. Only invoked for remote URL `src` values — static imports bypass it.

**Sanity CDN URL format**: `https://cdn.sanity.io/images/{projectId}/{dataset}/{imageId}.{ext}` → append `?w={width}&fit=max&auto=format`

**Next.js tsconfig**: already has `@/*` → `./src/*` alias.

## Plan:
1. `frontend-nextjs/package.json` — add `"sanity": "workspace:*"` to dependencies for type imports
2. `frontend-nextjs/src/lib/sanity/images.ts` — create file with default-exported image loader function and `getSanityImageProps` helper for sizes attribute
3. `frontend-nextjs/next.config.ts` — add `images.loader: "custom"` and `images.loaderFile: "./src/lib/sanity/images.ts"`
4. `frontend-nextjs/src/fields/SanityImage.tsx` — server component: wrapper div + `<Image />` with layout-aware props, blur placeholder, sizes, loading

## Files to Modify
- `frontend-nextjs/package.json` — add dependency
- `frontend-nextjs/next.config.ts` — add images config

## New Files
- `frontend-nextjs/src/lib/sanity/images.ts` — image loader + sizes helper
- `frontend-nextjs/src/fields/SanityImage.tsx` — SanityImage component

## Consumer Files
None yet — SanityImage will be consumed when we port sections/pages later.

## Risks
- Next.js 16 requires `qualities: [75]` config — must include or loader may fail
- `loader` prop on `<Image>` would require client component; using `loaderFile` avoids this
- `placeholder="blur"` without `blurDataURL` produces empty placeholder — fallback to "empty" when lqip is null
