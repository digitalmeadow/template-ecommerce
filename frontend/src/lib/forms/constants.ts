export const HONEYPOT_FIELD_NAME = "company-website";

export const FORM_ID_FIELD_NAME = "formId";

export const CONSENT_VALUE = "yes";

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Browsers sometimes report an empty MIME type for .docx, so the extension is the fallback.
export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"];

export const ACCEPTED_FILE_ATTR = [...ACCEPTED_FILE_TYPES, ...ACCEPTED_FILE_EXTENSIONS].join(",");
