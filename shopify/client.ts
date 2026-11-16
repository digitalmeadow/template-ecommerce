import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print, type DocumentNode, type OperationDefinitionNode } from "graphql";
import { SHOPIFY_API_VERSION, SHOPIFY_PUBLIC_API_TOKEN, SHOPIFY_STORE_DOMAIN } from "./config";

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const TIMEOUT_MS = 30_000;
const QUERY_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

export interface ShopifyClientOptions {
  /** Ignored when `privateToken` is set. */
  publicToken?: string;
  /** Server only. */
  privateToken?: string;
  /** The buyer's IP, for server requests made on a buyer's behalf. Static builds don't send it. */
  buyerIp?: string;
}

interface ShopifyContext {
  country?: string;
  language?: string;
}

interface GraphQLErrorPayload {
  message: string;
  extensions?: { code?: string };
}

interface GraphQLResponse<TResult> {
  data?: TResult;
  errors?: GraphQLErrorPayload[];
  extensions?: { context?: ShopifyContext };
}

export class ShopifyError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;
  readonly requestId: string | undefined;
  readonly retryAfterMs: number | undefined;

  constructor(
    message: string,
    details: { status?: number; code?: string; requestId?: string; retryAfterMs?: number } = {},
  ) {
    super(message);
    this.name = "ShopifyError";
    this.status = details.status;
    this.code = details.code;
    this.requestId = details.requestId;
    this.retryAfterMs = details.retryAfterMs;
  }

  get isRetryable(): boolean {
    if (this.code === "THROTTLED") return true;
    if (this.status === undefined) return true;
    return this.status === 429 || this.status >= 500;
  }
}

export interface ShopifyClient {
  request<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    ...variables: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<TResult>;
  /**
   * Shopify silently answers an unknown or disabled country with the primary market, so
   * market-specific reads compare `context.country` with the country requested.
   */
  requestWithContext<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables: TVariables,
  ): Promise<{ data: TResult; context: ShopifyContext }>;
}

export function createShopifyClient(options: ShopifyClientOptions = {}): ShopifyClient {
  if (options.privateToken && "document" in globalThis) {
    throw new Error("The private Storefront token must never reach the browser.");
  }

  const headers: Record<string, string> = { "content-type": "application/json" };
  if (options.privateToken) headers["Shopify-Storefront-Private-Token"] = options.privateToken;
  else if (options.publicToken) headers["X-Shopify-Storefront-Access-Token"] = options.publicToken;
  if (options.buyerIp) headers["Shopify-Storefront-Buyer-IP"] = options.buyerIp;

  async function send<TResult>(
    document: DocumentNode,
    variables: unknown,
  ): Promise<GraphQLResponse<TResult> & { data: TResult }> {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: print(document), variables }),
      // A redirect would carry the token to another origin.
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }).catch((error: unknown) => {
      throw new ShopifyError(`Storefront API request failed: ${String(error)}`);
    });

    const requestId = response.headers.get("x-request-id") ?? undefined;

    if (!response.ok) {
      throw new ShopifyError(`Storefront API responded ${response.status}`, {
        status: response.status,
        requestId,
        retryAfterMs: parseRetryAfter(response.headers.get("retry-after")),
      });
    }

    const body = (await response.json()) as GraphQLResponse<TResult>;
    const error = body.errors?.[0];
    if (error || !body.data) {
      throw new ShopifyError(error?.message ?? "Storefront API returned no data", {
        status: response.status,
        code: error?.extensions?.code,
        requestId,
      });
    }
    return body as GraphQLResponse<TResult> & { data: TResult };
  }

  // Only queries retry: replaying a mutation could, say, add a cart line twice.
  async function sendWithRetry<TResult>(
    document: DocumentNode,
    variables: unknown,
  ): Promise<GraphQLResponse<TResult> & { data: TResult }> {
    const attempts = isQuery(document) ? QUERY_ATTEMPTS : 1;
    for (let attempt = 1; ; attempt++) {
      try {
        return await send<TResult>(document, variables);
      } catch (error) {
        if (!(error instanceof ShopifyError) || !error.isRetryable || attempt >= attempts) {
          throw error;
        }
        await wait(error.retryAfterMs ?? RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
      }
    }
  }

  return {
    async request<TResult, TVariables>(
      document: TypedDocumentNode<TResult, TVariables>,
      ...variables: TVariables extends Record<string, never> ? [] : [TVariables]
    ) {
      const { data } = await sendWithRetry<TResult>(document, variables[0] ?? {});
      return data;
    },
    async requestWithContext<TResult, TVariables>(
      document: TypedDocumentNode<TResult, TVariables>,
      variables: TVariables,
    ) {
      const { data, extensions } = await sendWithRetry<TResult>(document, variables);
      return { data, context: extensions?.context ?? {} };
    },
  };
}

/** Public-token client straight to the store: scripts and anything without the proxy. */
export const shopifyClient = createShopifyClient({ publicToken: SHOPIFY_PUBLIC_API_TOKEN });

function isQuery(document: DocumentNode): boolean {
  const operation = document.definitions.find(
    (definition): definition is OperationDefinitionNode =>
      definition.kind === "OperationDefinition",
  );
  return operation?.operation === "query";
}

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
