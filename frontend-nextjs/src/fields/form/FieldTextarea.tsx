interface Props {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  errorId: string;
  isInvalid: boolean;
}

export default function FieldTextarea({
  id,
  name,
  placeholder,
  required,
  errorId,
  isInvalid,
}: Props) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      required={required}
      aria-describedby={errorId}
      aria-invalid={isInvalid || undefined}
      rows={4}
    />
  );
}
