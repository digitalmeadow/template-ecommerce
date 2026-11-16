import type { FormFieldFragment } from "sanity-nextjs/generated/graphql";
import FieldChoices from "@/fields/form/FieldChoices";
import FieldFile from "@/fields/form/FieldFile";
import FieldSelect from "@/fields/form/FieldSelect";
import FieldText from "@/fields/form/FieldText";
import FieldTextarea from "@/fields/form/FieldTextarea";
import FieldWrapper from "@/fields/form/FieldWrapper";

interface Props {
  field: FormFieldFragment;
  prefix: string;
  error?: string;
}

const SPECIAL_TYPES = ["textarea", "select", "file", "files", "checkboxGroup", "radioGroup"];

export default function FormField({ field, prefix, error }: Props) {
  const name = field.name ?? "";
  const label = field.label ?? "";
  const type = field.type ?? "text";
  const required = field.required ?? false;
  const placeholder = field.placeholder || label;
  const options = (field.options ?? []).filter((option): option is string => Boolean(option));
  const inputType = type === "email" || type === "tel" ? type : "text";

  const id = `${prefix}-${name}`;
  const errorId = `${id}-error`;
  const isInvalid = Boolean(error);

  // Lets browsers and password managers fill known fields (WCAG 1.3.5).
  function resolveAutoComplete(): string | undefined {
    if (type === "email") return "email";
    if (type === "tel") return "tel";

    const normalised = name.toLowerCase();
    if (normalised.includes("company") || normalised.includes("organisation"))
      return "organization";
    if (normalised.includes("name")) return "name";
    return undefined;
  }

  return (
    <FieldWrapper
      id={id}
      name={name}
      label={label}
      type={type}
      required={required}
      width={field.width ?? "full"}
      errorId={errorId}
      error={error}
    >
      {type === "textarea" && (
        <FieldTextarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          errorId={errorId}
          isInvalid={isInvalid}
        />
      )}

      {type === "select" && (
        <FieldSelect
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          options={options}
          errorId={errorId}
          isInvalid={isInvalid}
        />
      )}

      {(type === "file" || type === "files") && (
        <FieldFile
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          multiple={type === "files"}
          errorId={errorId}
          isInvalid={isInvalid}
        />
      )}

      {(type === "checkboxGroup" || type === "radioGroup") && (
        <FieldChoices
          id={id}
          name={name}
          label={label}
          type={type}
          required={required}
          options={options}
          isInvalid={isInvalid}
        />
      )}

      {!SPECIAL_TYPES.includes(type) && (
        <FieldText
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          errorId={errorId}
          isInvalid={isInvalid}
          autoComplete={resolveAutoComplete()}
        />
      )}
    </FieldWrapper>
  );
}
