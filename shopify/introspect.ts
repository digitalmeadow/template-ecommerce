import { writeFile } from "node:fs/promises";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { getIntrospectionQuery, parse, type IntrospectionQuery } from "graphql";
import { SHOPIFY_STOREFRONT_URL, shopifyClient } from "./client";

const introspectionQuery: TypedDocumentNode<IntrospectionQuery, Record<string, never>> = parse(
  getIntrospectionQuery(),
);

const schema = await shopifyClient.request(introspectionQuery);
await writeFile("schema.json", JSON.stringify(schema, null, 2) + "\n");
console.log(`Wrote schema.json from ${SHOPIFY_STOREFRONT_URL}`);
