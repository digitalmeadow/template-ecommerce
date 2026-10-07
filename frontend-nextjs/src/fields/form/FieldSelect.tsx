interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
  errorId: string;
  invalid: boolean;
}

export default function FieldSelect({
  id,
  name,
  label,
  placeholder,
  required,
  options,
  errorId,
  invalid,
}: Props) {
  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <select
        className="field-select min-w-0 flex-1 cursor-pointer bg-transparent py-[var(--s20)] text-inherit focus-visible:outline-none has-[option[value='']:checked]:opacity-50"
        id={id}
        name={name}
        required={required}
        defaultValue=""
        aria-describedby={errorId}
        aria-invalid={invalid || undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
