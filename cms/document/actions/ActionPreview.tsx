// https://www.sanity.io/docs/document-actions
import EyeOpenIcon from "@sanity/icons/EyeOpen";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "frontend/config";
import { DocumentActionComponent, Slug } from "sanity";
import { PREVIEW_WEBSITE_URL } from "../../config";

type Previewable = { slug?: Slug; shopify?: { handle?: Slug } };

export const ActionPreview: DocumentActionComponent = ({ draft, published, type }) => {
  const document = (draft ?? published) as Previewable | null;
  const slug = document?.slug?.current ?? document?.shopify?.handle?.current;

  const pattern = SANITY_DOCUMENT_ROUTE_PATTERNS[type] || "/";
  const needsSlug = pattern.includes("[slug]");

  if (needsSlug && !slug) {
    return {
      label: "Preview",
      icon: EyeOpenIcon,
      disabled: true,
      title: "Add a slug before previewing.",
    };
  }

  const route = needsSlug && slug ? pattern.replace("[slug]", slug) : pattern;
  const url = new URL(route, PREVIEW_WEBSITE_URL);

  return {
    label: "Preview",
    icon: EyeOpenIcon,
    onHandle: () => {
      window.open(url);
    },
  };
};
