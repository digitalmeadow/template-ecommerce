import { z } from "astro/zod";
import { ACCEPTED_FILE_EXTENSIONS, ACCEPTED_FILE_TYPES, CONSENT_VALUE } from "@lib/forms/constants";

// Server-side validation for CMS-built forms: the same rules the browser applies, enforced
// where they can't be skipped. Errors are keyed by field name for the form's inline states.

export interface FormFieldDefinition {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options: string[];
}

export interface FormDefinition {
  title: string;
  fields: FormFieldDefinition[];
  terms: { name: string; label: string; required: boolean }[];
}

export type FormValue = string | string[] | File | File[];

const MAX_TEXT_LENGTH = 5_000;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

const REQUIRED_MESSAGE = "This field is required.";
const CHOICE_TYPES = ["select", "radioGroup", "checkboxGroup"];

const isAcceptedFile = (file: File) =>
  ACCEPTED_FILE_TYPES.includes(file.type) ||
  ACCEPTED_FILE_EXTENSIONS.some((extension) => file.name.toLowerCase().endsWith(extension));

const fileSchema = z
  .instanceof(File)
  .refine(isAcceptedFile, "Upload a PDF or Word document.")
  .refine((file) => file.size <= MAX_FILE_BYTES, "Files must be 10 MB or smaller.");

function fieldSchema({
  type,
  required,
  options,
}: FormFieldDefinition): z.ZodType<FormValue | undefined> {
  const text = z.string().trim().max(MAX_TEXT_LENGTH, "This answer is too long.");

  // The Studio requires options for choice fields; without them there's nothing to choose from.
  const isChoiceWithoutOptions = CHOICE_TYPES.includes(type) && options.length === 0;

  switch (isChoiceWithoutOptions ? "text" : type) {
    case "email": {
      const email = z.email("Enter a valid email address.");
      return required ? email : z.union([email, z.literal("")]).optional();
    }
    case "select":
    case "radioGroup": {
      const choice = z.enum(options as [string, ...string[]], "Choose one of the options.");
      return required ? choice : z.union([choice, z.literal("")]).optional();
    }
    case "checkboxGroup": {
      const choices = z.array(z.enum(options as [string, ...string[]], "Choose from the options."));
      return required ? choices.min(1, REQUIRED_MESSAGE) : choices;
    }
    case "file":
      return required ? fileSchema : fileSchema.optional();
    case "files": {
      const files = z.array(fileSchema);
      return required ? files.min(1, REQUIRED_MESSAGE) : files;
    }
    default:
      return required ? text.min(1, REQUIRED_MESSAGE) : text.optional();
  }
}

/** One value per field, in the shape its schema expects (arrays for multi-value fields). */
function readValue(form: FormData, { name, type }: FormFieldDefinition): FormValue | undefined {
  if (type === "checkboxGroup") return form.getAll(name).map(String);
  if (type === "files") {
    return form
      .getAll(name)
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  }
  const entry = form.get(name);
  if (entry instanceof File) return entry.size > 0 ? entry : undefined;
  return entry ?? undefined;
}

export type SubmissionResult =
  | { success: true; values: Record<string, FormValue | undefined> }
  | { success: false; errors: Record<string, string> };

/** Validates a submission against its form; the first problem per field is reported. */
export function validateSubmission(form: FormData, definition: FormDefinition): SubmissionResult {
  const shape: Record<string, z.ZodType> = {};
  const input: Record<string, unknown> = {};

  for (const field of definition.fields) {
    shape[field.name] = fieldSchema(field);
    input[field.name] = readValue(form, field);
  }
  for (const term of definition.terms) {
    const consent = z.literal(CONSENT_VALUE, "Please confirm to continue.");
    shape[term.name] = term.required ? consent : consent.optional();
    input[term.name] = form.get(term.name) ?? undefined;
  }

  const result = z.object(shape).safeParse(input);
  if (result.success) {
    return { success: true, values: result.data as Record<string, FormValue | undefined> };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const name = String(issue.path[0] ?? "");
    errors[name] ??= issue.message;
  }
  return { success: false, errors };
}
