import { link } from "./fields/link";
import { meta } from "./fields/meta";
import { header } from "./components/header";
import { footer } from "./components/footer";
import { home } from "./pages/home";
import { button } from "./fields/button";
import { page } from "./pages/page";
import { media } from "./fields/media";
import { sectionHero } from "./sections/sectionHero";
import { textRich } from "./fields/textRich";
import { product } from "./pages/product";
import { productVariant } from "./pages/productVariant";
import { collection } from "./pages/collection";
import { shopifyProduct } from "./shopify/shopifyProduct";
import { shopifyProductVariant } from "./shopify/shopifyProductVariant";
import { shopifyCollection } from "./shopify/shopifyCollection";
import { sectionText } from "./sections/sectionText";
import { sectionCollection } from "./sections/sectionCollection";
import { accordion } from "./fields/accordion";
import { sectionAccordions } from "./sections/sectionAccordions";
import { cart } from "./components/cart";

export const schemaTypes = [
  // Fields
  link,
  textRich,
  meta,
  media,
  accordion,

  // Shopify
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,

  // Blocks
  button,

  // Sections
  sectionHero,
  sectionText,
  sectionCollection,
  sectionAccordions,

  // Components
  header,
  footer,
  cart,

  // Pages
  home,
  page,
  product,
  productVariant,
  collection,
];
