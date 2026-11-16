import { SHOPIFY_STOREFRONT_URL } from "shopify/client";

interface Redirect {
  source: string;
  destination: string;
  permanent: true;
}

interface UrlRedirectsPage {
  data?: {
    urlRedirects: {
      nodes: { path: string; target: string }[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  };
}

const URL_REDIRECTS_QUERY = `query UrlRedirects($after: String) {
  urlRedirects(first: 250, after: $after) {
    nodes { path target }
    pageInfo { hasNextPage endCursor }
  }
}`;

// Shopify's default storefront paths, so links from old Liquid themes and Shopify emails still land.
const STANDARD_PATHS = [
  { source: "/pages/:handle", destination: "/:handle" },
  { source: "/collections/:collection/products/:handle", destination: "/products/:handle" },
];

// Redirect sources are path-to-regexp patterns; Shopify paths are literal.
function escapePattern(path: string): string {
  return path.replace(/[:()*+?{}]/g, "\\$&");
}

/** The store's URL redirects (Shopify admin → Navigation → URL redirects), read once per build. */
async function fetchShopifyRedirects(): Promise<{ path: string; target: string }[]> {
  const token = process.env.SHOPIFY_PRIVATE_API_TOKEN;
  if (!token) return [];

  const redirects: { path: string; target: string }[] = [];
  let after: string | null = null;
  try {
    do {
      const response = await fetch(SHOPIFY_STOREFRONT_URL, {
        method: "POST",
        headers: { "content-type": "application/json", "Shopify-Storefront-Private-Token": token },
        body: JSON.stringify({ query: URL_REDIRECTS_QUERY, variables: { after } }),
      });
      const { data } = (await response.json()) as UrlRedirectsPage;
      if (!data) throw new Error(`Storefront API responded ${response.status}`);
      redirects.push(...data.urlRedirects.nodes);
      after = data.urlRedirects.pageInfo.hasNextPage ? data.urlRedirects.pageInfo.endCursor : null;
    } while (after);
  } catch (error) {
    console.warn("Couldn't read Shopify's URL redirects; building without them.", error);
  }
  return redirects;
}

/**
 * next.config redirects run before the proxy, so each applies unprefixed and under every other
 * locale's prefix. Shopify redirects are baked in at build: a change in admin lands on the next build.
 */
export async function buildRedirects(prefixedLocalePaths: string[]): Promise<Redirect[]> {
  const shopifyRedirects = await fetchShopifyRedirects();
  const redirects = [
    ...STANDARD_PATHS,
    ...shopifyRedirects.map(({ path, target }) => ({
      source: escapePattern(path.replace(/\/+$/, "") || "/"),
      destination: target,
    })),
  ];

  const localePattern = prefixedLocalePaths.join("|");
  const isInternal = (destination: string) => destination.startsWith("/");

  return redirects.flatMap(({ source, destination }) => [
    { source, destination, permanent: true as const },
    ...(localePattern
      ? [
          {
            source: `/:locale(${localePattern})${source}`,
            destination: isInternal(destination) ? `/:locale${destination}` : destination,
            permanent: true as const,
          },
        ]
      : []),
  ]);
}
