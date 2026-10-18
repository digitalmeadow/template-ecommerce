import type { FormFragment } from "sanity-nextjs/generated/graphql";
import {
  TERMS_GROUP,
  type FormConsentDefinition,
  type FormDefinition,
  type FormFieldType,
  type FormGroupDefinition,
  type GroupedFormField,
} from "./types";

const FIELD_TYPES = new Set<string>([
  "text",
  "email",
  "tel",
  "textarea",
  "select",
  "checkboxGroup",
  "radioGroup",
  "file",
  "files",
]);

// Drops nameless fields and empty groups so renderers and validation see the same shape.
export function normaliseForm(form: FormFragment): FormDefinition {
  const groups: FormGroupDefinition[] = (form.groups ?? [])
    .map((group) => ({
      heading: group?.heading,
      fields: (group?.fields ?? []).flatMap((field) => {
        if (!field?.name) return [];
        const type = FIELD_TYPES.has(field.type ?? "") ? (field.type as FormFieldType) : "text";
        return {
          name: field.name,
          label: field.label ?? "",
          type,
          placeholder: field.placeholder,
          options: (field.options ?? []).filter((option): option is string => Boolean(option)),
          required: field.required,
          width: field.width === "half" ? ("half" as const) : ("full" as const),
        };
      }),
    }))
    .filter((group) => group.fields.length > 0);

  const terms: FormConsentDefinition[] = (form.terms ?? []).flatMap((term) =>
    term?.name
      ? {
          name: term.name,
          label: term.label ?? "",
          required: term.required,
          statementRaw: term.statementRaw,
        }
      : [],
  );

  return { groups, terms };
}

// The group heading rides along so the grouping survives into the submission record.
export function formFields(form: FormDefinition): GroupedFormField[] {
  const fields = form.groups.flatMap((group) =>
    group.fields.map((field) => ({
      ...field,
      group: group.heading ?? undefined,
    })),
  );

  const terms = (form.terms ?? []).map((term) => ({
    name: term.name,
    label: term.label,
    required: term.required,
    type: "consent" as const,
    group: TERMS_GROUP,
  }));

  return [...fields, ...terms];
}
