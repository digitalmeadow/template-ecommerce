export const HONEYPOT_FIELD_NAME = "company-website";

export const CONSENT_VALUE = "yes";

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Browsers sometimes report an empty MIME type for .docx, so the extension is the fallback.
export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"];

export const ACCEPTED_FILE_ATTR = [...ACCEPTED_FILE_TYPES, ...ACCEPTED_FILE_EXTENSIONS].join(",");

// Serverless request bodies often cap around 6MB, so the whole multipart POST must fit under that.
export const MAX_FILE_MB = 4;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

export const MAX_FILES = 5;

export const MAX_TOTAL_UPLOAD_MB = 4;
export const MAX_TOTAL_UPLOAD_BYTES = MAX_TOTAL_UPLOAD_MB * 1024 * 1024;
