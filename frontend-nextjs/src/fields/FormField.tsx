import type { FormFieldDefinition } from "@/lib/forms/types";
import FieldWrapper from "@/fields/form/FieldWrapper";
import FieldText from "@/fields/form/FieldText";
import FieldTextarea from "@/fields/form/FieldTextarea";
import FieldSelect from "@/fields/form/FieldSelect";
import FieldFile from "@/fields/form/FieldFile";
import FieldCheckboxGroup from "@/fields/form/FieldCheckboxGroup";
import FieldRadioGroup from "@/fields/form/FieldRadioGroup";

interface Props {
  field: FormFieldDefinition;
  prefix: string;
  error?: string;
}

// Lets browsers and password managers fill known fields (WCAG 1.3.5).
function resolveAutoComplete({ type, name }: FormFieldDefinition) {
  if (type === "email") return "email";
  if (type === "tel") return "tel";

  const normalised = name.toLowerCase();
  if (normalised.includes("company") || normalised.includes("organisation")) return "organization";
  if (normalised.includes("name")) return "name";
  return undefined;
}

export default function FormField({ field, prefix, error }: Props) {
  const { type } = field;
  const errorId = `${prefix}-${field.name}-error`;
  const placeholder = field.placeholder || field.label;
  const options = field.options ?? [];
  const shared = {
    id: `${prefix}-${field.name}`,
    name: field.name,
    label: field.label,
    required: field.required ?? false,
    errorId,
    invalid: Boolean(error),
  };

  return (
    <FieldWrapper type={type} width={field.width} errorId={errorId} error={error}>
      {type === "textarea" && <FieldTextarea {...shared} placeholder={placeholder} />}
      {type === "select" && <FieldSelect {...shared} placeholder={placeholder} options={options} />}
      {(type === "file" || type === "files") && (
        <FieldFile {...shared} placeholder={placeholder} multiple={type === "files"} />
      )}
      {type === "checkboxGroup" && <FieldCheckboxGroup {...shared} options={options} />}
      {type === "radioGroup" && <FieldRadioGroup {...shared} options={options} />}
      {(type === "text" || type === "email" || type === "tel") && (
        <FieldText
          {...shared}
          type={type}
          placeholder={placeholder}
          autoComplete={resolveAutoComplete(field)}
        />
      )}
    </FieldWrapper>
  );
}
