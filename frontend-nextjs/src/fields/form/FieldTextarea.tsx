interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  errorId: string;
  invalid: boolean;
}

export default function FieldTextarea({
  id,
  name,
  label,
  placeholder,
  required,
  errorId,
  invalid,
}: Props) {
  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="field-textarea min-w-0 flex-1 cursor-text resize-y bg-transparent py-[var(--s20)] text-inherit placeholder:text-current placeholder:opacity-50 focus-visible:outline-none"
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={4}
        aria-describedby={errorId}
        aria-invalid={invalid || undefined}
      />
    </>
  );
}
