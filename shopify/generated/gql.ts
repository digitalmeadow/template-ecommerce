/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...MerchandiseFields\n    }\n  }\n}": typeof types.CartFragmentDoc,
    "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": typeof types.CollectionCoreFragmentDoc,
    "fragment Country on Country {\n  currency {\n    isoCode\n    name\n    symbol\n  }\n  isoCode\n  name\n  unitSystem\n}": typeof types.CountryFragmentDoc,
    "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}\n\nfragment VideoSource on VideoSource {\n  url\n  format\n  height\n  width\n}\n\nfragment Video on Video {\n  sources {\n    ...VideoSource\n  }\n}\n\nfragment MediaFields on Media {\n  __typename\n  ... on MediaImage {\n    image {\n      ...Image\n    }\n  }\n  ... on Video {\n    ...Video\n  }\n}": typeof types.ImageFragmentDoc,
    "fragment MerchandiseFields on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}": typeof types.MerchandiseFieldsFragmentDoc,
    "fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}": typeof types.MoneyFragmentDoc,
    "fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}": typeof types.PriceRangeFragmentDoc,
    "fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}": typeof types.ProductFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}": typeof types.ProductVariantFragmentDoc,
    "\n  mutation CartCreate($cartInput: CartInput) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartCreateDocument,
    "\n  mutation CartLinesUpdate($lines: [CartLineUpdateInput!]!, $cartId: ID!) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesUpdateDocument,
    "\n  mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesAddDocument,
    "\n  mutation CartLinesRemove($lineIds: [ID!]!, $cartId: ID!) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartLinesRemoveDocument,
    "\n  mutation CartBuyerUpdate(\n    $buyerIdentity: CartBuyerIdentityInput!\n    $cartId: ID!\n  ) {\n    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": typeof types.CartBuyerUpdateDocument,
    "\n  query CartById($cartId: ID!) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n": typeof types.CartByIdDocument,
    "\n  query CollectionQuery($handle: String!, $productCursor: String) {\n    collectionByHandle(handle: $handle) {\n      ...Collection\n    }\n  }\n": typeof types.CollectionQueryDocument,
    "\n  query ProductByHandle($handle: String!) {\n    productByHandle(handle: $handle) {\n      ...Product\n    }\n  }\n": typeof types.ProductByHandleDocument,
};
const documents: Documents = {
    "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...MerchandiseFields\n    }\n  }\n}": types.CartFragmentDoc,
    "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.CollectionCoreFragmentDoc,
    "fragment Country on Country {\n  currency {\n    isoCode\n    name\n    symbol\n  }\n  isoCode\n  name\n  unitSystem\n}": types.CountryFragmentDoc,
    "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}\n\nfragment VideoSource on VideoSource {\n  url\n  format\n  height\n  width\n}\n\nfragment Video on Video {\n  sources {\n    ...VideoSource\n  }\n}\n\nfragment MediaFields on Media {\n  __typename\n  ... on MediaImage {\n    image {\n      ...Image\n    }\n  }\n  ... on Video {\n    ...Video\n  }\n}": types.ImageFragmentDoc,
    "fragment MerchandiseFields on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}": types.MerchandiseFieldsFragmentDoc,
    "fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}": types.MoneyFragmentDoc,
    "fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}": types.PriceRangeFragmentDoc,
    "fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}": types.ProductFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}": types.ProductVariantFragmentDoc,
    "\n  mutation CartCreate($cartInput: CartInput) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CartCreateDocument,
    "\n  mutation CartLinesUpdate($lines: [CartLineUpdateInput!]!, $cartId: ID!) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesUpdateDocument,
    "\n  mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesAddDocument,
    "\n  mutation CartLinesRemove($lineIds: [ID!]!, $cartId: ID!) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CartLinesRemoveDocument,
    "\n  mutation CartBuyerUpdate(\n    $buyerIdentity: CartBuyerIdentityInput!\n    $cartId: ID!\n  ) {\n    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": types.CartBuyerUpdateDocument,
    "\n  query CartById($cartId: ID!) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n": types.CartByIdDocument,
    "\n  query CollectionQuery($handle: String!, $productCursor: String) {\n    collectionByHandle(handle: $handle) {\n      ...Collection\n    }\n  }\n": types.CollectionQueryDocument,
    "\n  query ProductByHandle($handle: String!) {\n    productByHandle(handle: $handle) {\n      ...Product\n    }\n  }\n": types.ProductByHandleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...MerchandiseFields\n    }\n  }\n}"): (typeof documents)["fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...MerchandiseFields\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Country on Country {\n  currency {\n    isoCode\n    name\n    symbol\n  }\n  isoCode\n  name\n  unitSystem\n}"): (typeof documents)["fragment Country on Country {\n  currency {\n    isoCode\n    name\n    symbol\n  }\n  isoCode\n  name\n  unitSystem\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}\n\nfragment VideoSource on VideoSource {\n  url\n  format\n  height\n  width\n}\n\nfragment Video on Video {\n  sources {\n    ...VideoSource\n  }\n}\n\nfragment MediaFields on Media {\n  __typename\n  ... on MediaImage {\n    image {\n      ...Image\n    }\n  }\n  ... on Video {\n    ...Video\n  }\n}"): (typeof documents)["fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}\n\nfragment VideoSource on VideoSource {\n  url\n  format\n  height\n  width\n}\n\nfragment Video on Video {\n  sources {\n    ...VideoSource\n  }\n}\n\nfragment MediaFields on Media {\n  __typename\n  ... on MediaImage {\n    image {\n      ...Image\n    }\n  }\n  ... on Video {\n    ...Video\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MerchandiseFields on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}"): (typeof documents)["fragment MerchandiseFields on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}"): (typeof documents)["fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}"): (typeof documents)["fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}"): (typeof documents)["fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}"): (typeof documents)["fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartCreate($cartInput: CartInput) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartCreate($cartInput: CartInput) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesUpdate($lines: [CartLineUpdateInput!]!, $cartId: ID!) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesUpdate($lines: [CartLineUpdateInput!]!, $cartId: ID!) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesRemove($lineIds: [ID!]!, $cartId: ID!) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesRemove($lineIds: [ID!]!, $cartId: ID!) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartBuyerUpdate(\n    $buyerIdentity: CartBuyerIdentityInput!\n    $cartId: ID!\n  ) {\n    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartBuyerUpdate(\n    $buyerIdentity: CartBuyerIdentityInput!\n    $cartId: ID!\n  ) {\n    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CartById($cartId: ID!) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n"): (typeof documents)["\n  query CartById($cartId: ID!) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionQuery($handle: String!, $productCursor: String) {\n    collectionByHandle(handle: $handle) {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionQuery($handle: String!, $productCursor: String) {\n    collectionByHandle(handle: $handle) {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductByHandle($handle: String!) {\n    productByHandle(handle: $handle) {\n      ...Product\n    }\n  }\n"): (typeof documents)["\n  query ProductByHandle($handle: String!) {\n    productByHandle(handle: $handle) {\n      ...Product\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;