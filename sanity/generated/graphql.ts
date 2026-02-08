/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Accordion = Document & {
  __typename: 'Accordion';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  contentRaw?: Maybe<Scalars['JSON']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  /** For internal use only eg: 'All Products: Shipping Information' */
  title?: Maybe<Scalars['String']['output']>;
};

export type AccordionFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  summary?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type AccordionSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  summary?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Block = {
  __typename: 'Block';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<Span>>>;
  level?: Maybe<Scalars['Float']['output']>;
  listItem?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Button = {
  __typename: 'Button';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Link>;
};

export type ButtonFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  link?: InputMaybe<LinkFilter>;
};

export type ButtonSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  link?: InputMaybe<LinkSorting>;
};

export type Cart = Document & {
  __typename: 'Cart';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  emptyMessageRaw?: Maybe<Scalars['JSON']['output']>;
  noteRaw?: Maybe<Scalars['JSON']['output']>;
};

export type CartFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type CartSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type Collection = Document & {
  __typename: 'Collection';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  meta?: Maybe<Meta>;
  shopify?: Maybe<ShopifyCollection>;
};

export type CollectionFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  meta?: InputMaybe<MetaFilter>;
  shopify?: InputMaybe<ShopifyCollectionFilter>;
};

export type CollectionOrHomeOrPageOrProduct = Collection | Home | Page | Product;

export type CollectionSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  meta?: InputMaybe<MetaSorting>;
  shopify?: InputMaybe<ShopifyCollectionSorting>;
};

export type CrossDatasetReference = {
  __typename: 'CrossDatasetReference';
  _dataset?: Maybe<Scalars['String']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  _projectId?: Maybe<Scalars['String']['output']>;
  _ref?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  _weak?: Maybe<Scalars['Boolean']['output']>;
};

export type CrossDatasetReferenceFilter = {
  _dataset?: InputMaybe<StringFilter>;
  _key?: InputMaybe<StringFilter>;
  _projectId?: InputMaybe<StringFilter>;
  _ref?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _weak?: InputMaybe<BooleanFilter>;
};

export type CrossDatasetReferenceSorting = {
  _dataset?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _projectId?: InputMaybe<SortOrder>;
  _ref?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _weak?: InputMaybe<SortOrder>;
};

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Date']['input']>;
};

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A Sanity document */
export type Document = {
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DocumentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type DocumentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type File = {
  __typename: 'File';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityFileAsset>;
  media?: Maybe<GlobalDocumentReference>;
};

export type FileFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityFileAssetFilter>;
  media?: InputMaybe<GlobalDocumentReferenceFilter>;
};

export type FileSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  media?: InputMaybe<GlobalDocumentReferenceSorting>;
};

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type Footer = Document & {
  __typename: 'Footer';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  mediaBackground?: Maybe<Media>;
  navigationItems?: Maybe<Array<Maybe<Button>>>;
  textRaw?: Maybe<Scalars['JSON']['output']>;
};

export type FooterFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  mediaBackground?: InputMaybe<MediaFilter>;
};

export type FooterSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  mediaBackground?: InputMaybe<MediaSorting>;
};

export type Geopoint = {
  __typename: 'Geopoint';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  alt?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type GeopointFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alt?: InputMaybe<FloatFilter>;
  lat?: InputMaybe<FloatFilter>;
  lng?: InputMaybe<FloatFilter>;
};

export type GeopointSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alt?: InputMaybe<SortOrder>;
  lat?: InputMaybe<SortOrder>;
  lng?: InputMaybe<SortOrder>;
};

export type GlobalDocumentReference = {
  __typename: 'GlobalDocumentReference';
  _key?: Maybe<Scalars['String']['output']>;
  _ref?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  _weak?: Maybe<Scalars['Boolean']['output']>;
};

export type GlobalDocumentReferenceFilter = {
  _key?: InputMaybe<StringFilter>;
  _ref?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _weak?: InputMaybe<BooleanFilter>;
};

export type GlobalDocumentReferenceSorting = {
  _key?: InputMaybe<SortOrder>;
  _ref?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _weak?: InputMaybe<SortOrder>;
};

export type Header = Document & {
  __typename: 'Header';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  navigationItems?: Maybe<Array<Maybe<Button>>>;
};

export type HeaderFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type HeaderSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type Home = Document & {
  __typename: 'Home';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  meta?: Maybe<Meta>;
  sections?: Maybe<Array<Maybe<SectionAccordionsOrSectionCollectionOrSectionHeroOrSectionText>>>;
};

export type HomeFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  meta?: InputMaybe<MetaFilter>;
};

