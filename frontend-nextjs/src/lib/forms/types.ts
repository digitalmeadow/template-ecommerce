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

// Posted as repeated keys, so they must be read with getAll().
export const MULTI_VALUE_TYPES = new Set<string>(["checkboxGroup", "files"]);

export const FILE_TYPES = new Set<string>(["file", "files"]);

export interface FormFieldDefinition {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string | null;
  options?: string[] | null;
  required?: boolean | null;
  width?: "full" | "half" | null;
}

export interface FormGroupDefinition {
  heading?: string | null;
  fields: FormFieldDefinition[];
}

export interface FormConsentDefinition {
  name: string;
  label: string;
  required?: boolean | null;
  statementRaw?: unknown;
}

export interface FormDefinition {
  groups: FormGroupDefinition[];
  terms?: FormConsentDefinition[] | null;
}

export const TERMS_GROUP = "Terms";

export type GroupedFormField = FormFieldDefinition & { group?: string };
