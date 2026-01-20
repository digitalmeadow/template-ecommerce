// https://www.sanity.io/docs/document-actions
import { EarthGlobeIcon } from "@sanity/icons";
import { DocumentActionComponent } from "sanity";
import { SHOPIFY_STORE_DOMAIN } from "shopify/config";

export const ShopifyLink: DocumentActionComponent = ({ published, type }) => {
  const document = published as any;

  if (!["collection", "product", "productVariant"].includes(type)) {
    return null;
  }

  let url: string = "";

  if (type === "collection") {
    url = `${SHOPIFY_STORE_DOMAIN}/admin/collections/${document?.shopify?.id}`;
  }
  if (type === "product") {
    url = `${SHOPIFY_STORE_DOMAIN}/admin/products/${document?.shopify?.id}`;
  }
  if (type === "productVariant") {
    url = `${SHOPIFY_STORE_DOMAIN}/admin/products/${document?.product?.shopify?.id}/variants/${document?.shopify?.id}`;
  }

  return {
    label: "View in Shopify",
    icon: EarthGlobeIcon,
    onHandle: () => {
      window.open(url);
    },
  };
};