export type HomeSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  meta?: InputMaybe<MetaSorting>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['ID']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename: 'Image';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  crop?: Maybe<SanityImageCrop>;
  hotspot?: Maybe<SanityImageHotspot>;
  media?: Maybe<GlobalDocumentReference>;
};

export type ImageFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityImageAssetFilter>;
  crop?: InputMaybe<SanityImageCropFilter>;
  hotspot?: InputMaybe<SanityImageHotspotFilter>;
  media?: InputMaybe<GlobalDocumentReferenceFilter>;
};

export type ImageSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  crop?: InputMaybe<SanityImageCropSorting>;
  hotspot?: InputMaybe<SanityImageHotspotSorting>;
  media?: InputMaybe<GlobalDocumentReferenceSorting>;
};

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type Link = {
  __typename: 'Link';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  file?: Maybe<File>;
  newTab?: Maybe<Scalars['Boolean']['output']>;
  page?: Maybe<CollectionOrHomeOrPageOrProduct>;
  phone?: Maybe<Scalars['String']['output']>;
  section?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  file?: InputMaybe<FileFilter>;
  newTab?: InputMaybe<BooleanFilter>;
  phone?: InputMaybe<StringFilter>;
  section?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LinkSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  file?: InputMaybe<FileSorting>;
  newTab?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  section?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type Media = {
  __typename: 'Media';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  type?: Maybe<Scalars['String']['output']>;
  video?: Maybe<MuxVideo>;
};

export type MediaFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  type?: InputMaybe<StringFilter>;
  video?: InputMaybe<MuxVideoFilter>;
};

export type MediaSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  type?: InputMaybe<SortOrder>;
  video?: InputMaybe<MuxVideoSorting>;
};

export type MediaTag = Document & {
  __typename: 'MediaTag';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Slug>;
};

export type MediaTagFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  name?: InputMaybe<SlugFilter>;
};

export type MediaTagSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SlugSorting>;
};

export type Meta = {
  __typename: 'Meta';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MetaFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MetaSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  title?: InputMaybe<SortOrder>;
};

export type MuxAssetData = {
  __typename: 'MuxAssetData';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  aspect_ratio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  encoding_tier?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  master_access?: Maybe<Scalars['String']['output']>;
  max_resolution_tier?: Maybe<Scalars['String']['output']>;
  max_stored_frame_rate?: Maybe<Scalars['Float']['output']>;
  max_stored_resolution?: Maybe<Scalars['String']['output']>;
  mp4_support?: Maybe<Scalars['String']['output']>;
  passthrough?: Maybe<Scalars['String']['output']>;
  playback_ids?: Maybe<Array<Maybe<MuxPlaybackId>>>;
  resolution_tier?: Maybe<Scalars['String']['output']>;
  static_renditions?: Maybe<MuxStaticRenditions>;
  status?: Maybe<Scalars['String']['output']>;
  tracks?: Maybe<Array<Maybe<MuxTrack>>>;
  upload_id?: Maybe<Scalars['String']['output']>;
  video_quality?: Maybe<Scalars['String']['output']>;
};

export type MuxAssetDataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  aspect_ratio?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<StringFilter>;
  duration?: InputMaybe<FloatFilter>;
  encoding_tier?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  master_access?: InputMaybe<StringFilter>;
  max_resolution_tier?: InputMaybe<StringFilter>;
  max_stored_frame_rate?: InputMaybe<FloatFilter>;
  max_stored_resolution?: InputMaybe<StringFilter>;
  mp4_support?: InputMaybe<StringFilter>;
  passthrough?: InputMaybe<StringFilter>;
  resolution_tier?: InputMaybe<StringFilter>;
  static_renditions?: InputMaybe<MuxStaticRenditionsFilter>;
  status?: InputMaybe<StringFilter>;
  upload_id?: InputMaybe<StringFilter>;
  video_quality?: InputMaybe<StringFilter>;
};

export type MuxAssetDataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  aspect_ratio?: InputMaybe<SortOrder>;
  created_at?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  encoding_tier?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  master_access?: InputMaybe<SortOrder>;
  max_resolution_tier?: InputMaybe<SortOrder>;
  max_stored_frame_rate?: InputMaybe<SortOrder>;
  max_stored_resolution?: InputMaybe<SortOrder>;
  mp4_support?: InputMaybe<SortOrder>;
  passthrough?: InputMaybe<SortOrder>;
  resolution_tier?: InputMaybe<SortOrder>;
  static_renditions?: InputMaybe<MuxStaticRenditionsSorting>;
  status?: InputMaybe<SortOrder>;
  upload_id?: InputMaybe<SortOrder>;
  video_quality?: InputMaybe<SortOrder>;
};

export type MuxPlaybackId = {
  __typename: 'MuxPlaybackId';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  policy?: Maybe<Scalars['String']['output']>;
};

