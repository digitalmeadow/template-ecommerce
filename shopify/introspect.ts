import { writeFile } from "node:fs/promises";
import { getIntrospectionQuery } from "graphql";
import { SHOPIFY_STOREFRONT_URL, shopifyClient } from "./client";

const schema = await shopifyClient.request(getIntrospectionQuery());
await writeFile("schema.json", JSON.stringify(schema, null, 2) + "\n");
console.log(`Wrote schema.json from ${SHOPIFY_STOREFRONT_URL}`);
