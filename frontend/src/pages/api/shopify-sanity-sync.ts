import type { APIRoute } from "astro";
import { SHOPIFY_SANITY_SYNC_SECRET } from "astro:env/server";
import { shopifyIdFromGid } from "shopify/utils/ids";
import { sanityWriteClient } from "@lib/sanity/writeClient";

// https://www.sanity.io/docs/custom-sync-handlers-for-sanity-connect

export const prerender = false;

const PRODUCT_DOCUMENT_TYPE = "product";
const PRODUCT_VARIANT_DOCUMENT_TYPE = "productVariant";
const COLLECTION_DOCUMENT_TYPE = "collection";

const SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX = "product-";
const SHOPIFY_PRODUCT_VARIANT_DOCUMENT_ID_PREFIX = "productVariant-";
const SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX = "collection-";

type Transaction = ReturnType<typeof sanityWriteClient.transaction>;
type SyncedDocument = { _id: string; _type: string };

// Sanity Connect can't send custom headers, so its sync URL carries `?secret=`; a Bearer header also works.
function getProvidedSecret(request: Request): string | null {
  const bearer = request.headers.get("Authorization")?.match(/^Bearer (.+)$/)?.[1];
  return bearer ?? new URL(request.url).searchParams.get("secret");
}

// Hashing first gives equal-length inputs, so the comparison time doesn't leak the secret.
async function isSecretEqual(provided: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [providedHash, expectedHash] = await Promise.all(
    [provided, expected].map(
      async (value) => new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))),
    ),
  );
  let difference = 0;
  for (let index = 0; index < expectedHash.length; index++) {
    difference |= providedHash[index] ^ expectedHash[index];
  }
  return difference === 0;
}