export type MuxPlaybackIdFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  policy?: InputMaybe<StringFilter>;
};

export type MuxPlaybackIdSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  policy?: InputMaybe<SortOrder>;
};

export type MuxStaticRenditionFile = {
  __typename: 'MuxStaticRenditionFile';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  bitrate?: Maybe<Scalars['Float']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  filesize?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  passthrough?: Maybe<Scalars['String']['output']>;
  resolution?: Maybe<Scalars['String']['output']>;
  resolution_tier?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type MuxStaticRenditionFileFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  bitrate?: InputMaybe<FloatFilter>;
  ext?: InputMaybe<StringFilter>;
  filesize?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  passthrough?: InputMaybe<StringFilter>;
  resolution?: InputMaybe<StringFilter>;
  resolution_tier?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  width?: InputMaybe<FloatFilter>;
};

export type MuxStaticRenditionFileSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  bitrate?: InputMaybe<SortOrder>;
  ext?: InputMaybe<SortOrder>;
  filesize?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  passthrough?: InputMaybe<SortOrder>;
  resolution?: InputMaybe<SortOrder>;
  resolution_tier?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type MuxStaticRenditions = {
  __typename: 'MuxStaticRenditions';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<Maybe<MuxStaticRenditionFile>>>;
  status?: Maybe<Scalars['String']['output']>;
};

export type MuxStaticRenditionsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type MuxStaticRenditionsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export type MuxTrack = {
  __typename: 'MuxTrack';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  max_frame_rate?: Maybe<Scalars['Float']['output']>;
  max_height?: Maybe<Scalars['Float']['output']>;
  max_width?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MuxTrackFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  duration?: InputMaybe<FloatFilter>;
  id?: InputMaybe<StringFilter>;
  max_frame_rate?: InputMaybe<FloatFilter>;
  max_height?: InputMaybe<FloatFilter>;
  max_width?: InputMaybe<FloatFilter>;
  type?: InputMaybe<StringFilter>;
};

export type MuxTrackSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  duration?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  max_frame_rate?: InputMaybe<SortOrder>;
  max_height?: InputMaybe<SortOrder>;
  max_width?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export type MuxVideo = {
  __typename: 'MuxVideo';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<MuxVideoAsset>;
};

export type MuxVideoAsset = Document & {
  __typename: 'MuxVideoAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  data?: Maybe<MuxAssetData>;
  filename?: Maybe<Scalars['String']['output']>;
  playbackId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  thumbTime?: Maybe<Scalars['Float']['output']>;
};

export type MuxVideoAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  assetId?: InputMaybe<StringFilter>;
  data?: InputMaybe<MuxAssetDataFilter>;
  filename?: InputMaybe<StringFilter>;
  playbackId?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  thumbTime?: InputMaybe<FloatFilter>;
};

export type MuxVideoAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  data?: InputMaybe<MuxAssetDataSorting>;
  filename?: InputMaybe<SortOrder>;
  playbackId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  thumbTime?: InputMaybe<SortOrder>;
};

export type MuxVideoFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<MuxVideoAssetFilter>;
};

export type MuxVideoSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type Page = Document & {
  __typename: 'Page';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  meta?: Maybe<Meta>;
  sections?: Maybe<Array<Maybe<SectionAccordionsOrSectionCollectionOrSectionHeroOrSectionText>>>;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  meta?: InputMaybe<MetaFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  meta?: InputMaybe<MetaSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type Product = Document & {
  __typename: 'Product';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  accordions?: Maybe<Array<Maybe<Accordion>>>;
  mediaGallery?: Maybe<Array<Maybe<Media>>>;
  mediaThumbnail?: Maybe<Media>;
  meta?: Maybe<Meta>;
  relatedProducts?: Maybe<Array<Maybe<Product>>>;
  shopify?: Maybe<ShopifyProduct>;
};

export type ProductFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  mediaThumbnail?: InputMaybe<MediaFilter>;
  meta?: InputMaybe<MetaFilter>;
  shopify?: InputMaybe<ShopifyProductFilter>;
};

export type ProductSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  mediaThumbnail?: InputMaybe<MediaSorting>;
  meta?: InputMaybe<MetaSorting>;
  shopify?: InputMaybe<ShopifyProductSorting>;
};

export type ProductVariant = Document & {
  __typename: 'ProductVariant';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  meta?: Maybe<Meta>;
  product?: Maybe<Product>;
  shopify?: Maybe<ShopifyProductVariant>;
};

export type ProductVariantFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  meta?: InputMaybe<MetaFilter>;
  product?: InputMaybe<ProductFilter>;
  shopify?: InputMaybe<ShopifyProductVariantFilter>;
};

