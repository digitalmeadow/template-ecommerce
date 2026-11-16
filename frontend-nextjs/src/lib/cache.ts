import { cache } from "react";

const isPreview = process.env.PREVIEW === "true";

// Only `next build` memoises across pages (dev, `next start`, preview stay live); React `cache` dedupes within a request.
export const buildCacheEnabled = process.env.NEXT_PHASE === "phase-production-build" && !isPreview;

// A production server after the build (not dev, not the drafts site): every document already has its page.
export const isStaticRuntime =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build" &&
  !isPreview;

// Caches the promise, not the value: concurrent page renders share one in-flight request.
export function buildScoped<T>(load: () => Promise<T>): () => Promise<T> {
  let cached: Promise<T> | undefined;

  return cache(() => {
    if (!buildCacheEnabled) return load();
    cached ??= load();
    return cached;
  });
}

// `buildScoped` per key, for lookups many pages repeat (e.g. the same product thumbnail).
export function buildScopedByKey<T>(
  load: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  const cached = new Map<string, Promise<T>>();

  return cache((key: string) => {
    if (!buildCacheEnabled) return load(key);
    let promise = cached.get(key);
    if (!promise) {
      promise = load(key);
      cached.set(key, promise);
      // A failed lookup shouldn't poison every later page that asks for the same key.
      promise.catch(() => cached.delete(key));
    }
    return promise;
  });
}
