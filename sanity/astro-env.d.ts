// Ambient shim so this package type-checks standalone; the frontend supplies the real types.
declare module "astro:env/client" {
  export const SANITY_PROJECT_ID: string;
  export const SANITY_DATASET: string;
  export const PREVIEW: string;
}

declare module "astro:env/server" {
  export const SANITY_VIEWER_API_TOKEN: string;
}