export type ProductVariantSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  meta?: InputMaybe<MetaSorting>;
  shopify?: InputMaybe<ShopifyProductVariantSorting>;
};

export type RootQuery = {
  __typename: 'RootQuery';
  Accordion?: Maybe<Accordion>;
  Cart?: Maybe<Cart>;
  Collection?: Maybe<Collection>;
  Document?: Maybe<Document>;
  Footer?: Maybe<Footer>;
  Header?: Maybe<Header>;
  Home?: Maybe<Home>;
  MediaTag?: Maybe<MediaTag>;
  MuxVideoAsset?: Maybe<MuxVideoAsset>;
  Page?: Maybe<Page>;
  Product?: Maybe<Product>;
  ProductVariant?: Maybe<ProductVariant>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  allAccordion: Array<Accordion>;
  allCart: Array<Cart>;
  allCollection: Array<Collection>;
  allDocument: Array<Document>;
  allFooter: Array<Footer>;
  allHeader: Array<Header>;
  allHome: Array<Home>;
  allMediaTag: Array<MediaTag>;
  allMuxVideoAsset: Array<MuxVideoAsset>;
  allPage: Array<Page>;
  allProduct: Array<Product>;
  allProductVariant: Array<ProductVariant>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allSanityImageAsset: Array<SanityImageAsset>;
};


export type RootQueryAccordionArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryCollectionArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryFooterArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHeaderArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryHomeArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryMediaTagArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryMuxVideoAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryPageArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryProductVariantArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']['input'];
};


export type RootQueryAllAccordionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AccordionSorting>>;
  where?: InputMaybe<AccordionFilter>;
};


export type RootQueryAllCartArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CartSorting>>;
  where?: InputMaybe<CartFilter>;
};


export type RootQueryAllCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CollectionSorting>>;
  where?: InputMaybe<CollectionFilter>;
};


export type RootQueryAllDocumentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DocumentSorting>>;
  where?: InputMaybe<DocumentFilter>;
};


export type RootQueryAllFooterArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FooterSorting>>;
  where?: InputMaybe<FooterFilter>;
};


export type RootQueryAllHeaderArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeaderSorting>>;
  where?: InputMaybe<HeaderFilter>;
};


export type RootQueryAllHomeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HomeSorting>>;
  where?: InputMaybe<HomeFilter>;
};


export type RootQueryAllMediaTagArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MediaTagSorting>>;
  where?: InputMaybe<MediaTagFilter>;
};


export type RootQueryAllMuxVideoAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MuxVideoAssetSorting>>;
  where?: InputMaybe<MuxVideoAssetFilter>;
};


export type RootQueryAllPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PageSorting>>;
  where?: InputMaybe<PageFilter>;
};


export type RootQueryAllProductArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ProductSorting>>;
  where?: InputMaybe<ProductFilter>;
};


export type RootQueryAllProductVariantArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ProductVariantSorting>>;
  where?: InputMaybe<ProductVariantFilter>;
};


export type RootQueryAllSanityFileAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityFileAssetSorting>>;
  where?: InputMaybe<SanityFileAssetFilter>;
};


export type RootQueryAllSanityImageAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityImageAssetSorting>>;
  where?: InputMaybe<SanityImageAssetFilter>;
};

export type SanityAssetSourceData = {
  __typename: 'SanityAssetSourceData';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']['output']>;
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']['output']>;
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityAssetSourceDataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityFileAsset = Document & {
  __typename: 'SanityFileAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityFileAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageAsset = Document & {
  __typename: 'SanityImageAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<SanityImageMetadata>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<SanityImageMetadataFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityImageAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<SanityImageMetadataSorting>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageCrop = {
  __typename: 'SanityImageCrop';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  bottom?: Maybe<Scalars['Float']['output']>;
  left?: Maybe<Scalars['Float']['output']>;
  right?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageCropFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  bottom?: InputMaybe<FloatFilter>;
  left?: InputMaybe<FloatFilter>;
  right?: InputMaybe<FloatFilter>;
  top?: InputMaybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  bottom?: InputMaybe<SortOrder>;
  left?: InputMaybe<SortOrder>;
  right?: InputMaybe<SortOrder>;
  top?: InputMaybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename: 'SanityImageDimensions';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageDimensionsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  aspectRatio?: InputMaybe<FloatFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  aspectRatio?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename: 'SanityImageHotspot';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageHotspotFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
  x?: InputMaybe<FloatFilter>;
  y?: InputMaybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
  x?: InputMaybe<SortOrder>;
  y?: InputMaybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename: 'SanityImageMetadata';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  blurHash?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<SanityImageDimensions>;
  hasAlpha?: Maybe<Scalars['Boolean']['output']>;
  isOpaque?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Geopoint>;
  lqip?: Maybe<Scalars['String']['output']>;
  palette?: Maybe<SanityImagePalette>;
};

export type SanityImageMetadataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  blurHash?: InputMaybe<StringFilter>;
  dimensions?: InputMaybe<SanityImageDimensionsFilter>;
  hasAlpha?: InputMaybe<BooleanFilter>;
  isOpaque?: InputMaybe<BooleanFilter>;
  location?: InputMaybe<GeopointFilter>;
  lqip?: InputMaybe<StringFilter>;
  palette?: InputMaybe<SanityImagePaletteFilter>;
};

