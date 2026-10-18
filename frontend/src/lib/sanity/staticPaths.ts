// Preview (server output) skips getStaticPaths and dev caches it: both load props per request.
export async function propsForSlug<T extends object>(
  props: T,
  slug: string | undefined,
  loadProps: (slug: string) => Promise<T | null>,
): Promise<T | null> {
  if (!import.meta.env.DEV && Object.keys(props).length > 0) return props;
  if (!slug) return null;
  return loadProps(slug);
}
