// Ambient shim for Astro's virtual env module: this package is a plain TS
// library with no Astro dependency of its own, but client.ts is consumed by
// the `frontend` Astro app, which provides the real types via its own
// generated .astro/types.d.ts. This stub only exists so `tsc --noEmit` can
// type-check this package standalone.
declare module "astro:env/client" {
  export const SANITY_DATASET: string;
  export const SANITY_VIEWER_API_TOKEN: string;
  export const PREVIEW: string;
}