export type SanityImageMetadataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  blurHash?: InputMaybe<SortOrder>;
  dimensions?: InputMaybe<SanityImageDimensionsSorting>;
  hasAlpha?: InputMaybe<SortOrder>;
  isOpaque?: InputMaybe<SortOrder>;
  location?: InputMaybe<GeopointSorting>;
  lqip?: InputMaybe<SortOrder>;
  palette?: InputMaybe<SanityImagePaletteSorting>;
};

export type SanityImagePalette = {
  __typename: 'SanityImagePalette';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  darkMuted?: Maybe<SanityImagePaletteSwatch>;
  darkVibrant?: Maybe<SanityImagePaletteSwatch>;
  dominant?: Maybe<SanityImagePaletteSwatch>;
  lightMuted?: Maybe<SanityImagePaletteSwatch>;
  lightVibrant?: Maybe<SanityImagePaletteSwatch>;
  muted?: Maybe<SanityImagePaletteSwatch>;
  vibrant?: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  dominant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  muted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  dominant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  muted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename: 'SanityImagePaletteSwatch';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  foreground?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  background?: InputMaybe<StringFilter>;
  foreground?: InputMaybe<StringFilter>;
  population?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  foreground?: InputMaybe<SortOrder>;
  population?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  /** All documents referencing the given document ID. */
  references?: InputMaybe<Scalars['ID']['input']>;
};

export type SectionAccordions = {
  __typename: 'SectionAccordions';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  accordions?: Maybe<Array<Maybe<Accordion>>>;
};

export type SectionAccordionsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
};

export type SectionAccordionsOrSectionCollectionOrSectionHeroOrSectionText = SectionAccordions | SectionCollection | SectionHero | SectionText;

export type SectionAccordionsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type SectionCollection = {
  __typename: 'SectionCollection';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<Collection>;
};

export type SectionCollectionFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  collection?: InputMaybe<CollectionFilter>;
};

export type SectionCollectionSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type SectionHero = {
  __typename: 'SectionHero';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  backgroundMedia?: Maybe<Media>;
  heading?: Maybe<Scalars['String']['output']>;
  textRaw?: Maybe<Scalars['JSON']['output']>;
};

export type SectionHeroFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  backgroundMedia?: InputMaybe<MediaFilter>;
  heading?: InputMaybe<StringFilter>;
};

export type SectionHeroSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  backgroundMedia?: InputMaybe<MediaSorting>;
  heading?: InputMaybe<SortOrder>;
};

export type SectionText = {
  __typename: 'SectionText';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  textRaw?: Maybe<Scalars['JSON']['output']>;
};

export type SectionTextFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
};

