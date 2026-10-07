import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { structure } from "./structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { muxInput } from "sanity-plugin-mux-input";
import { media } from "sanity-plugin-media";
import resolveNewDocumentOptions from "./document/resolveNewDocumentOptions";
import resolveDocumentActions from "./document/resolveDocumentActions";

// From the root .env, symlinked in as cms/.env.
export default defineConfig({
  name: "default",
  title: process.env.SANITY_STUDIO_TITLE ?? "template-ecommerce",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    muxInput({ mp4_support: "standard" }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (previous, context) => resolveNewDocumentOptions(previous, context),
    actions: (previous, context) => resolveDocumentActions(previous, context),
  },
});
