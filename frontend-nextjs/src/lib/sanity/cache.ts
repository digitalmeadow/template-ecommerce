import { cache } from "react";

/**
 * `next build` renders every static page in long-lived workers, so values identical across pages
 * can be fetched once per worker. Dev, `next start` and preview must stay live, so only the build
 * phase memoises; React `cache` still dedupes layout/metadata/page calls within one request.
 */
const enabled =
  process.env.NEXT_PHASE === "phase-production-build" &&
  process.env.PREVIEW !== "true";

/** Whether bulk queries are shared across pages; when not, fetch only the document a route needs. */
export const buildCacheEnabled = enabled;

/** Caches the promise, not the value: concurrent page renders share one in-flight request. */
export function buildScoped<T>(load: () => Promise<T>): () => Promise<T> {
  let cached: Promise<T> | undefined;

  return cache(() => {
    if (!enabled) return load();
    cached ??= load();
    return cached;
  });
}

/** `buildScoped` per key, for lookups many pages repeat (e.g. the same product thumbnail). */
export function buildScopedByKey<T>(
  load: (key: string) => Promise<T>,
): (key: string) => Promise<T> {
  const cached = new Map<string, Promise<T>>();

  return cache((key: string) => {
    if (!enabled) return load(key);
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
