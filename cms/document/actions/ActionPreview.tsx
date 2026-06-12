// https://www.sanity.io/docs/document-actions
import { EyeOpenIcon } from "@sanity/icons";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "frontend/config";
import { DocumentActionComponent, Slug } from "sanity";
import { PREVIEW_WEBSITE_URL } from "../../config";

export const ActionPreview: DocumentActionComponent = ({ draft, type }) => {
  const slug = (draft?.slug as Slug)?.current;

  let route = SANITY_DOCUMENT_ROUTE_PATTERNS[type] || "/";
  route = route.includes("[slug]") ? route.replace("[slug]", slug) : route;
  const url = new URL(route, PREVIEW_WEBSITE_URL);

  return {
    label: "Preview",
    icon: EyeOpenIcon,
    onHandle: () => {
      window.open(url);
    },
  };
};
