import { link } from "./fields/link";
import { meta } from "./fields/meta";
import { header } from "./settings/header";
import { footer } from "./settings/footer";
import { home } from "./documents/home";
import { button } from "./fields/button";
import { page } from "./documents/page";
import { media } from "./fields/media";
import { product } from "./documents/product";
import { productVariant } from "./documents/productVariant";
import { collection } from "./documents/collection";
import { shopifyProduct } from "./fields/shopifyProduct";
import { shopifyProductVariant } from "./fields/shopifyProductVariant";
import { shopifyCollection } from "./fields/shopifyCollection";
import { accordion } from "./fields/accordion";
import { cart } from "./settings/cart";
import { metaSettings } from "./settings/metaSettings";
import { organisationSettings } from "./settings/organisationSettings";
import { analyticsSettings } from "./settings/analyticsSettings";
import { postalAddress } from "./fields/postalAddress";
import { vimeoVideo } from "./fields/vimeoVideo";
import { tabItem } from "./fields/tabItem";
import { formField } from "./fields/formField";
import { formGroup } from "./fields/formGroup";
import { formConsent } from "./fields/formConsent";
import { form } from "./documents/form";
import { sectionSchemas } from "./sections/sections";
import { announcementBanner } from "./settings/announcementBanner";
import { cookieConsent } from "./settings/cookieConsent";
import { locationNotice } from "./settings/locationNotice";

export const schemaTypes = [
  // Fields
  link,
  meta,
  media,
  accordion,
  shopifyProduct,
  shopifyProductVariant,
  shopifyCollection,
  button,
  postalAddress,
  vimeoVideo,
  tabItem,
  formField,
  formGroup,
  formConsent,

  // Sections
  ...sectionSchemas,

  // Documents
  home,
  page,
  product,
  productVariant,
  collection,
  form,

  // Settings
  metaSettings,
  organisationSettings,
  analyticsSettings,
  header,
  footer,
  cart,
  announcementBanner,
  cookieConsent,
  locationNotice,
];
