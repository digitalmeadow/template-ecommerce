// https://www.sanity.io/docs/custom-sync-handlers-for-sanity-connect

export const prerender = false;

import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";

const PRODUCT_DOCUMENT_TYPE = "product";
const PRODUCT_VARIANT_DOCUMENT_TYPE = "productVariant";
const COLLECTION_DOCUMENT_TYPE = "collection";

const SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX = "product-";
const SHOPIFY_PRODUCT_VARIANT_DOCUMENT_ID_PREFIX = "productVariant-";
const SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX = "collection-";

const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: "2026-01-01",
  useCdn: false,
  token: import.meta.env.SANITY_EDITOR_API_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now();
  const body = (await request.json()) as requestPayload;

  console.log("🔵 Shopify Sync Started", {
    action: body.action,
    productCount: "products" in body ? body.products?.length : 0,
    collectionCount: "collections" in body ? body.collections?.length : 0,
    productIds: "productIds" in body ? body.productIds?.length : 0,
    collectionIds: "collectionIds" in body ? body.collectionIds?.length : 0,
  });

  try {
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

    const duration = Date.now() - startTime;
    console.log(`✅ Shopify Sync Completed in ${duration}ms`);

    return new Response(JSON.stringify({ success: true, duration }), {
      status: 200,
    });
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error("❌ Shopify Sync Failed", {
      error: error.message,
      stack: error.stack,
      duration,
    });

    return new Response(
      JSON.stringify({
        error: error.message || String(error),
        duration,
      }),
      {
        status: 500,
      }
    );
  }
};

type createOrUpdatePayload = payloadProductsSync | payloadCollectionsSync;
type deletePayload = payloadProductsDelete | payloadCollectionsDelete;

async function syncCreateOrUpdate(body: requestPayload) {
  const transaction = sanityClient.transaction();
  const payload = body as createOrUpdatePayload;

  if ("products" in payload && payload.products?.length) {
    const productStart = Date.now();
    console.log(`  📦 Processing ${payload.products.length} products...`);
    await createOrUpdateProducts(transaction, payload.products);
    console.log(`  ✓ Products processed in ${Date.now() - productStart}ms`);

    const variantStart = Date.now();
    const variantCount = payload.products.reduce(
      (sum, p) => sum + p.variants.length,
      0
    );
    console.log(`  🔧 Processing ${variantCount} product variants...`);
    await createOrUpdateProductVariants(transaction, payload.products);
    console.log(`  ✓ Variants processed in ${Date.now() - variantStart}ms`);
  }

  if ("collections" in payload && payload.collections?.length) {
    const collectionStart = Date.now();
    console.log(`  📚 Processing ${payload.collections.length} collections...`);
    await createOrUpdateCollections(transaction, payload.collections);
    console.log(
      `  ✓ Collections processed in ${Date.now() - collectionStart}ms`
    );
  }

  const commitStart = Date.now();
  console.log("  💾 Committing transaction...");
  await transaction.commit();
  console.log(`  ✓ Transaction committed in ${Date.now() - commitStart}ms`);
}

async function syncDelete(body: requestPayload) {
  const payload = body as deletePayload;

  const transaction = sanityClient.transaction();

  if ("productIds" in payload && payload.productIds?.length) {
    await deleteProducts(transaction, payload.productIds);
  }
  if ("collectionIds" in payload && payload.collectionIds?.length) {
    await deleteCollections(transaction, payload.collectionIds);
  }

  await transaction.commit();
}

async function getExistingDocumentIds(ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const docs = await sanityClient.getDocuments(ids);
  const existingIds = docs
    .map((doc) => doc?._id)
    .filter((id): id is string => typeof id === "string");
  return new Set(existingIds);
}

async function createOrUpdateProducts(
  transaction: ReturnType<typeof sanityClient.transaction>,
  products: Product[]
) {
  const draftDocumentIds = products.map((product) => {
    const productShopifyId = extractIdFromGid(product.id);
    const productSanityId = `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productShopifyId}`;
    return `drafts.${productSanityId}`;
  });
  const existingDrafts = await getExistingDocumentIds(draftDocumentIds);

  for (const product of products) {
    const document = await buildProductDocument(product);
    const draftId = `drafts.${document._id}`;

    transaction
      .createIfNotExists(document)
      .patch(document._id, (patch) => patch.set(document));

    if (existingDrafts.has(draftId)) {
      transaction.patch(draftId, (patch) =>
        patch.set({
          ...document,
          _id: draftId,
        })
      );
    }
  }
}

async function deleteProducts(
  transaction: ReturnType<typeof sanityClient.transaction>,
  productIds: number[]
) {
  for (const productId of productIds) {
    const docId = `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productId}`;
    transaction.delete(docId).delete(`drafts.${docId}`);
  }
}

