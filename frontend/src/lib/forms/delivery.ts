import type { FormDefinition, FormValue } from "@lib/forms/schema";
import { sanityWriteClient } from "@lib/sanity/writeClient";

const isFile = (value: unknown): value is File => value instanceof File;

/**
 * Saves a validated submission as a `formSubmission` document (Studio → Library → Form
 * Submissions). Answers keep the labels the form had when sent; uploads become Sanity file assets.
 */
export async function deliverFormSubmission(
  formId: string,
  definition: FormDefinition,
  values: Record<string, FormValue | undefined>,
): Promise<void> {
  const uploads = Object.values(values).flatMap((value) =>
    Array.isArray(value) ? value.filter(isFile) : isFile(value) ? [value] : [],
  );
  const assets = await Promise.all(
    uploads.map((file) => sanityWriteClient.assets.upload("file", file, { filename: file.name })),
  );

  const answers = [...definition.fields, ...definition.terms].flatMap(({ name, label }) => {
    const value = values[name];
    if (value === undefined || value === "" || isFile(value)) return [];
    if (Array.isArray(value)) {
      const text = value.filter((item): item is string => typeof item === "string").join(", ");
      return text ? [{ _key: name, _type: "formAnswer", name, label, value: text }] : [];
    }
    return [{ _key: name, _type: "formAnswer", name, label, value }];
  });

  await sanityWriteClient.create({
    _type: "formSubmission",
    form: { _type: "reference", _ref: formId },
    submittedAt: new Date().toISOString(),
    answers,
    files: assets.map((asset) => ({
      _key: asset._id,
      _type: "file",
      asset: { _type: "reference", _ref: asset._id },
    })),
  });
}
