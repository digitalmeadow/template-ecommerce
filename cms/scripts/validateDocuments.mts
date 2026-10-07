// Runs the Studio's own validator outside the Studio and prints the failing path for every marker —
// the Studio's validation panel often shows a bare "Required" with no usable path.
//
//   pnpm --filter cms validate-documents [documentId]
//
// Omit the id to sweep the whole dataset (drafts included).
import { createSchema, validateDocument, type Workspace } from "sanity";
import { schemaTypes } from "../schemas";

const g = globalThis as unknown as Record<string, unknown>;
g.requestIdleCallback ??= (cb: () => void) => setTimeout(cb, 0);
g.cancelIdleCallback ??= (id: number) => clearTimeout(id);

const PROJECT = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET ?? "production";
const TOKEN = process.env.SANITY_VIEWER_API_TOKEN;

async function fetchDocument(id: string) {
  const url = `https://${PROJECT}.api.sanity.io/v2021-06-07/data/doc/${DATASET}/${encodeURIComponent(id)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const body = (await response.json()) as { documents?: Record<string, unknown>[] };
  return body.documents?.[0];
}

// Plugin-provided types aren't in schemaTypes; stubbed so the schema compiles at all.
const pluginTypes = [
  { name: "mux.videoAsset", type: "document", fields: [{ name: "playbackId", type: "string" }] },
  {
    name: "mux.video",
    type: "object",
    fields: [{ name: "asset", type: "reference", to: [{ type: "mux.videoAsset" }] }],
  },
];

const schema = createSchema({ name: "default", types: [...schemaTypes, ...pluginTypes] });

const workspace = {
  schema,
  getClient: () => {
    throw new Error("getClient not available in this harness");
  },
  i18n: undefined,
} as unknown as Workspace;

async function fetchAll() {
  const query = encodeURIComponent(
    '*[!(_id in path("_.**")) && !(_type in ["sanity.imageAsset", "sanity.fileAsset", "mux.videoAsset"])]',
  );
  const url = `https://${PROJECT}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${query}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const body = (await response.json()) as { result?: Record<string, unknown>[] };
  return body.result ?? [];
}

const id = process.argv[2];
const documents = id ? [await fetchDocument(id)].filter(Boolean) : await fetchAll();

for (const document of documents as Record<string, unknown>[]) {
  const markers = (
    await validateDocument({
      document: document as never,
      workspace,
      environment: "studio",
      getDocumentExists: async () => true,
    })
  ).filter((marker) => !String(marker.message).includes("getClient not available"));

  if (!markers.length) continue;

  console.log(`\n${document._type} ${document._id} — ${markers.length} marker(s)`);
  for (const marker of markers) {
    const path = marker.path
      .map((seg) =>
        typeof seg === "object" && seg !== null && "_key" in seg
          ? `[_key=${seg._key}]`
          : String(seg),
      )
      .join(".");
    console.log(`  [${marker.level}] ${path || "(root)"} — ${marker.message}`);
  }
}
console.log(`\nvalidated ${documents.length} documents`);
