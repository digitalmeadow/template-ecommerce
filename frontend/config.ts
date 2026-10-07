export const GIT_OWNER = "digitalmeadow";
export const GIT_REPO = "template-ecommerce";
export const GIT_WORKFLOW_ID_DEPLOY = "deploy.yml";

export const SANITY_DOCUMENT_ROUTE_PATTERNS: Record<string, string> = {
  header: "/",
  footer: "/",
  home: "/",
  page: "/[slug]",
  product: "/products/[slug]",
  collection: "/collections/[slug]",
};

// Form submissions POST here as multipart FormData. Unset renders forms that validate but can't send.
export const FORM_ENDPOINT: string | undefined = undefined;
