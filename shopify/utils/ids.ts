export function shopifyIdFromGid(gid: string): string {
  const parts = gid.split("/");
  return parts[parts.length - 1];
}

export function shopifyGidFromId(
  resource: "Product" | "Collection",
  id: string
): string {
  return `gid://shopify/${resource}/${id}`;
}
