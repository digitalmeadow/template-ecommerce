const cache = new Map<string, Promise<unknown>>();

/**
 * JSON prerendered at build (e.g. `/product-thumbnails.json`), read by on-demand routes instead
 * of calling Sanity per request. Held per server instance; a deploy starts fresh ones.
 * Not `buildScopedByKey`: that's inert outside the build, where this cache is needed.
 */
export function loadBuildJson<T>(path: string, url: URL | string): Promise<T> {
  const cached = cache.get(path);
  if (cached && process.env.NODE_ENV === "production") return cached as Promise<T>;

  const loading = (async () => {
    const response = await fetch(new URL(path, url));
    if (!response.ok) throw new Error(`${path} responded ${response.status}`);
    return (await response.json()) as T;
  })();
  cache.set(path, loading);
  loading.catch(() => cache.delete(path));
  return loading;
}
