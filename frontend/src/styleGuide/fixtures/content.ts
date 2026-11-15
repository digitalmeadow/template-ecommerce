import type {
  ButtonFragment,
  FormConsentFragment,
  FormFieldFragment,
  FormFragment,
  LinkFragment,
  MediaFragment,
  SanityImageFragment,
} from "sanity/generated/graphql";
import type { CurrencyCode } from "shopify/generated/graphql";
import type { ProductThumbnailShopifySanity } from "@lib/fetches/productShopifySanity";

// Shared sample content. Images are the template dataset's public CDN URLs, so they render without
// a token; swap them here for a project's own.
const CDN = "https://cdn.sanity.io/images/iqfm6q7t/production";
const IMAGES = {
  snowboard: "8b504abf2c95c62fafb6165fbf73e6c6004c1378-2048x2048.webp",
  snowboardLiquid: "dc947e78de7caae4c04f874cebd6165822783f94-2048x2048.webp",
  snowboardOxygen: "a0ae570f5fb3953ee117980edac467392572fa0e-2048x2048.webp",
  snowboardHydrogen: "10875feb4278ba24c446ce52cae7d497c0d1d5ba-2048x2048.webp",
  snowboardMinimal: "9e3efaca98a9f561ba20b98cb31ecef451285b72-2048x2048.webp",
  skiWax: "7ec033010d391dff541b16ce3dfe67f396c53051-2048x2048.webp",
  giftCard: "b0957fe3888c4e797f433861c9c2a561be8f50e4-2048x2048.webp",
  wordmark: "6283400a5fb1d1df478ebaea3d633a69b6b4a188-3833x1038.webp",
};
export type ImageName = keyof typeof IMAGES;

const VIMEO_URL = "https://vimeo.com/76979871";

let count = 0;
/** Unique `_key`s: interactive parts derive ids from them. */
export const key = () => `sg${++count}`;

export const image = (name: ImageName): SanityImageFragment => {
  const path = IMAGES[name];
  const [width, height] = (path.match(/-(\d+)x(\d+)\./) ?? []).slice(1).map(Number);
  return {
    __typename: "Image",
    asset: {
      __typename: "SanityImageAsset",
      url: `${CDN}/${path}`,
      altText: "Placeholder",
      originalFilename: path,
      metadata: {
        __typename: "SanityImageMetadata",
        lqip: null,
        dimensions: {
          __typename: "SanityImageDimensions",
          width,
          height,
          aspectRatio: width / height,
        },
      },
    },
    hotspot: null,
    crop: null,
  };
};

const noMedia = { __typename: "Media", image: null, video: null, vimeo: null } as const;
export const media = {
  image: (name: ImageName): MediaFragment => ({ ...noMedia, type: "image", image: image(name) }),
  vimeo: (): MediaFragment => ({
    ...noMedia,
    type: "vimeo",
    vimeo: { __typename: "VimeoVideo", url: VIMEO_URL },
  }),
};

export const link = (url = "#"): LinkFragment => ({
  __typename: "Link",
  type: "url",
  url,
  section: null,
  email: null,
  phone: null,
  newTab: null,
  page: null,
  file: null,
});

export const button = (label: string, url = "#"): ButtonFragment => ({
  __typename: "Button",
  label,
  link: link(url),
});

// Portable Text. Codegen types it as `unknown`, so these builders return plain block arrays.
type Span = { text: string; link?: string; marks?: string[] };
const toSpans = (content: string | Span[]) => {
  const spans = typeof content === "string" ? [{ text: content }] : content;
  const markDefs = spans
    .filter((span) => span.link)
    .map((span) => ({ ...link(span.link), _key: key(), _type: "link" }));
  let linkIndex = 0;
  const children = spans.map((span) => ({
    _key: key(),
    _type: "span",
    text: span.text,
    marks: [...(span.marks ?? []), ...(span.link ? [markDefs[linkIndex++]._key] : [])],
  }));
  return { children, markDefs };
};

export const block = (content: string | Span[], style = "normal", list?: "bullet" | "number") => ({
  _key: key(),
  _type: "block",
  style,
  ...toSpans(content),
  ...(list ? { listItem: list, level: 1 } : {}),
});

export const richText = (...blocks: object[]) => blocks;
export const paragraph = (text: string) => richText(block(text));

export const lorem = {
  short: "Boards built for the whole mountain.",
  medium:
    "Every board is pressed in small runs and tested on snow before it ships, so it rides the way it should from the first day.",
  long: "We started in a garage with one press and a rule: build the board we'd want to ride. Every core is cut from sustainably grown poplar, wrapped in triaxial glass and finished by hand, so each board in a run is as close to the last as we can make it.",
};

