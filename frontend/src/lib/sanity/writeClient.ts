import { SANITY_DATASET, SANITY_PROJECT_ID } from "astro:env/client";
import { SANITY_EDITOR_API_TOKEN } from "astro:env/server";
import { createClient } from "sanity";
import { SANITY_API_VERSION } from "sanity/config";

export const sanityWriteClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: SANITY_EDITOR_API_TOKEN,
});