async function createOrUpdateCollections(
  transaction: ReturnType<typeof sanityClient.transaction>,
  collections: Collection[]
) {
  const draftDocumentIds = collections.map((collection) => {
    const collectionShopifyId = extractIdFromGid(collection.id);
    const collectionSanityId = `${SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX}${collectionShopifyId}`;
    return `drafts.${collectionSanityId}`;
  });

  const existingDrafts = await getExistingDocumentIds(draftDocumentIds);

  for (const collection of collections) {
    const document = buildCollectionDocument(collection);
    const draftId = `drafts.${document._id}`;

    transaction
      .createIfNotExists(document)
      .patch(document._id, (patch) => patch.set(document));

    if (existingDrafts.has(draftId)) {
      transaction.patch(draftId, (patch) =>
        patch.set({
          ...document,
          _id: draftId,
        })
      );
    }
  }
}

async function deleteCollections(
  transaction: ReturnType<typeof sanityClient.transaction>,
  collectionIds: number[]
) {
  for (const collectionId of collectionIds) {
    const docId = `${SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX}${collectionId}`;
    transaction.delete(docId).delete(`drafts.${docId}`);
  }
}

async function createOrUpdateProductVariants(
  transaction: ReturnType<typeof sanityClient.transaction>,
  products: Product[]
) {
  const variants = products.flatMap((product) =>
    product.variants.map((variant) => ({ product, variant }))
  );
  if (!variants.length) return;

  const draftIds = variants.map(({ variant }) => {
    const variantShopifyId = extractIdFromGid(variant.id);
    const variantSanityId = `${SHOPIFY_PRODUCT_VARIANT_DOCUMENT_ID_PREFIX}${variantShopifyId}`;
    return `drafts.${variantSanityId}`;
  });
  const existingDrafts = await getExistingDocumentIds(draftIds);

  for (const { product, variant } of variants) {
    const document = buildProductVariantDocument(product, variant);
    const draftId = `drafts.${document._id}`;

    transaction
      .createIfNotExists(document)
      .patch(document._id, (patch) => patch.set(document));

    if (existingDrafts.has(draftId)) {
      transaction.patch(draftId, (patch) =>
        patch.set({
          ...document,
          _id: draftId,
        })
      );
    }
  }
}

async function buildProductDocument(product: Product) {
  const productShopifyId = extractIdFromGid(product.id);
  const productSanityId = `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productShopifyId}`;

  const productDocument = {
    _id: productSanityId,
    _type: PRODUCT_DOCUMENT_TYPE,
    shopify: {
      id: productShopifyId,
      title: product.title,
      handle: { current: product.handle },
      status: product.status,
    },
  };

  return productDocument;
}

function buildProductVariantDocument(
  product: Product,
  variant: ProductVariant
) {
  const variantShopifyId = extractIdFromGid(variant.id);
  const variantSanityId = `${SHOPIFY_PRODUCT_VARIANT_DOCUMENT_ID_PREFIX}${variantShopifyId}`;
  const productShopifyId = extractIdFromGid(product.id);
  const productSanityId = `${SHOPIFY_PRODUCT_DOCUMENT_ID_PREFIX}${productShopifyId}`;

  return {
    _id: variantSanityId,
    _type: PRODUCT_VARIANT_DOCUMENT_TYPE,
    shopify: {
      id: variantShopifyId,
      title: variant.title,
      sku: variant.sku,
      productId: productShopifyId,
    },
    product: {
      _type: "reference",
      _ref: productSanityId,
    },
  };
}

function buildCollectionDocument(collection: Collection) {
  const collectionShopifyId = extractIdFromGid(collection.id);
  const collectionSanityId = `${SHOPIFY_COLLECTION_DOCUMENT_ID_PREFIX}${collectionShopifyId}`;

  const collectionDocument = {
    _id: collectionSanityId,
    _type: COLLECTION_DOCUMENT_TYPE,
    shopify: {
      id: collectionShopifyId,
      title: collection.title,
      handle: { current: collection.handle },
    },
  };

  return collectionDocument;
}

// Utils
function extractIdFromGid(gid: `gid://shopify/${string}/${string}`): string {
  const parts = gid.split("/");
  return parts[parts.length - 1];
}

// Types (https://www.sanity.io/docs/sanity-connect-for-shopify-reference)
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
export type payloadProductsSync = {
  action: "create" | "update" | "sync";
  products: Product[];
};

// When products are deleted
export type payloadProductsDelete = {
  action: "delete";
  productIds: number[];
};

// When collections are created, updated or manually synced
export type payloadCollectionsSync = {
  action: "create" | "update" | "sync";
  collections: Collection[];
};

// When collections are deleted
export type payloadCollectionsDelete = {
  action: "delete";
  collectionIds: number[];
};

export type requestPayload =
  | payloadProductsDelete
  | payloadProductsSync
  | payloadCollectionsDelete
  | payloadCollectionsSync;
