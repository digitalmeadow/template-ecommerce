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
    "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...Merchandise\n    }\n  }\n}": typeof types.CartFragmentDoc,
    "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": typeof types.CollectionCoreFragmentDoc,
    "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}": typeof types.ImageFragmentDoc,
    "fragment Merchandise on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}": typeof types.MerchandiseFragmentDoc,
    "fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}": typeof types.MoneyFragmentDoc,
    "fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}": typeof types.PriceRangeFragmentDoc,
    "fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}": typeof types.ProductFragmentDoc,
    "fragment ProductPrice on Product {\n  variants(first: 16) {\n    edges {\n      node {\n        id\n        price {\n          ...Money\n        }\n        compareAtPrice {\n          ...Money\n        }\n      }\n    }\n  }\n}": typeof types.ProductPriceFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}": typeof types.ProductVariantFragmentDoc,
    "\n  mutation CartCreateMutation($cartInput: CartInput, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": typeof types.CartCreateMutationDocument,
    "\n  mutation CartLinesUpdateMutation(\n    $lines: [CartLineUpdateInput!]!\n    $cartId: ID!\n    $countryCode: CountryCode\n  ) @inContext(country: $countryCode) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": typeof types.CartLinesUpdateMutationDocument,
    "\n  mutation CartLinesAddMutation($lines: [CartLineInput!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": typeof types.CartLinesAddMutationDocument,
    "\n  mutation CartLinesRemoveMutation($lineIds: [ID!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": typeof types.CartLinesRemoveMutationDocument,
    "\n  query CartByIdQuery($cartId: ID!, $countryCode: CountryCode) @inContext(country: $countryCode) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n": typeof types.CartByIdQueryDocument,
    "\n  query CollectionByHandleQuery($handle: String!, $productCursor: String) {\n    collection(handle: $handle) {\n      ...Collection\n    }\n  }\n": typeof types.CollectionByHandleQueryDocument,
    "\n  query LocalizationQuery {\n    localization {\n      availableCountries {\n        isoCode\n        name\n        currency {\n          isoCode\n        }\n        availableLanguages {\n          isoCode\n          endonymName\n        }\n      }\n    }\n  }\n": typeof types.LocalizationQueryDocument,
    "\n  query ProductByHandleQuery($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n": typeof types.ProductByHandleQueryDocument,
    "\n  query ProductPricesQuery($countryCode: CountryCode, $cursor: String)\n  @inContext(country: $countryCode) {\n    products(first: 250, after: $cursor) {\n      edges {\n        node {\n          handle\n          ...ProductPrice\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.ProductPricesQueryDocument,
};
const documents: Documents = {
    "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...Merchandise\n    }\n  }\n}": types.CartFragmentDoc,
    "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}": types.CollectionCoreFragmentDoc,
    "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}": types.ImageFragmentDoc,
    "fragment Merchandise on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}": types.MerchandiseFragmentDoc,
    "fragment Money on MoneyV2 {\n  amount\n  currencyCode\n}": types.MoneyFragmentDoc,
    "fragment PriceRange on ProductPriceRange {\n  minVariantPrice {\n    ...Money\n  }\n  maxVariantPrice {\n    ...Money\n  }\n}": types.PriceRangeFragmentDoc,
    "fragment Product on Product {\n  __typename\n  id\n  title\n  handle\n  availableForSale\n  priceRange {\n    ...PriceRange\n  }\n  compareAtPriceRange {\n    ...PriceRange\n  }\n  variants(first: 16) {\n    edges {\n      node {\n        ...ProductVariant\n      }\n    }\n  }\n  options {\n    ...ProductOption\n  }\n  collections(first: 8) {\n    edges {\n      node {\n        ...CollectionCore\n      }\n    }\n  }\n}\n\nfragment ProductOption on ProductOption {\n  id\n  name\n  values\n}": types.ProductFragmentDoc,
    "fragment ProductPrice on Product {\n  variants(first: 16) {\n    edges {\n      node {\n        id\n        price {\n          ...Money\n        }\n        compareAtPrice {\n          ...Money\n        }\n      }\n    }\n  }\n}": types.ProductPriceFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}": types.ProductVariantFragmentDoc,
    "\n  mutation CartCreateMutation($cartInput: CartInput, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": types.CartCreateMutationDocument,
    "\n  mutation CartLinesUpdateMutation(\n    $lines: [CartLineUpdateInput!]!\n    $cartId: ID!\n    $countryCode: CountryCode\n  ) @inContext(country: $countryCode) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": types.CartLinesUpdateMutationDocument,
    "\n  mutation CartLinesAddMutation($lines: [CartLineInput!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": types.CartLinesAddMutationDocument,
    "\n  mutation CartLinesRemoveMutation($lineIds: [ID!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n": types.CartLinesRemoveMutationDocument,
    "\n  query CartByIdQuery($cartId: ID!, $countryCode: CountryCode) @inContext(country: $countryCode) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n": types.CartByIdQueryDocument,
    "\n  query CollectionByHandleQuery($handle: String!, $productCursor: String) {\n    collection(handle: $handle) {\n      ...Collection\n    }\n  }\n": types.CollectionByHandleQueryDocument,
    "\n  query LocalizationQuery {\n    localization {\n      availableCountries {\n        isoCode\n        name\n        currency {\n          isoCode\n        }\n        availableLanguages {\n          isoCode\n          endonymName\n        }\n      }\n    }\n  }\n": types.LocalizationQueryDocument,
    "\n  query ProductByHandleQuery($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n": types.ProductByHandleQueryDocument,
    "\n  query ProductPricesQuery($countryCode: CountryCode, $cursor: String)\n  @inContext(country: $countryCode) {\n    products(first: 250, after: $cursor) {\n      edges {\n        node {\n          handle\n          ...ProductPrice\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.ProductPricesQueryDocument,
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
export function graphql(source: "fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...Merchandise\n    }\n  }\n}"): (typeof documents)["fragment Cart on Cart {\n  id\n  buyerIdentity {\n    countryCode\n  }\n  checkoutUrl\n  discountCodes {\n    applicable\n    code\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  lines(first: 20) {\n    edges {\n      node {\n        ...CartLine\n      }\n    }\n  }\n}\n\nfragment CartLine on CartLine {\n  __typename\n  id\n  quantity\n  discountAllocations {\n    discountedAmount {\n      ...Money\n    }\n  }\n  cost {\n    totalAmount {\n      ...Money\n    }\n  }\n  merchandise {\n    ... on ProductVariant {\n      ...Merchandise\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"): (typeof documents)["fragment CollectionCore on Collection {\n  __typename\n  id\n  handle\n  title\n}\n\nfragment Collection on Collection {\n  ...CollectionCore\n  products(first: 42, after: $productCursor, sortKey: MANUAL) {\n    edges {\n      cursor\n      node {\n        ...Product\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}"): (typeof documents)["fragment Image on Image {\n  altText\n  url: transformedSrc(maxWidth: 1080)\n  thumbnailUrl: transformedSrc(maxWidth: 360)\n  blurUrl: transformedSrc(maxWidth: 10)\n  height\n  width\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Merchandise on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}"): (typeof documents)["fragment Merchandise on ProductVariant {\n  ...ProductVariant\n  product {\n    ...Product\n  }\n}"];
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
export function graphql(source: "fragment ProductPrice on Product {\n  variants(first: 16) {\n    edges {\n      node {\n        id\n        price {\n          ...Money\n        }\n        compareAtPrice {\n          ...Money\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment ProductPrice on Product {\n  variants(first: 16) {\n    edges {\n      node {\n        id\n        price {\n          ...Money\n        }\n        compareAtPrice {\n          ...Money\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}"): (typeof documents)["fragment ProductVariant on ProductVariant {\n  id\n  title\n  availableForSale\n  quantityAvailable\n  selectedOptions {\n    name\n    value\n  }\n  price {\n    ...Money\n  }\n  compareAtPrice {\n    ...Money\n  }\n  image {\n    ...Image\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartCreateMutation($cartInput: CartInput, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartCreateMutation($cartInput: CartInput, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartCreate(input: $cartInput) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesUpdateMutation(\n    $lines: [CartLineUpdateInput!]!\n    $cartId: ID!\n    $countryCode: CountryCode\n  ) @inContext(country: $countryCode) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesUpdateMutation(\n    $lines: [CartLineUpdateInput!]!\n    $cartId: ID!\n    $countryCode: CountryCode\n  ) @inContext(country: $countryCode) {\n    cartLinesUpdate(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesAddMutation($lines: [CartLineInput!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesAddMutation($lines: [CartLineInput!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesAdd(lines: $lines, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CartLinesRemoveMutation($lineIds: [ID!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CartLinesRemoveMutation($lineIds: [ID!]!, $cartId: ID!, $countryCode: CountryCode)\n  @inContext(country: $countryCode) {\n    cartLinesRemove(lineIds: $lineIds, cartId: $cartId) {\n      cart {\n        ...Cart\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n      warnings {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CartByIdQuery($cartId: ID!, $countryCode: CountryCode) @inContext(country: $countryCode) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n"): (typeof documents)["\n  query CartByIdQuery($cartId: ID!, $countryCode: CountryCode) @inContext(country: $countryCode) {\n    cart(id: $cartId) {\n      ...Cart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionByHandleQuery($handle: String!, $productCursor: String) {\n    collection(handle: $handle) {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionByHandleQuery($handle: String!, $productCursor: String) {\n    collection(handle: $handle) {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LocalizationQuery {\n    localization {\n      availableCountries {\n        isoCode\n        name\n        currency {\n          isoCode\n        }\n        availableLanguages {\n          isoCode\n          endonymName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query LocalizationQuery {\n    localization {\n      availableCountries {\n        isoCode\n        name\n        currency {\n          isoCode\n        }\n        availableLanguages {\n          isoCode\n          endonymName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductByHandleQuery($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n"): (typeof documents)["\n  query ProductByHandleQuery($handle: String!) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductPricesQuery($countryCode: CountryCode, $cursor: String)\n  @inContext(country: $countryCode) {\n    products(first: 250, after: $cursor) {\n      edges {\n        node {\n          handle\n          ...ProductPrice\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProductPricesQuery($countryCode: CountryCode, $cursor: String)\n  @inContext(country: $countryCode) {\n    products(first: 250, after: $cursor) {\n      edges {\n        node {\n          handle\n          ...ProductPrice\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;