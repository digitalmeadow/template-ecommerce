// https://www.sanity.io/docs/document-actions
import EarthGlobeIcon from "@sanity/icons/EarthGlobe";
import { DocumentActionComponent } from "sanity";
import { SHOPIFY_STORE_DOMAIN } from "shopify/config";

type ShopifyDocument = { shopify?: { id?: string; productId?: string } };

function adminPath(type: string, document: ShopifyDocument): string | undefined {
  const { id, productId } = document.shopify ?? {};
  if (!id) return undefined;
  if (type === "collection") return `collections/${id}`;
  if (type === "product") return `products/${id}`;
  if (type === "productVariant" && productId) return `products/${productId}/variants/${id}`;
  return undefined;
}

export const ActionShopifyLink: DocumentActionComponent = ({ published, type }) => {
  const path = published && adminPath(type, published as ShopifyDocument);
  if (!path) return null;

  return {
    label: "View in Shopify",
    icon: EarthGlobeIcon,
    onHandle: () => {
      window.open(`https://${SHOPIFY_STORE_DOMAIN}/admin/${path}`, "_blank", "noopener");
    },
  };
};
