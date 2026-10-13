import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { structure } from "./structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { muxInput } from "sanity-plugin-mux-input";
import { media } from "sanity-plugin-media";
import resolveNewDocumentOptions from "./document/resolveNewDocumentOptions";
import resolveDocumentActions from "./document/resolveDocumentActions";
import { locations } from "./presentation/locations";
import { PREVIEW_WEBSITE_URL, SHOPIFY_DOCUMENT_TYPES, SINGLETON_DOCUMENT_TYPES } from "./config";

// From the root .env, symlinked in as cms/.env.
export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE ?? "template-ecommerce",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    // Side-by-side preview of the drafts site. No click-to-edit: overlays need GROQ content source maps.
    presentationTool({
      previewUrl: { initial: PREVIEW_WEBSITE_URL },
      resolve: { locations },
    }),
    muxInput({ mp4_support: "standard" }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Removing the templates hides these from every "Create" menu, not just the structure's.
    templates: (templates) =>
      templates.filter(
        (template) =>
          !SINGLETON_DOCUMENT_TYPES.includes(template.schemaType) &&
          !SHOPIFY_DOCUMENT_TYPES.includes(template.schemaType),
      ),
  },

  document: {
    newDocumentOptions: (previous, context) => resolveNewDocumentOptions(previous, context),
    actions: (previous, context) => resolveDocumentActions(previous, context),
  },
});
