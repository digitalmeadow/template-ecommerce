import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { muxInput } from "sanity-plugin-mux-input";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { GENERATED_DOCUMENT_TYPES, PREVIEW_WEBSITE_URL, SINGLETON_DOCUMENT_TYPES } from "./config";
import { resolveDocumentActions } from "./document/resolveDocumentActions";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE ?? "template-ecommerce",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({ structure }),
    // Side-by-side preview of the drafts site. No click-to-edit: overlays need GROQ content source maps.
    presentationTool({
      previewUrl: { initial: PREVIEW_WEBSITE_URL },
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
          !GENERATED_DOCUMENT_TYPES.includes(template.schemaType),
      ),
  },

  document: {
    actions: resolveDocumentActions,
  },
});
