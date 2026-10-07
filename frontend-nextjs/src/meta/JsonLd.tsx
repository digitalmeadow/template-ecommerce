import type { JsonLdSchema } from "@/lib/sanity/structuredData";

interface Props {
  schema: JsonLdSchema | null | undefined;
}

export default function JsonLd({ schema }: Props) {
  if (!schema) return null;

  // CMS copy containing "</script>" would otherwise close the tag early.
  const serialised = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialised }}
    />
  );
}
