interface Props {
  id: string;
  name: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  required: boolean;
  errorId: string;
  isInvalid: boolean;
  autoComplete?: string;
}

export default function FieldText({
  id,
  name,
  type,
  placeholder,
  required,
  errorId,
  isInvalid,
  autoComplete,
}: Props) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      aria-describedby={errorId}
      aria-invalid={isInvalid || undefined}
    />
  );
}
