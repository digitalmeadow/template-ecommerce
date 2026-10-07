interface SlugPath<T> {
  params: { slug: string };
  props: T;
}

/**
 * The preview site builds with `output: "server"`, where Astro ignores getStaticPaths and hands
 * the page an empty `Astro.props`. Every component is null-guarded, so the page would render its
 * shell with no content and no error. Detail pages call this to resolve the same props from the
 * slug at request time; on the static live build `Astro.props` is already populated and the
 * fetch is skipped.
 *
 * Dev takes the request-time path too: Astro caches getStaticPaths for the life of the server and
 * only invalidates it when the page module changes, so trusting `Astro.props` there pins the
 * content to whatever Sanity returned on first render. Adding or removing a document still needs
 * a restart — the cached paths are what dev matches the URL against.
 */
export async function propsForSlug<T extends object>(
  props: T,
  slug: string | undefined,
  buildPaths: () => Promise<SlugPath<T>[]>,
): Promise<T | null> {
  if (!import.meta.env.DEV && Object.keys(props).length > 0) return props;
  if (!slug) return null;

  const paths = await buildPaths();
  return paths.find((path) => path.params.slug === slug)?.props ?? null;
}
