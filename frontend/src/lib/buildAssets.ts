import { env } from "cloudflare:workers";

const cache = new Map<string, Promise<unknown>>();

/**
 * JSON prerendered at build (e.g. `/product-thumbnails.json`), read by on-demand routes instead
 * of calling Sanity per request. Held per worker isolate; a deploy starts fresh isolates.
 * Not `buildScopedByKey`: that's inert on the preview worker, which needs this cache too.
 */
export function loadBuildJson<T>(path: string, url: URL): Promise<T> {
  const cached = cache.get(path);
  if (cached && !import.meta.env.DEV) return cached as Promise<T>;

  const loading = (async () => {
    // Dev has no built assets; the endpoint renders on request instead.
    let response = await env.ASSETS.fetch(new URL(path, url));
    if (!response.ok) response = await fetch(new URL(path, url));
    if (!response.ok) throw new Error(`${path} responded ${response.status}`);
    return (await response.json()) as T;
  })();
  cache.set(path, loading);
  loading.catch(() => cache.delete(path));
  return loading;
}
