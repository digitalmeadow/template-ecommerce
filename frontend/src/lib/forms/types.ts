export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "checkboxGroup"
  | "radioGroup"
  | "consent"
  | "file"
  | "files";

// Posted as repeated keys, so an endpoint must read them with getAll().
export const MULTI_VALUE_TYPES = new Set<FormFieldType>(["checkboxGroup", "files"]);

// Optional JSON body an endpoint can return; `errors` is keyed by field name.
export interface FormSubmissionResponse {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
}
