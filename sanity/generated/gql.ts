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
    "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}": typeof types.CartFragmentDoc,
    "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n}": typeof types.FooterFragmentDoc,
    "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}": typeof types.HeaderFragmentDoc,
    "fragment Accordion on Accordion {\n  summary\n  contentRaw\n}": typeof types.AccordionFragmentDoc,
    "fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}": typeof types.ButtonFragmentDoc,
    "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}": typeof types.LinkFragmentDoc,
    "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n}": typeof types.MediaFragmentDoc,
    "fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}": typeof types.MetaFragmentDoc,
    "fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}": typeof types.MuxVideoFragmentDoc,
    "fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}": typeof types.SanityFileFragmentDoc,
    "fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}": typeof types.SanityImageFragmentDoc,
    "fragment Slug on Slug {\n  current\n}": typeof types.SlugFragmentDoc,
    "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}": typeof types.CollectionFragmentDoc,
    "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}": typeof types.HomeFragmentDoc,
    "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}": typeof types.PageFragmentDoc,
    "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}": typeof types.ProductThumbnailFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n  }\n}": typeof types.ProductVariantFragmentDoc,
    "fragment SectionAccordions on SectionAccordions {\n  __typename\n  accordions {\n    ...Accordion\n  }\n}": typeof types.SectionAccordionsFragmentDoc,
    "fragment SectionCollection on SectionCollection {\n  __typename\n  collection {\n    ...Collection\n  }\n}": typeof types.SectionCollectionFragmentDoc,
    "fragment SectionHero on SectionHero {\n  __typename\n  backgroundMedia {\n    ...Media\n  }\n  heading\n  textRaw\n}": typeof types.SectionHeroFragmentDoc,
    "fragment SectionText on SectionText {\n  __typename\n  textRaw\n}": typeof types.SectionTextFragmentDoc,
    "\n  query CartQuery {\n    allCart {\n      ...Cart\n    }\n  }\n": typeof types.CartQueryDocument,
    "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(\n      where: { shopify: { handle: { current: { eq: $handle } } } }\n    ) {\n      ...Collection\n    }\n  }\n": typeof types.CollectionByHandleQueryDocument,
    "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n": typeof types.CollectionsQueryDocument,
    "\n  query FooterQuery {\n    allFooter {\n      ...Footer\n    }\n  }\n": typeof types.FooterQueryDocument,
    "\n  query HeaderQuery {\n    allHeader {\n      ...Header\n    }\n  }\n": typeof types.HeaderQueryDocument,
    "\n  query HomeQuery {\n    allHome {\n      ...Home\n    }\n  }\n": typeof types.HomeQueryDocument,
    "\n  query PageQuery($slug: String!) {\n    allPage(where: { slug: { current: { eq: $slug } } }) {\n      ...Page\n    }\n  }\n": typeof types.PageQueryDocument,
    "\n  query PagesQuery {\n    allPage {\n      ...Page\n    }\n  }\n": typeof types.PagesQueryDocument,
    "\n  query ProductThumbnailByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...ProductThumbnail\n    }\n  }\n": typeof types.ProductThumbnailByHandleQueryDocument,
    "\n  query ProductByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Product\n    }\n  }\n": typeof types.ProductByHandleQueryDocument,
    "\n  query ProductsQuery {\n    allProduct {\n      ...Product\n    }\n  }\n": typeof types.ProductsQueryDocument,
};
const documents: Documents = {
    "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}": types.CartFragmentDoc,
    "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n}": types.FooterFragmentDoc,
    "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}": types.HeaderFragmentDoc,
    "fragment Accordion on Accordion {\n  summary\n  contentRaw\n}": types.AccordionFragmentDoc,
    "fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}": types.ButtonFragmentDoc,
    "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}": types.LinkFragmentDoc,
    "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n}": types.MediaFragmentDoc,
    "fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}": types.MetaFragmentDoc,
    "fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}": types.MuxVideoFragmentDoc,
    "fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}": types.SanityFileFragmentDoc,
    "fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}": types.SanityImageFragmentDoc,
    "fragment Slug on Slug {\n  current\n}": types.SlugFragmentDoc,
    "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}": types.CollectionFragmentDoc,
    "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}": types.HomeFragmentDoc,
    "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}": types.PageFragmentDoc,
    "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}": types.ProductThumbnailFragmentDoc,
    "fragment ProductVariant on ProductVariant {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n  }\n}": types.ProductVariantFragmentDoc,
    "fragment SectionAccordions on SectionAccordions {\n  __typename\n  accordions {\n    ...Accordion\n  }\n}": types.SectionAccordionsFragmentDoc,
    "fragment SectionCollection on SectionCollection {\n  __typename\n  collection {\n    ...Collection\n  }\n}": types.SectionCollectionFragmentDoc,
    "fragment SectionHero on SectionHero {\n  __typename\n  backgroundMedia {\n    ...Media\n  }\n  heading\n  textRaw\n}": types.SectionHeroFragmentDoc,
    "fragment SectionText on SectionText {\n  __typename\n  textRaw\n}": types.SectionTextFragmentDoc,
    "\n  query CartQuery {\n    allCart {\n      ...Cart\n    }\n  }\n": types.CartQueryDocument,
    "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(\n      where: { shopify: { handle: { current: { eq: $handle } } } }\n    ) {\n      ...Collection\n    }\n  }\n": types.CollectionByHandleQueryDocument,
    "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n": types.CollectionsQueryDocument,
    "\n  query FooterQuery {\n    allFooter {\n      ...Footer\n    }\n  }\n": types.FooterQueryDocument,
    "\n  query HeaderQuery {\n    allHeader {\n      ...Header\n    }\n  }\n": types.HeaderQueryDocument,
    "\n  query HomeQuery {\n    allHome {\n      ...Home\n    }\n  }\n": types.HomeQueryDocument,
    "\n  query PageQuery($slug: String!) {\n    allPage(where: { slug: { current: { eq: $slug } } }) {\n      ...Page\n    }\n  }\n": types.PageQueryDocument,
    "\n  query PagesQuery {\n    allPage {\n      ...Page\n    }\n  }\n": types.PagesQueryDocument,
    "\n  query ProductThumbnailByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...ProductThumbnail\n    }\n  }\n": types.ProductThumbnailByHandleQueryDocument,
    "\n  query ProductByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Product\n    }\n  }\n": types.ProductByHandleQueryDocument,
    "\n  query ProductsQuery {\n    allProduct {\n      ...Product\n    }\n  }\n": types.ProductsQueryDocument,
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
export function graphql(source: "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}"): (typeof documents)["fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n}"): (typeof documents)["fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}"): (typeof documents)["fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Accordion on Accordion {\n  summary\n  contentRaw\n}"): (typeof documents)["fragment Accordion on Accordion {\n  summary\n  contentRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}"): (typeof documents)["fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}"): (typeof documents)["fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n}"): (typeof documents)["fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}"): (typeof documents)["fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}"): (typeof documents)["fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}"): (typeof documents)["fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}"): (typeof documents)["fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Slug on Slug {\n  current\n}"): (typeof documents)["fragment Slug on Slug {\n  current\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}"): (typeof documents)["fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n  }\n  meta {\n    ...Meta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}"): (typeof documents)["fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariant on ProductVariant {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n  }\n}"): (typeof documents)["fragment ProductVariant on ProductVariant {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionAccordions on SectionAccordions {\n  __typename\n  accordions {\n    ...Accordion\n  }\n}"): (typeof documents)["fragment SectionAccordions on SectionAccordions {\n  __typename\n  accordions {\n    ...Accordion\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionCollection on SectionCollection {\n  __typename\n  collection {\n    ...Collection\n  }\n}"): (typeof documents)["fragment SectionCollection on SectionCollection {\n  __typename\n  collection {\n    ...Collection\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionHero on SectionHero {\n  __typename\n  backgroundMedia {\n    ...Media\n  }\n  heading\n  textRaw\n}"): (typeof documents)["fragment SectionHero on SectionHero {\n  __typename\n  backgroundMedia {\n    ...Media\n  }\n  heading\n  textRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionText on SectionText {\n  __typename\n  textRaw\n}"): (typeof documents)["fragment SectionText on SectionText {\n  __typename\n  textRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CartQuery {\n    allCart {\n      ...Cart\n    }\n  }\n"): (typeof documents)["\n  query CartQuery {\n    allCart {\n      ...Cart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(\n      where: { shopify: { handle: { current: { eq: $handle } } } }\n    ) {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(\n      where: { shopify: { handle: { current: { eq: $handle } } } }\n    ) {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FooterQuery {\n    allFooter {\n      ...Footer\n    }\n  }\n"): (typeof documents)["\n  query FooterQuery {\n    allFooter {\n      ...Footer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HeaderQuery {\n    allHeader {\n      ...Header\n    }\n  }\n"): (typeof documents)["\n  query HeaderQuery {\n    allHeader {\n      ...Header\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomeQuery {\n    allHome {\n      ...Home\n    }\n  }\n"): (typeof documents)["\n  query HomeQuery {\n    allHome {\n      ...Home\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PageQuery($slug: String!) {\n    allPage(where: { slug: { current: { eq: $slug } } }) {\n      ...Page\n    }\n  }\n"): (typeof documents)["\n  query PageQuery($slug: String!) {\n    allPage(where: { slug: { current: { eq: $slug } } }) {\n      ...Page\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PagesQuery {\n    allPage {\n      ...Page\n    }\n  }\n"): (typeof documents)["\n  query PagesQuery {\n    allPage {\n      ...Page\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductThumbnailByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...ProductThumbnail\n    }\n  }\n"): (typeof documents)["\n  query ProductThumbnailByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...ProductThumbnail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Product\n    }\n  }\n"): (typeof documents)["\n  query ProductByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Product\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProductsQuery {\n    allProduct {\n      ...Product\n    }\n  }\n"): (typeof documents)["\n  query ProductsQuery {\n    allProduct {\n      ...Product\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;