interface Props {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  required: boolean;
  errorId: string;
  invalid: boolean;
  autoComplete?: string;
}

export default function FieldText({
  id,
  name,
  label,
  type,
  placeholder,
  required,
  errorId,
  invalid,
  autoComplete,
}: Props) {
  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      {/* Padding on the control, not the wrapper, so the whole row is a click target. */}
      <input
        className="field-text min-w-0 flex-1 cursor-text bg-transparent py-[var(--s20)] text-inherit placeholder:text-current placeholder:opacity-50 focus-visible:outline-none"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={errorId}
        aria-invalid={invalid || undefined}
      />
    </>
  );
}
