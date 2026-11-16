interface Props {
  id: string;
  name: string;
  label: string;
  type: "checkboxGroup" | "radioGroup";
  required: boolean;
  options: string[];
  isInvalid: boolean;
}

// One component for radio and checkbox groups: they differ only in input type and validation.
export default function FieldChoices({
  id,
  name,
  label,
  type,
  required,
  options,
  isInvalid,
}: Props) {
  const inputType = type === "checkboxGroup" ? "checkbox" : "radio";

  return (
    <div
      className="grid gap-2.5"
      role={inputType === "radio" ? "radiogroup" : undefined}
      data-required-group={inputType === "checkbox" && required ? "" : undefined}
      data-group-name={name}
      data-group-label={label}
      aria-invalid={isInvalid || undefined}
    >
      {options.map((option, index) => (
        <label className="g-form-choice" htmlFor={`${id}-${index}`} key={option}>
          <input
            id={`${id}-${index}`}
            type={inputType}
            name={name}
            value={option}
            required={inputType === "radio" && required}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
