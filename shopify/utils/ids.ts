export function shopifyIdFromGid(gid: string): string {
  const parts = gid.split("/");
  return parts[parts.length - 1];
}
