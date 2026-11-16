import { accordion } from "./documents/accordion";
import { collection } from "./documents/collection";
import { form } from "./documents/form";
import { formSubmission } from "./documents/formSubmission";
import { home } from "./documents/home";
import { page } from "./documents/page";
import { product } from "./documents/product";
import { productVariant } from "./documents/productVariant";
import { button } from "./fields/button";
import { formAnswer } from "./fields/formAnswer";
import { formConsent } from "./fields/formConsent";
import { formField } from "./fields/formField";
import { formGroup } from "./fields/formGroup";
import { link } from "./fields/link";
import { media } from "./fields/media";
import { meta } from "./fields/meta";
import { postalAddress } from "./fields/postalAddress";
import { shopifyCollection } from "./fields/shopifyCollection";
import { shopifyProduct } from "./fields/shopifyProduct";
import { shopifyProductVariant } from "./fields/shopifyProductVariant";
import { tabItem } from "./fields/tabItem";
import { vimeoVideo } from "./fields/vimeoVideo";
import { sectionSchemas } from "./sections/sections";
import { analyticsSettings } from "./settings/analyticsSettings";
import { announcementBanner } from "./settings/announcementBanner";
import { cart } from "./settings/cart";
import { cookieConsent } from "./settings/cookieConsent";
import { footer } from "./settings/footer";
import { header } from "./settings/header";
import { locationNotice } from "./settings/locationNotice";
import { metaSettings } from "./settings/metaSettings";
import { organisationSettings } from "./settings/organisationSettings";

export const schemaTypes = [
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
  formAnswer,

  ...sectionSchemas,

  home,
  page,
  product,
  productVariant,
  collection,
  form,
  formSubmission,

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