export const POST: APIRoute = async ({ request }) => {
  const providedSecret = getProvidedSecret(request);
  if (!providedSecret || !(await isSecretEqual(providedSecret, SHOPIFY_SANITY_SYNC_SECRET))) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = (await request.json()) as RequestPayload;

    switch (body.action) {
      case "create":
      case "update":
      case "sync":
        await syncCreateOrUpdate(body);
        break;
      case "delete":
        await syncDelete(body);
        break;
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};

type CreateOrUpdatePayload = PayloadProductsSync | PayloadCollectionsSync;
type DeletePayload = PayloadProductsDelete | PayloadCollectionsDelete;

async function syncCreateOrUpdate(body: RequestPayload) {
  const transaction = sanityWriteClient.transaction();
  const payload = body as CreateOrUpdatePayload;

  if ("products" in payload && payload.products?.length) {
    await upsertDocuments(transaction, payload.products.map(buildProductDocument));
    await upsertDocuments(
      transaction,
      payload.products.flatMap((product) =>
        product.variants.map((variant) => buildProductVariantDocument(product, variant)),
      ),
    );
  }

  if ("collections" in payload && payload.collections?.length) {
    await upsertDocuments(transaction, payload.collections.map(buildCollectionDocument));
  }

  await transaction.commit();
}

async function syncDelete(body: RequestPayload) {
  const payload = body as DeletePayload;

  const transaction = sanityWriteClient.transaction();

  if ("productIds" in payload && payload.productIds?.length) {
    deleteProducts(transaction, payload.productIds);
  }
  if ("collectionIds" in payload && payload.collectionIds?.length) {
    deleteCollections(transaction, payload.collectionIds);
  }

  await transaction.commit();
}

function sanityDocumentId(prefix: string, gid: string): string {
  return `${prefix}${shopifyIdFromGid(gid)}`;
}

async function getExistingDocumentIds(ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const documents = await sanityWriteClient.getDocuments(ids);
  const existingIds = documents
    .map((document) => document?._id)
    .filter((id): id is string => typeof id === "string");
  return new Set(existingIds);
}

// Writes the published document and mirrors it onto an existing draft, so open drafts don't revert Shopify fields.
async function upsertDocuments(transaction: Transaction, documents: SyncedDocument[]) {
  const existingDrafts = await getExistingDocumentIds(
    documents.map((document) => `drafts.${document._id}`),
  );

  for (const document of documents) {
    const draftId = `drafts.${document._id}`;

    transaction.createIfNotExists(document).patch(document._id, (patch) => patch.set(document));

    if (existingDrafts.has(draftId)) {
      transaction.patch(draftId, (patch) => patch.set({ ...document, _id: draftId }));
    }
  }
}

function deleteProducts(transaction: Transaction, productIds: number[]) {
  for (const productId of productIds) {
    const documentId = `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productId}`;
    transaction.delete(documentId).delete(`drafts.${documentId}`);
  }
}

function deleteCollections(transaction: Transaction, collectionIds: number[]) {
  for (const collectionId of collectionIds) {
    const documentId = `${SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX}${collectionId}`;
    transaction.delete(documentId).delete(`drafts.${documentId}`);
  }
}

function buildProductDocument(product: Product) {
  return {
    _id: sanityDocumentId(SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX, product.id),
    _type: PRODUCT_DOCUMENT_TYPE,
    shopify: {
      id: shopifyIdFromGid(product.id),
      title: product.title,
      handle: { current: product.handle },
      status: product.status,
    },
  };
}

function buildProductVariantDocument(product: Product, variant: ProductVariant) {
  return {
    _id: sanityDocumentId(SHOPIFY_PRODUCT_VARIANT_DOCUMENT_ID_PREFIX, variant.id),
    _type: PRODUCT_VARIANT_DOCUMENT_TYPE,
    shopify: {
      id: shopifyIdFromGid(variant.id),
      title: variant.title,
      sku: variant.sku,
      productId: shopifyIdFromGid(product.id),
    },
    product: {
      _type: "reference",
      _ref: sanityDocumentId(SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX, product.id),
    },
  };
}

function buildCollectionDocument(collection: Collection) {
  return {
    _id: sanityDocumentId(SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX, collection.id),
    _type: COLLECTION_DOCUMENT_TYPE,
    shopify: {
      id: shopifyIdFromGid(collection.id),
      title: collection.title,
      handle: { current: collection.handle },
    },
  };
}

// Payload shapes: https://www.sanity.io/docs/sanity-connect-for-shopify-reference
export type Product = {
  id: `gid://shopify/Product/${string}`;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage?: ProductImage;
  handle: string;
  images: ProductImage[];
  options: ProductOption[];
  priceRange: ProductPriceRange;
  productType: string;
  tags: string[];
  variants: ProductVariant[];
  vendor: string;
  status: "active" | "archived" | "draft" | "unknown";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};
export type ProductImage = {
  id: `gid://shopify/ProductImage/${string}`;
  altText?: string;
  height?: number;
  width?: number;
  src: string;
};
export type ProductOption = {
  id: `gid://shopify/ProductOption/${string}`;
  name: string;
  position: number;
  values: string[];
};
export type ProductPriceRange = {
  minVariantPrice?: number;
  maxVariantPrice?: number;
};
export type ProductVariant = {
  id: `gid://shopify/ProductVariant/${string}`;
  title: string;
  compareAtPrice?: number;
  barcode?: string;
  inventoryPolicy: string;
  inventoryQuantity: number;
  inventoryManagement: string;
  position: number;
  requiresShipping: boolean;
  sku: string;
  taxable: boolean;
  weight: number;
  weightUnit: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  image?: ProductImage;
  product: {
    id: `gid://shopify/Product/${string}`;
    status: "active" | "archived" | "draft" | "unknown";
  };
  selectedOptions: {
    name: string;
    values: string;
  }[];
};
export type Collection = {
  id: `gid://shopify/Collection/${string}`;
  createdAt: string;
  handle: string;
  descriptionHtml: string;
  image?: CollectionImage;
  rules?: {
    column: string;
    condition: string;
    relation: string;
  }[];
  disjunctive?: boolean;
  sortOrder: string;
  title: string;
  updatedAt: string;
};
export type CollectionImage = {
  altText: string;
  height?: number;
  width?: number;
  src: string;
};

// When products are created, updated or manually synced
export type PayloadProductsSync = {
  action: "create" | "update" | "sync";
  products: Product[];
};

// When products are deleted
export type PayloadProductsDelete = {
  action: "delete";
  productIds: number[];
};

// When collections are created, updated or manually synced
export type PayloadCollectionsSync = {
  action: "create" | "update" | "sync";
  collections: Collection[];
};

// When collections are deleted
export type PayloadCollectionsDelete = {
  action: "delete";
  collectionIds: number[];
};

export type RequestPayload =
  PayloadProductsDelete | PayloadProductsSync | PayloadCollectionsDelete | PayloadCollectionsSync;
