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
    "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}": typeof types.CollectionFragmentDoc,
    "fragment Form on Form {\n  __typename\n  _id\n  title\n  submitLabel\n  successMessageRaw\n  groups {\n    ...FormGroup\n  }\n  terms {\n    ...FormConsent\n  }\n}": typeof types.FormFragmentDoc,
    "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}": typeof types.HomeFragmentDoc,
    "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}": typeof types.PageFragmentDoc,
    "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  ...ProductThumbnail\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n}": typeof types.ProductThumbnailFragmentDoc,
    "fragment Accordion on Accordion {\n  summary\n  contentRaw\n}": typeof types.AccordionFragmentDoc,
    "fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}": typeof types.ButtonFragmentDoc,
    "fragment FormConsent on FormConsent {\n  _key\n  name\n  label\n  statementRaw\n  required\n}": typeof types.FormConsentFragmentDoc,
    "fragment FormField on FormField {\n  _key\n  name\n  label\n  type\n  placeholder\n  options\n  required\n  width\n}": typeof types.FormFieldFragmentDoc,
    "fragment FormGroup on FormGroup {\n  _key\n  heading\n  fields {\n    ...FormField\n  }\n}": typeof types.FormGroupFragmentDoc,
    "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}": typeof types.LinkFragmentDoc,
    "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n  vimeo {\n    ...VimeoVideo\n  }\n}": typeof types.MediaFragmentDoc,
    "fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}": typeof types.MetaFragmentDoc,
    "fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}": typeof types.MuxVideoFragmentDoc,
    "fragment PostalAddress on PostalAddress {\n  streetAddress\n  addressLocality\n  addressRegion\n  postalCode\n  addressCountry\n}": typeof types.PostalAddressFragmentDoc,
    "fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}": typeof types.SanityFileFragmentDoc,
    "fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}": typeof types.SanityImageFragmentDoc,
    "fragment Slug on Slug {\n  current\n}": typeof types.SlugFragmentDoc,
    "fragment TabItem on TabItem {\n  _key\n  title\n  contentRaw\n  media {\n    ...Media\n  }\n}": typeof types.TabItemFragmentDoc,
    "fragment VimeoVideo on VimeoVideo {\n  url\n}": typeof types.VimeoVideoFragmentDoc,
    "fragment SectionAccordions on SectionAccordions {\n  __typename\n  _key\n  colorScheme\n  id\n  accordions {\n    ...Accordion\n  }\n}": typeof types.SectionAccordionsFragmentDoc,
    "fragment SectionCollection on SectionCollection {\n  __typename\n  _key\n  colorScheme\n  id\n  collection {\n    ...Collection\n  }\n}": typeof types.SectionCollectionFragmentDoc,
    "fragment SectionForm on SectionForm {\n  __typename\n  _key\n  colorScheme\n  id\n  heading\n  form {\n    ...Form\n  }\n}": typeof types.SectionFormFragmentDoc,
    "fragment SectionHero on SectionHero {\n  __typename\n  _key\n  colorScheme\n  id\n  mediaBackground {\n    ...Media\n  }\n  heading\n  textRaw\n}": typeof types.SectionHeroFragmentDoc,
    "fragment SectionTabs on SectionTabs {\n  __typename\n  _key\n  colorScheme\n  id\n  tabItems {\n    ...TabItem\n  }\n}": typeof types.SectionTabsFragmentDoc,
    "fragment SectionText on SectionText {\n  __typename\n  _key\n  colorScheme\n  id\n  textRaw\n}": typeof types.SectionTextFragmentDoc,
    "fragment AnalyticsSettings on AnalyticsSettings {\n  __typename\n  _id\n  gtmId\n}": typeof types.AnalyticsSettingsFragmentDoc,
    "fragment AnnouncementBanner on AnnouncementBanner {\n  __typename\n  _id\n  _updatedAt\n  enabled\n  textRaw\n}": typeof types.AnnouncementBannerFragmentDoc,
    "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}": typeof types.CartFragmentDoc,
    "fragment CookieConsent on CookieConsent {\n  __typename\n  _id\n  messageRaw\n  acceptLabel\n  declineLabel\n}": typeof types.CookieConsentFragmentDoc,
    "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n  mediaBackground {\n    ...Media\n  }\n}": typeof types.FooterFragmentDoc,
    "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}": typeof types.HeaderFragmentDoc,
    "fragment LocationNotice on LocationNotice {\n  __typename\n  _id\n  message\n  switchLabel\n  dismissLabel\n}": typeof types.LocationNoticeFragmentDoc,
    "fragment MetaSettings on MetaSettings {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n}": typeof types.MetaSettingsFragmentDoc,
    "fragment OrganisationSettings on OrganisationSettings {\n  __typename\n  _id\n  type\n  name\n  description\n  logo {\n    ...SanityImage\n  }\n  foundingDate\n  founders\n  numberOfEmployees\n  telephone\n  areaServed\n  knowsAbout\n  sameAs\n  address {\n    ...PostalAddress\n  }\n}": typeof types.OrganisationSettingsFragmentDoc,
    "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Collection\n    }\n  }\n": typeof types.CollectionByHandleQueryDocument,
    "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n": typeof types.CollectionsQueryDocument,
    "\n  query GlobalsQuery {\n    allHeader {\n      ...Header\n    }\n    allFooter {\n      ...Footer\n    }\n    allCart {\n      ...Cart\n    }\n    allMetaSettings {\n      ...MetaSettings\n    }\n    allOrganisationSettings {\n      ...OrganisationSettings\n    }\n    allAnalyticsSettings {\n      ...AnalyticsSettings\n    }\n    allAnnouncementBanner {\n      ...AnnouncementBanner\n    }\n    allCookieConsent {\n      ...CookieConsent\n    }\n    allLocationNotice {\n      ...LocationNotice\n    }\n  }\n": typeof types.GlobalsQueryDocument,
    "\n  query HomeQuery {\n    allHome {\n      ...Home\n    }\n  }\n": typeof types.HomeQueryDocument,
    "\n  query PageQuery($slug: String!) {\n    allPage(where: { slug: { current: { eq: $slug } } }) {\n      ...Page\n    }\n  }\n": typeof types.PageQueryDocument,
    "\n  query PagesQuery {\n    allPage {\n      ...Page\n    }\n  }\n": typeof types.PagesQueryDocument,
    "\n  query ProductThumbnailByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...ProductThumbnail\n    }\n  }\n": typeof types.ProductThumbnailByHandleQueryDocument,
    "\n  query ProductByHandleQuery($handle: String!) {\n    allProduct(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Product\n    }\n  }\n": typeof types.ProductByHandleQueryDocument,
    "\n  query ProductsQuery {\n    allProduct {\n      ...Product\n    }\n  }\n": typeof types.ProductsQueryDocument,
};
const documents: Documents = {
    "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}": types.CollectionFragmentDoc,
    "fragment Form on Form {\n  __typename\n  _id\n  title\n  submitLabel\n  successMessageRaw\n  groups {\n    ...FormGroup\n  }\n  terms {\n    ...FormConsent\n  }\n}": types.FormFragmentDoc,
    "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}": types.HomeFragmentDoc,
    "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}": types.PageFragmentDoc,
    "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  ...ProductThumbnail\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n}": types.ProductThumbnailFragmentDoc,
    "fragment Accordion on Accordion {\n  summary\n  contentRaw\n}": types.AccordionFragmentDoc,
    "fragment Button on Button {\n  label\n  link {\n    ...Link\n  }\n}": types.ButtonFragmentDoc,
    "fragment FormConsent on FormConsent {\n  _key\n  name\n  label\n  statementRaw\n  required\n}": types.FormConsentFragmentDoc,
    "fragment FormField on FormField {\n  _key\n  name\n  label\n  type\n  placeholder\n  options\n  required\n  width\n}": types.FormFieldFragmentDoc,
    "fragment FormGroup on FormGroup {\n  _key\n  heading\n  fields {\n    ...FormField\n  }\n}": types.FormGroupFragmentDoc,
    "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}": types.LinkFragmentDoc,
    "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n  vimeo {\n    ...VimeoVideo\n  }\n}": types.MediaFragmentDoc,
    "fragment Meta on Meta {\n  title\n  description\n  image {\n    ...SanityImage\n  }\n}": types.MetaFragmentDoc,
    "fragment MuxVideo on MuxVideo {\n  asset {\n    ...MuxVideoAsset\n  }\n}\n\nfragment MuxVideoAsset on MuxVideoAsset {\n  playbackId\n  filename\n  data {\n    ...MuxAssetData\n  }\n}\n\nfragment MuxAssetData on MuxAssetData {\n  aspect_ratio\n  duration\n}": types.MuxVideoFragmentDoc,
    "fragment PostalAddress on PostalAddress {\n  streetAddress\n  addressLocality\n  addressRegion\n  postalCode\n  addressCountry\n}": types.PostalAddressFragmentDoc,
    "fragment SanityFile on File {\n  asset {\n    ...SanityFileAsset\n  }\n}\n\nfragment SanityFileAsset on SanityFileAsset {\n  url\n  originalFilename\n}": types.SanityFileFragmentDoc,
    "fragment SanityImage on Image {\n  asset {\n    ...SanityImageAsset\n  }\n  hotspot {\n    ...SanityImageHotspot\n  }\n  crop {\n    ...SanityImageCrop\n  }\n}\n\nfragment SanityImageAsset on SanityImageAsset {\n  url\n  altText\n  originalFilename\n  metadata {\n    ...SanityImageMetadata\n  }\n}\n\nfragment SanityImageMetadata on SanityImageMetadata {\n  lqip\n  dimensions {\n    ...SanityImageDimensions\n  }\n}\n\nfragment SanityImageDimensions on SanityImageDimensions {\n  width\n  height\n  aspectRatio\n}\n\nfragment SanityImageHotspot on SanityImageHotspot {\n  x\n  y\n  height\n  width\n}\n\nfragment SanityImageCrop on SanityImageCrop {\n  top\n  bottom\n  left\n  right\n}": types.SanityImageFragmentDoc,
    "fragment Slug on Slug {\n  current\n}": types.SlugFragmentDoc,
    "fragment TabItem on TabItem {\n  _key\n  title\n  contentRaw\n  media {\n    ...Media\n  }\n}": types.TabItemFragmentDoc,
    "fragment VimeoVideo on VimeoVideo {\n  url\n}": types.VimeoVideoFragmentDoc,
    "fragment SectionAccordions on SectionAccordions {\n  __typename\n  _key\n  colorScheme\n  id\n  accordions {\n    ...Accordion\n  }\n}": types.SectionAccordionsFragmentDoc,
    "fragment SectionCollection on SectionCollection {\n  __typename\n  _key\n  colorScheme\n  id\n  collection {\n    ...Collection\n  }\n}": types.SectionCollectionFragmentDoc,
    "fragment SectionForm on SectionForm {\n  __typename\n  _key\n  colorScheme\n  id\n  heading\n  form {\n    ...Form\n  }\n}": types.SectionFormFragmentDoc,
    "fragment SectionHero on SectionHero {\n  __typename\n  _key\n  colorScheme\n  id\n  mediaBackground {\n    ...Media\n  }\n  heading\n  textRaw\n}": types.SectionHeroFragmentDoc,
    "fragment SectionTabs on SectionTabs {\n  __typename\n  _key\n  colorScheme\n  id\n  tabItems {\n    ...TabItem\n  }\n}": types.SectionTabsFragmentDoc,
    "fragment SectionText on SectionText {\n  __typename\n  _key\n  colorScheme\n  id\n  textRaw\n}": types.SectionTextFragmentDoc,
    "fragment AnalyticsSettings on AnalyticsSettings {\n  __typename\n  _id\n  gtmId\n}": types.AnalyticsSettingsFragmentDoc,
    "fragment AnnouncementBanner on AnnouncementBanner {\n  __typename\n  _id\n  _updatedAt\n  enabled\n  textRaw\n}": types.AnnouncementBannerFragmentDoc,
    "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}": types.CartFragmentDoc,
    "fragment CookieConsent on CookieConsent {\n  __typename\n  _id\n  messageRaw\n  acceptLabel\n  declineLabel\n}": types.CookieConsentFragmentDoc,
    "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n  mediaBackground {\n    ...Media\n  }\n}": types.FooterFragmentDoc,
    "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}": types.HeaderFragmentDoc,
    "fragment LocationNotice on LocationNotice {\n  __typename\n  _id\n  message\n  switchLabel\n  dismissLabel\n}": types.LocationNoticeFragmentDoc,
    "fragment MetaSettings on MetaSettings {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n}": types.MetaSettingsFragmentDoc,
    "fragment OrganisationSettings on OrganisationSettings {\n  __typename\n  _id\n  type\n  name\n  description\n  logo {\n    ...SanityImage\n  }\n  foundingDate\n  founders\n  numberOfEmployees\n  telephone\n  areaServed\n  knowsAbout\n  sameAs\n  address {\n    ...PostalAddress\n  }\n}": types.OrganisationSettingsFragmentDoc,
    "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Collection\n    }\n  }\n": types.CollectionByHandleQueryDocument,
    "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n": types.CollectionsQueryDocument,
    "\n  query GlobalsQuery {\n    allHeader {\n      ...Header\n    }\n    allFooter {\n      ...Footer\n    }\n    allCart {\n      ...Cart\n    }\n    allMetaSettings {\n      ...MetaSettings\n    }\n    allOrganisationSettings {\n      ...OrganisationSettings\n    }\n    allAnalyticsSettings {\n      ...AnalyticsSettings\n    }\n    allAnnouncementBanner {\n      ...AnnouncementBanner\n    }\n    allCookieConsent {\n      ...CookieConsent\n    }\n    allLocationNotice {\n      ...LocationNotice\n    }\n  }\n": types.GlobalsQueryDocument,
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
export function graphql(source: "fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}"): (typeof documents)["fragment Collection on Collection {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Form on Form {\n  __typename\n  _id\n  title\n  submitLabel\n  successMessageRaw\n  groups {\n    ...FormGroup\n  }\n  terms {\n    ...FormConsent\n  }\n}"): (typeof documents)["fragment Form on Form {\n  __typename\n  _id\n  title\n  submitLabel\n  successMessageRaw\n  groups {\n    ...FormGroup\n  }\n  terms {\n    ...FormConsent\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment Home on Home {\n  __typename\n  _id\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment Page on Page {\n  __typename\n  _id\n  title\n  slug {\n    ...Slug\n  }\n  sections {\n    ...SectionHero\n    ...SectionText\n    ...SectionCollection\n    ...SectionAccordions\n    ...SectionTabs\n    ...SectionForm\n  }\n  meta {\n    ...Meta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  ...ProductThumbnail\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment ProductThumbnail on Product {\n  __typename\n  _id\n  mediaThumbnail {\n    ...Media\n  }\n  shopify {\n    title\n    handle {\n      ...Slug\n    }\n    status\n  }\n}\n\nfragment Product on Product {\n  ...ProductThumbnail\n  mediaGallery {\n    ...Media\n  }\n  accordions {\n    ...Accordion\n  }\n  relatedProducts {\n    ...ProductThumbnail\n  }\n  meta {\n    ...Meta\n  }\n}"];
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
export function graphql(source: "fragment FormConsent on FormConsent {\n  _key\n  name\n  label\n  statementRaw\n  required\n}"): (typeof documents)["fragment FormConsent on FormConsent {\n  _key\n  name\n  label\n  statementRaw\n  required\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FormField on FormField {\n  _key\n  name\n  label\n  type\n  placeholder\n  options\n  required\n  width\n}"): (typeof documents)["fragment FormField on FormField {\n  _key\n  name\n  label\n  type\n  placeholder\n  options\n  required\n  width\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FormGroup on FormGroup {\n  _key\n  heading\n  fields {\n    ...FormField\n  }\n}"): (typeof documents)["fragment FormGroup on FormGroup {\n  _key\n  heading\n  fields {\n    ...FormField\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}"): (typeof documents)["fragment Link on Link {\n  type\n  page {\n    ... on Document {\n      __typename\n      _id\n      _type\n      ... on Page {\n        slug {\n          ...Slug\n        }\n      }\n      ... on Product {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n      ... on Collection {\n        shopify {\n          handle {\n            ...Slug\n          }\n        }\n      }\n    }\n  }\n  url\n  section\n  email\n  phone\n  file {\n    ...SanityFile\n  }\n  newTab\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n  vimeo {\n    ...VimeoVideo\n  }\n}"): (typeof documents)["fragment Media on Media {\n  type\n  image {\n    ...SanityImage\n  }\n  video {\n    ...MuxVideo\n  }\n  vimeo {\n    ...VimeoVideo\n  }\n}"];
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
export function graphql(source: "fragment PostalAddress on PostalAddress {\n  streetAddress\n  addressLocality\n  addressRegion\n  postalCode\n  addressCountry\n}"): (typeof documents)["fragment PostalAddress on PostalAddress {\n  streetAddress\n  addressLocality\n  addressRegion\n  postalCode\n  addressCountry\n}"];
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
export function graphql(source: "fragment TabItem on TabItem {\n  _key\n  title\n  contentRaw\n  media {\n    ...Media\n  }\n}"): (typeof documents)["fragment TabItem on TabItem {\n  _key\n  title\n  contentRaw\n  media {\n    ...Media\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment VimeoVideo on VimeoVideo {\n  url\n}"): (typeof documents)["fragment VimeoVideo on VimeoVideo {\n  url\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionAccordions on SectionAccordions {\n  __typename\n  _key\n  colorScheme\n  id\n  accordions {\n    ...Accordion\n  }\n}"): (typeof documents)["fragment SectionAccordions on SectionAccordions {\n  __typename\n  _key\n  colorScheme\n  id\n  accordions {\n    ...Accordion\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionCollection on SectionCollection {\n  __typename\n  _key\n  colorScheme\n  id\n  collection {\n    ...Collection\n  }\n}"): (typeof documents)["fragment SectionCollection on SectionCollection {\n  __typename\n  _key\n  colorScheme\n  id\n  collection {\n    ...Collection\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionForm on SectionForm {\n  __typename\n  _key\n  colorScheme\n  id\n  heading\n  form {\n    ...Form\n  }\n}"): (typeof documents)["fragment SectionForm on SectionForm {\n  __typename\n  _key\n  colorScheme\n  id\n  heading\n  form {\n    ...Form\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionHero on SectionHero {\n  __typename\n  _key\n  colorScheme\n  id\n  mediaBackground {\n    ...Media\n  }\n  heading\n  textRaw\n}"): (typeof documents)["fragment SectionHero on SectionHero {\n  __typename\n  _key\n  colorScheme\n  id\n  mediaBackground {\n    ...Media\n  }\n  heading\n  textRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionTabs on SectionTabs {\n  __typename\n  _key\n  colorScheme\n  id\n  tabItems {\n    ...TabItem\n  }\n}"): (typeof documents)["fragment SectionTabs on SectionTabs {\n  __typename\n  _key\n  colorScheme\n  id\n  tabItems {\n    ...TabItem\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SectionText on SectionText {\n  __typename\n  _key\n  colorScheme\n  id\n  textRaw\n}"): (typeof documents)["fragment SectionText on SectionText {\n  __typename\n  _key\n  colorScheme\n  id\n  textRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AnalyticsSettings on AnalyticsSettings {\n  __typename\n  _id\n  gtmId\n}"): (typeof documents)["fragment AnalyticsSettings on AnalyticsSettings {\n  __typename\n  _id\n  gtmId\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AnnouncementBanner on AnnouncementBanner {\n  __typename\n  _id\n  _updatedAt\n  enabled\n  textRaw\n}"): (typeof documents)["fragment AnnouncementBanner on AnnouncementBanner {\n  __typename\n  _id\n  _updatedAt\n  enabled\n  textRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}"): (typeof documents)["fragment Cart on Cart {\n  __typename\n  _id\n  emptyMessageRaw\n  noteRaw\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CookieConsent on CookieConsent {\n  __typename\n  _id\n  messageRaw\n  acceptLabel\n  declineLabel\n}"): (typeof documents)["fragment CookieConsent on CookieConsent {\n  __typename\n  _id\n  messageRaw\n  acceptLabel\n  declineLabel\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n  mediaBackground {\n    ...Media\n  }\n}"): (typeof documents)["fragment Footer on Footer {\n  __typename\n  _id\n  textRaw\n  navigationItems {\n    ...Button\n  }\n  mediaBackground {\n    ...Media\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}"): (typeof documents)["fragment Header on Header {\n  __typename\n  _id\n  navigationItems {\n    ...Button\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LocationNotice on LocationNotice {\n  __typename\n  _id\n  message\n  switchLabel\n  dismissLabel\n}"): (typeof documents)["fragment LocationNotice on LocationNotice {\n  __typename\n  _id\n  message\n  switchLabel\n  dismissLabel\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MetaSettings on MetaSettings {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n}"): (typeof documents)["fragment MetaSettings on MetaSettings {\n  __typename\n  _id\n  meta {\n    ...Meta\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrganisationSettings on OrganisationSettings {\n  __typename\n  _id\n  type\n  name\n  description\n  logo {\n    ...SanityImage\n  }\n  foundingDate\n  founders\n  numberOfEmployees\n  telephone\n  areaServed\n  knowsAbout\n  sameAs\n  address {\n    ...PostalAddress\n  }\n}"): (typeof documents)["fragment OrganisationSettings on OrganisationSettings {\n  __typename\n  _id\n  type\n  name\n  description\n  logo {\n    ...SanityImage\n  }\n  foundingDate\n  founders\n  numberOfEmployees\n  telephone\n  areaServed\n  knowsAbout\n  sameAs\n  address {\n    ...PostalAddress\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionByHandleQuery($handle: String!) {\n    allCollection(where: { shopify: { handle: { current: { eq: $handle } } } }) {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n"): (typeof documents)["\n  query CollectionsQuery {\n    allCollection {\n      ...Collection\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GlobalsQuery {\n    allHeader {\n      ...Header\n    }\n    allFooter {\n      ...Footer\n    }\n    allCart {\n      ...Cart\n    }\n    allMetaSettings {\n      ...MetaSettings\n    }\n    allOrganisationSettings {\n      ...OrganisationSettings\n    }\n    allAnalyticsSettings {\n      ...AnalyticsSettings\n    }\n    allAnnouncementBanner {\n      ...AnnouncementBanner\n    }\n    allCookieConsent {\n      ...CookieConsent\n    }\n    allLocationNotice {\n      ...LocationNotice\n    }\n  }\n"): (typeof documents)["\n  query GlobalsQuery {\n    allHeader {\n      ...Header\n    }\n    allFooter {\n      ...Footer\n    }\n    allCart {\n      ...Cart\n    }\n    allMetaSettings {\n      ...MetaSettings\n    }\n    allOrganisationSettings {\n      ...OrganisationSettings\n    }\n    allAnalyticsSettings {\n      ...AnalyticsSettings\n    }\n    allAnnouncementBanner {\n      ...AnnouncementBanner\n    }\n    allCookieConsent {\n      ...CookieConsent\n    }\n    allLocationNotice {\n      ...LocationNotice\n    }\n  }\n"];
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