export type SectionTextSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type ShopifyCollection = {
  __typename: 'ShopifyCollection';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Slug>;
  id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ShopifyCollectionFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  handle?: InputMaybe<SlugFilter>;
  id?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ShopifyCollectionSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  handle?: InputMaybe<SlugSorting>;
  id?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type ShopifyProduct = {
  __typename: 'ShopifyProduct';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Slug>;
  id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ShopifyProductFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  handle?: InputMaybe<SlugFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ShopifyProductSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  handle?: InputMaybe<SlugSorting>;
  id?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type ShopifyProductVariant = {
  __typename: 'ShopifyProductVariant';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ShopifyProductVariantFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  productId?: InputMaybe<StringFilter>;
  sku?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ShopifyProductVariantSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Slug = {
  __typename: 'Slug';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  current?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type SlugFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  current?: InputMaybe<StringFilter>;
  source?: InputMaybe<StringFilter>;
};

export type SlugSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  current?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC'
}

export type Span = {
  __typename: 'Span';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  marks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['String']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CartFragment = { __typename: 'Cart', _id?: string | null, emptyMessageRaw?: any | null, noteRaw?: any | null };

export type FooterFragment = { __typename: 'Footer', _id?: string | null, textRaw?: any | null, navigationItems?: Array<{ __typename: 'Button', label?: string | null, link?: { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
        | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
        | { __typename: 'Home', _id?: string | null, _type?: string | null }
        | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
        | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
       | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null } | null } | null> | null, mediaBackground?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null };

export type HeaderFragment = { __typename: 'Header', _id?: string | null, navigationItems?: Array<{ __typename: 'Button', label?: string | null, link?: { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
        | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
        | { __typename: 'Home', _id?: string | null, _type?: string | null }
        | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
        | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
       | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null } | null } | null> | null };

export type AccordionFragment = { __typename: 'Accordion', summary?: string | null, contentRaw?: any | null };

export type ButtonFragment = { __typename: 'Button', label?: string | null, link?: { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
      | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
      | { __typename: 'Home', _id?: string | null, _type?: string | null }
      | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
      | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
     | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null } | null };

export type LinkFragment = { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
    | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
    | { __typename: 'Home', _id?: string | null, _type?: string | null }
    | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
    | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
   | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null };

export type MediaFragment = { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null };

export type MetaFragment = { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null };

export type MuxVideoFragment = { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null };

export type MuxVideoAssetFragment = { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null };

export type MuxAssetDataFragment = { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null };

export type SanityFileFragment = { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null };

export type SanityFileAssetFragment = { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null };

export type SanityImageFragment = { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null };

export type SanityImageAssetFragment = { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null };

export type SanityImageMetadataFragment = { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null };

export type SanityImageDimensionsFragment = { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null };

export type SanityImageHotspotFragment = { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null };

export type SanityImageCropFragment = { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null };

export type SlugFragment = { __typename: 'Slug', current?: string | null };

export type CollectionFragment = { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null };

export type HomeFragment = { __typename: 'Home', _id?: string | null, sections?: Array<
    | { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null }
    | { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null }
    | { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }
    | { __typename: 'SectionText', textRaw?: any | null }
   | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null };

export type PageFragment = { __typename: 'Page', _id?: string | null, title?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null, sections?: Array<
    | { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null }
    | { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null }
    | { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }
    | { __typename: 'SectionText', textRaw?: any | null }
   | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null };

export type ProductThumbnailFragment = { __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null };

export type ProductFragment = { __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, mediaGallery?: Array<{ __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null> | null, accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null, relatedProducts?: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null };

export type ProductVariantFragment = { __typename: 'ProductVariant', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProductVariant', title?: string | null } | null };

export type SectionAccordionsFragment = { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null };

export type SectionCollectionFragment = { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null };

export type SectionHeroFragment = { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null };

export type SectionTextFragment = { __typename: 'SectionText', textRaw?: any | null };

export type CartQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQueryQuery = { __typename: 'RootQuery', allCart: Array<{ __typename: 'Cart', _id?: string | null, emptyMessageRaw?: any | null, noteRaw?: any | null }> };

export type CollectionByHandleQueryQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type CollectionByHandleQueryQuery = { __typename: 'RootQuery', allCollection: Array<{ __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null }> };

export type CollectionsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsQueryQuery = { __typename: 'RootQuery', allCollection: Array<{ __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null }> };

export type FooterQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type FooterQueryQuery = { __typename: 'RootQuery', allFooter: Array<{ __typename: 'Footer', _id?: string | null, textRaw?: any | null, navigationItems?: Array<{ __typename: 'Button', label?: string | null, link?: { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
          | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
          | { __typename: 'Home', _id?: string | null, _type?: string | null }
          | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
          | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
         | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null } | null } | null> | null, mediaBackground?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }> };

export type HeaderQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HeaderQueryQuery = { __typename: 'RootQuery', allHeader: Array<{ __typename: 'Header', _id?: string | null, navigationItems?: Array<{ __typename: 'Button', label?: string | null, link?: { __typename: 'Link', type?: string | null, url?: string | null, section?: string | null, email?: string | null, phone?: string | null, newTab?: boolean | null, page?:
          | { __typename: 'Collection', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyCollection', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
          | { __typename: 'Home', _id?: string | null, _type?: string | null }
          | { __typename: 'Page', _id?: string | null, _type?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null }
          | { __typename: 'Product', _id?: string | null, _type?: string | null, shopify?: { __typename: 'ShopifyProduct', handle?: { __typename: 'Slug', current?: string | null } | null } | null }
         | null, file?: { __typename: 'File', asset?: { __typename: 'SanityFileAsset', url?: string | null, originalFilename?: string | null } | null } | null } | null } | null> | null }> };

export type HomeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQueryQuery = { __typename: 'RootQuery', allHome: Array<{ __typename: 'Home', _id?: string | null, sections?: Array<
      | { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null }
      | { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null }
      | { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }
      | { __typename: 'SectionText', textRaw?: any | null }
     | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null }> };

export type PageQueryQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PageQueryQuery = { __typename: 'RootQuery', allPage: Array<{ __typename: 'Page', _id?: string | null, title?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null, sections?: Array<
      | { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null }
      | { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null }
      | { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }
      | { __typename: 'SectionText', textRaw?: any | null }
     | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null }> };

export type PagesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQueryQuery = { __typename: 'RootQuery', allPage: Array<{ __typename: 'Page', _id?: string | null, title?: string | null, slug?: { __typename: 'Slug', current?: string | null } | null, sections?: Array<
      | { __typename: 'SectionAccordions', accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null }
      | { __typename: 'SectionCollection', collection?: { __typename: 'Collection', _id?: string | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyCollection', title?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null }
      | { __typename: 'SectionHero', heading?: string | null, textRaw?: any | null, backgroundMedia?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null }
      | { __typename: 'SectionText', textRaw?: any | null }
     | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null }> };

export type ProductThumbnailByHandleQueryQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type ProductThumbnailByHandleQueryQuery = { __typename: 'RootQuery', allProduct: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null }> };

export type ProductByHandleQueryQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type ProductByHandleQueryQuery = { __typename: 'RootQuery', allProduct: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, mediaGallery?: Array<{ __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null> | null, accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null, relatedProducts?: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null }> };

export type ProductsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQueryQuery = { __typename: 'RootQuery', allProduct: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, mediaGallery?: Array<{ __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null> | null, accordions?: Array<{ __typename: 'Accordion', summary?: string | null, contentRaw?: any | null } | null> | null, relatedProducts?: Array<{ __typename: 'Product', _id?: string | null, mediaThumbnail?: { __typename: 'Media', type?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null, video?: { __typename: 'MuxVideo', asset?: { __typename: 'MuxVideoAsset', playbackId?: string | null, filename?: string | null, data?: { __typename: 'MuxAssetData', aspect_ratio?: string | null, duration?: number | null } | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null } | null> | null, meta?: { __typename: 'Meta', title?: string | null, description?: string | null, image?: { __typename: 'Image', asset?: { __typename: 'SanityImageAsset', url?: string | null, altText?: string | null, originalFilename?: string | null, metadata?: { __typename: 'SanityImageMetadata', lqip?: string | null, dimensions?: { __typename: 'SanityImageDimensions', width?: number | null, height?: number | null, aspectRatio?: number | null } | null } | null } | null, hotspot?: { __typename: 'SanityImageHotspot', x?: number | null, y?: number | null, height?: number | null, width?: number | null } | null, crop?: { __typename: 'SanityImageCrop', top?: number | null, bottom?: number | null, left?: number | null, right?: number | null } | null } | null } | null, shopify?: { __typename: 'ShopifyProduct', title?: string | null, status?: string | null, handle?: { __typename: 'Slug', current?: string | null } | null } | null }> };

export const CartFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Cart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"emptyMessageRaw"}},{"kind":"Field","name":{"kind":"Name","value":"noteRaw"}}]}}]} as unknown as DocumentNode<CartFragment, unknown>;
export const SlugFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]} as unknown as DocumentNode<SlugFragment, unknown>;
export const SanityFileAssetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}}]} as unknown as DocumentNode<SanityFileAssetFragment, unknown>;
export const SanityFileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}}]} as unknown as DocumentNode<SanityFileFragment, unknown>;
export const LinkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}}]} as unknown as DocumentNode<LinkFragment, unknown>;
export const ButtonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Button"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Button"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}}]} as unknown as DocumentNode<ButtonFragment, unknown>;
export const SanityImageDimensionsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}}]} as unknown as DocumentNode<SanityImageDimensionsFragment, unknown>;
export const SanityImageMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}}]} as unknown as DocumentNode<SanityImageMetadataFragment, unknown>;
export const SanityImageAssetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}}]} as unknown as DocumentNode<SanityImageAssetFragment, unknown>;
export const SanityImageHotspotFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]} as unknown as DocumentNode<SanityImageHotspotFragment, unknown>;
export const SanityImageCropFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}}]} as unknown as DocumentNode<SanityImageCropFragment, unknown>;
export const SanityImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}}]} as unknown as DocumentNode<SanityImageFragment, unknown>;
export const MuxAssetDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]} as unknown as DocumentNode<MuxAssetDataFragment, unknown>;
export const MuxVideoAssetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]} as unknown as DocumentNode<MuxVideoAssetFragment, unknown>;
export const MuxVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}}]} as unknown as DocumentNode<MuxVideoFragment, unknown>;
export const MediaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}}]} as unknown as DocumentNode<MediaFragment, unknown>;
export const FooterFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Footer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Footer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}},{"kind":"Field","name":{"kind":"Name","value":"navigationItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Button"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaBackground"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Button"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Button"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}}]} as unknown as DocumentNode<FooterFragment, unknown>;
export const HeaderFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Header"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"navigationItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Button"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Button"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Button"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link"}}]}}]}}]} as unknown as DocumentNode<HeaderFragment, unknown>;
export const SectionHeroFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}}]} as unknown as DocumentNode<SectionHeroFragment, unknown>;
export const SectionTextFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}}]} as unknown as DocumentNode<SectionTextFragment, unknown>;
export const MetaFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}}]} as unknown as DocumentNode<MetaFragment, unknown>;
export const CollectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]} as unknown as DocumentNode<CollectionFragment, unknown>;
export const SectionCollectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]} as unknown as DocumentNode<SectionCollectionFragment, unknown>;
export const AccordionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}}]} as unknown as DocumentNode<AccordionFragment, unknown>;
export const SectionAccordionsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}}]} as unknown as DocumentNode<SectionAccordionsFragment, unknown>;
export const HomeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Home"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Home"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionCollection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionAccordions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}}]} as unknown as DocumentNode<HomeFragment, unknown>;
export const PageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Page"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionCollection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionAccordions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}}]} as unknown as DocumentNode<PageFragment, unknown>;
export const ProductThumbnailFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}}]} as unknown as DocumentNode<ProductThumbnailFragment, unknown>;
export const ProductFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaGallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductThumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}}]} as unknown as DocumentNode<ProductFragment, unknown>;
export const ProductVariantFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}}]} as unknown as DocumentNode<ProductVariantFragment, unknown>;
export const CartQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CartQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Cart"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Cart"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cart"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"emptyMessageRaw"}},{"kind":"Field","name":{"kind":"Name","value":"noteRaw"}}]}}]} as unknown as DocumentNode<CartQueryQuery, CartQueryQueryVariables>;
export const CollectionByHandleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionByHandleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shopify"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"handle"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"current"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionByHandleQueryQuery, CollectionByHandleQueryQueryVariables>;
export const CollectionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]} as unknown as DocumentNode<CollectionsQueryQuery, CollectionsQueryQueryVariables>;
export const FooterQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FooterQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allFooter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Footer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Button"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Button"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Footer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Footer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}},{"kind":"Field","name":{"kind":"Name","value":"navigationItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Button"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaBackground"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}}]}}]} as unknown as DocumentNode<FooterQueryQuery, FooterQueryQueryVariables>;
export const HeaderQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HeaderQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Header"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFileAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityFileAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityFile"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFileAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Link"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Link"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Document"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"_type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"section"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityFile"}}]}},{"kind":"Field","name":{"kind":"Name","value":"newTab"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Button"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Button"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Header"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Header"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"navigationItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Button"}}]}}]}}]} as unknown as DocumentNode<HeaderQueryQuery, HeaderQueryQueryVariables>;
export const HomeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Home"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Home"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Home"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionCollection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionAccordions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}}]}}]} as unknown as DocumentNode<HomeQueryQuery, HomeQueryQueryVariables>;
export const PageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"current"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Page"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Page"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionCollection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionAccordions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}}]}}]} as unknown as DocumentNode<PageQueryQuery, PageQueryQueryVariables>;
export const PagesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PagesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Page"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHero"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHero"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionText"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"textRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Collection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Collection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionAccordions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionAccordions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Page"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHero"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionText"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionCollection"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionAccordions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}}]}}]} as unknown as DocumentNode<PagesQueryQuery, PagesQueryQueryVariables>;
export const ProductThumbnailByHandleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductThumbnailByHandleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shopify"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"handle"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"current"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductThumbnail"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ProductThumbnailByHandleQueryQuery, ProductThumbnailByHandleQueryQueryVariables>;
export const ProductByHandleQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductByHandleQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"shopify"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"handle"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"current"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Product"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaGallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductThumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ProductByHandleQueryQuery, ProductByHandleQueryQueryVariables>;
export const ProductsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Product"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageDimensions"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageDimensions"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lqip"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageDimensions"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageMetadata"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageHotspot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageHotspot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImageCrop"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SanityImageCrop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"bottom"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"right"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SanityImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageAsset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hotspot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageHotspot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"crop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImageCrop"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxAssetData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxAssetData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aspect_ratio"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideoAsset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideoAsset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playbackId"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxAssetData"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MuxVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuxVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideoAsset"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Media"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Media"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MuxVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Accordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Accordion"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"contentRaw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Slug"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Slug"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductThumbnail"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Meta"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Meta"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SanityImage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaThumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaGallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accordions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Accordion"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductThumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Meta"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shopify"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ProductsQueryQuery, ProductsQueryQueryVariables>;