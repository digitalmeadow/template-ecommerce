import "server-only";
import { createClient } from "sanity-nextjs";
import { SANITY_API_VERSION } from "sanity-nextjs/config";

export const sanityWriteClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_EDITOR_API_TOKEN,
});
