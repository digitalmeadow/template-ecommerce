import { PREVIEW } from "astro:env/client";

/**
 * A static build renders every page in one process, so values identical across pages can be
 * fetched once. Dev must stay live so CMS edits show on reload, and the preview worker reuses
 * isolates across requests while serving drafts — caching either would pin stale content.
 */
const enabled = import.meta.env.PROD && PREVIEW !== "true";

/** Caches the promise, not the value: concurrent page renders share one in-flight request. */
export function buildScoped<T>(load: () => Promise<T>): () => Promise<T> {
  let cached: Promise<T> | undefined;

  return () => {
    if (!enabled) return load();
    cached ??= load();
    return cached;
  };
}

/** `buildScoped` per key, for lookups many pages repeat (e.g. the same product thumbnail). */
export function buildScopedByKey<T>(load: (key: string) => Promise<T>): (key: string) => Promise<T> {
  const cached = new Map<string, Promise<T>>();

  return (key) => {
    if (!enabled) return load(key);
    let promise = cached.get(key);
    if (!promise) {
      promise = load(key);
      cached.set(key, promise);
      // A failed lookup shouldn't poison every later page that asks for the same key.
      promise.catch(() => cached.delete(key));
    }
    return promise;
  };
}