/** Every block type the extended rich text preset allows. */
export const richTextBody = richText(
  block("Made to ride", "h2"),
  block([
    { text: "Paragraphs carry " },
    { text: "bold", marks: ["strong"] },
    { text: ", " },
    { text: "italic", marks: ["em"] },
    { text: " and " },
    { text: "linked", link: "#" },
    { text: " text." },
  ]),
  block("What's in the box", "h3"),
  block("Board, wrapped in recycled paper", "normal", "bullet"),
  block("Stomp pad and spare inserts", "normal", "bullet"),
  block("Care guide", "normal", "bullet"),
  block("Getting set up", "h3"),
  block("Mount your bindings", "normal", "number"),
  block("Set your stance", "normal", "number"),
  block("Wax before the first run", "normal", "number"),
  block(lorem.long),
);

const field = (
  fields: Partial<FormFieldFragment> & Pick<FormFieldFragment, "name" | "type">,
): FormFieldFragment => ({
  __typename: "FormField",
  _key: key(),
  label: null,
  placeholder: null,
  options: null,
  required: false,
  width: "full",
  ...fields,
});

/** One of every field type the CMS offers. */
export const formFields = {
  text: field({ name: "name", type: "text", label: "Name", required: true, width: "half" }),
  email: field({ name: "email", type: "email", label: "Email", required: true, width: "half" }),
  tel: field({ name: "phone", type: "tel", label: "Phone", width: "half" }),
  select: field({
    name: "topic",
    type: "select",
    label: "Topic",
    width: "half",
    options: ["Order", "Returns", "Wholesale"],
  }),
  textarea: field({
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "How can we help?",
    required: true,
  }),
  checkboxGroup: field({
    name: "riding",
    type: "checkboxGroup",
    label: "Riding style",
    options: ["Park", "Powder", "All mountain"],
  }),
  radioGroup: field({
    name: "level",
    type: "radioGroup",
    label: "Level",
    required: true,
    options: ["Beginner", "Intermediate", "Advanced"],
  }),
  file: field({ name: "receipt", type: "file", label: "Receipt" }),
  files: field({ name: "photos", type: "files", label: "Photos" }),
};

const term = (name: string, statement: object[], required: boolean): FormConsentFragment => ({
  __typename: "FormConsent",
  _key: key(),
  name,
  label: null,
  statementRaw: statement,
  required,
});

export const formTerms = {
  privacy: term(
    "privacy",
    richText(
      block([
        { text: "I agree to the processing of my data as described in the " },
        { text: "privacy policy", link: "/policies/privacy-policy" },
        { text: "." },
      ]),
    ),
    true,
  ),
  newsletter: term("newsletter", paragraph("Send me news and new releases."), false),
};

export const form = (
  groups: { heading: string | null; fields: FormFieldFragment[] }[],
  terms: FormConsentFragment[] = [],
): FormFragment => ({
  __typename: "Form",
  _id: `sg-form-${key()}`,
  title: "Sample form",
  submitLabel: "Send",
  successMessageRaw: paragraph("Thanks, we'll be in touch."),
  groups: groups.map((group) => ({ __typename: "FormGroup", _key: key(), ...group })),
  terms,
});

const money = (amount: number, currencyCode: CurrencyCode = "AUD") => ({
  __typename: "MoneyV2" as const,
  amount: amount.toFixed(2),
  currencyCode,
});

const priceRange = (min: number, max = min) => ({
  __typename: "ProductPriceRange" as const,
  minVariantPrice: money(min),
  maxVariantPrice: money(max),
});

/** A product card as Shopify and Sanity pair it. `compareAt` above `price` shows a sale. */
export const product = (
  title: string,
  imageName: ImageName,
  { price, maxPrice, compareAt = 0 }: { price: number; maxPrice?: number; compareAt?: number },
): ProductThumbnailShopifySanity => {
  const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    shopify: {
      __typename: "Product",
      id: `gid://shopify/Product/${key()}`,
      title,
      handle,
      availableForSale: true,
      priceRange: priceRange(price, maxPrice),
      compareAtPriceRange: priceRange(compareAt),
    },
    sanity: {
      __typename: "Product",
      _id: `sg-product-${handle}`,
      mediaThumbnail: media.image(imageName),
      shopify: {
        __typename: "ShopifyProduct",
        title,
        status: "active",
        handle: { __typename: "Slug", current: handle },
      },
    },
  };
};

export const products = [
  product("The Complete Snowboard", "snowboard", { price: 699.95 }),
  product("The Collection Snowboard: Liquid", "snowboardLiquid", { price: 749.95 }),
  product("The Collection Snowboard: Oxygen", "snowboardOxygen", { price: 629.95, compareAt: 785 }),
  product("The Collection Snowboard: Hydrogen", "snowboardHydrogen", { price: 600 }),
  product("The Minimal Snowboard", "snowboardMinimal", { price: 885.95 }),
  product("Selling Plans Ski Wax", "skiWax", { price: 9.95, maxPrice: 49.95 }),
  product("Gift Card", "giftCard", { price: 10, maxPrice: 100 }),
];
