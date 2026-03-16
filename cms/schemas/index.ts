import { link } from "./fields/link";
import { meta } from "./fields/meta";
import { header } from "./settings/header";
import { footer } from "./settings/footer";
import { home } from "./documents/home";
import { button } from "./fields/button";
import { page } from "./documents/page";
import { media } from "./fields/media";
import { sectionHero } from "./sections/sectionHero";
import { textRich } from "./fields/textRich";
import { product } from "./documents/product";
import { productVariant } from "./documents/productVariant";
import { collection } from "./documents/collection";
import { shopifyProduct } from "./fields/shopifyProduct";
import { shopifyProductVariant } from "./fields/shopifyProductVariant";
import { shopifyCollection } from "./fields/shopifyCollection";
import { sectionText } from "./sections/sectionText";
import { sectionCollection } from "./sections/sectionCollection";
import { accordion } from "./fields/accordion";
import { sectionAccordions } from "./sections/sectionAccordions";
import { cart } from "./settings/cart";
import { metaSettings } from "./settings/metaSettings";

export const schemaTypes = [
  // Fields
  link,
  textRich,
  meta,
  media,
  accordion,
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,
  button,

  // Sections
  sectionHero,
  sectionText,
  sectionCollection,
  sectionAccordions,

  // Documents
  home,
  page,
  product,
  productVariant,
  collection,

  // Settings
  metaSettings,
  header,
  footer,
  cart,
];
