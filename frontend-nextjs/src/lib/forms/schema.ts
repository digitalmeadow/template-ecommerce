import {
  ACCEPTED_FILE_EXTENSIONS,
  ACCEPTED_FILE_TYPES,
  CONSENT_VALUE,
  MAX_FILE_BYTES,
  MAX_FILE_MB,
  MAX_FILES,
  MAX_TOTAL_UPLOAD_BYTES,
  MAX_TOTAL_UPLOAD_MB,
} from "./constants";
import { FILE_TYPES, type FormFieldDefinition } from "./types";

const PHONE_PATTERN = /^\+?[0-9\s\-()]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = FormDataEntryValue[];

// Untouched inputs all arrive as present-but-empty.
function filled(values: Values) {
  return values.filter((value) =>
    typeof value === "string" ? value.trim() !== "" : value.size > 0,
  );
}

// Some browsers report an empty MIME type for .docx, so fall back to the extension.
function isAcceptedFile(file: File) {
  const name = file.name.toLowerCase();
  return (
    ACCEPTED_FILE_TYPES.includes(file.type) ||
    ACCEPTED_FILE_EXTENSIONS.some((extension) => name.endsWith(extension))
  );
}

function formatError(field: FormFieldDefinition, values: Values) {
  const { label, type } = field;
  const options = field.options ?? [];
  const strings = values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim());
  const files = values.filter((value): value is File => value instanceof File);

  switch (type) {
    case "file":
    case "files":
      if (strings.length) return `${label} must be a file.`;
      if (type === "files" && files.length > MAX_FILES)
        return `${label} accepts at most ${MAX_FILES} files.`;
      if (!files.every(isAcceptedFile)) return `${label} must be a PDF or Word document.`;
      if (files.some((file) => file.size > MAX_FILE_BYTES))
        return `${label} must be smaller than ${MAX_FILE_MB}MB.`;
      return null;
    case "checkboxGroup":
      return strings.every((value) => options.includes(value))
        ? null
        : `Select a valid option for ${label}.`;
    case "consent":
      return strings[0] === CONSENT_VALUE ? null : `${label} must be accepted.`;
    case "email":
      return EMAIL_PATTERN.test(strings[0]) ? null : `${label} must be a valid email address.`;
    case "tel":
      return PHONE_PATTERN.test(strings[0]) ? null : `${label} must be a valid phone number.`;
    case "select":
    case "radioGroup":
      return options.includes(strings[0]) ? null : `Select an option for ${label}.`;
    default:
      return null;
  }
}

// Blank is checked first, so a required field reports "required", not a format error.
export function validateSubmission(fields: FormFieldDefinition[], data: FormData) {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const values = filled(data.getAll(field.name));

    if (values.length === 0) {
      if (field.required) errors[field.name] = `${field.label} is required.`;
      continue;
    }

    const error = formatError(field, values);
    if (error) errors[field.name] = error;
  }

  return errors;
}

// Per-file limits can still add up past what the endpoint accepts.
export function validateTotalUploadSize(fields: FormFieldDefinition[], data: FormData) {
  const total = fields
    .filter((field) => FILE_TYPES.has(field.type))
    .flatMap((field) => data.getAll(field.name))
    .reduce((sum, value) => sum + (value instanceof File ? value.size : 0), 0);

  if (total <= MAX_TOTAL_UPLOAD_BYTES) return null;
  return `Attachments must total less than ${MAX_TOTAL_UPLOAD_MB}MB.`;
}
