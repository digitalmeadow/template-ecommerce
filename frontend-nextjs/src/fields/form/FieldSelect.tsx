interface Props {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  options: string[];
  errorId: string;
  isInvalid: boolean;
}

export default function FieldSelect({
  id,
  name,
  placeholder,
  required,
  options,
  errorId,
  isInvalid,
}: Props) {
  return (
    <div className="g-select">
      <select
        id={id}
        name={name}
        required={required}
        aria-describedby={errorId}
        aria-invalid={isInvalid || undefined}
        defaultValue=""
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
