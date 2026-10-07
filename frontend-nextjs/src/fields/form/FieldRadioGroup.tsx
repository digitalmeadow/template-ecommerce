import IconTick from "@/fields/form/IconTick";

interface Props {
  id: string;
  name: string;
  label: string;
  required: boolean;
  options: string[];
  errorId: string;
  invalid: boolean;
}

export default function FieldRadioGroup({
  id,
  name,
  label,
  required,
  options,
  errorId,
  invalid,
}: Props) {
  const labelId = `${id}-label`;

  return (
    <div
      className="field-radio-group flex flex-wrap items-center gap-x-[var(--s20)] gap-y-[var(--s8)] py-[var(--s20)]"
      role="radiogroup"
      aria-labelledby={labelId}
      aria-describedby={errorId}
      aria-required={required || undefined}
      aria-invalid={invalid || undefined}
    >
      <span className="mr-auto" id={labelId}>
        {label}
      </span>

      {options.map((option, index) => (
        <span key={option}>
          <input
            className="peer pointer-events-none absolute m-0 appearance-none opacity-0"
            type="radio"
            id={`${id}-${index}`}
            name={name}
            value={option}
            required={required}
          />
          <label
            className="inline-flex cursor-pointer items-center gap-[var(--s8)] leading-[1.1] opacity-50 transition-opacity duration-[var(--transition-default-duration)] peer-checked:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-offset-[var(--s4)] hover:opacity-100 peer-checked:[&_.tick]:opacity-100"
            htmlFor={`${id}-${index}`}
          >
            {option}
            <span
              className="flex h-[30px] w-[30px] shrink-0 items-center justify-center border border-current"
              aria-hidden="true"
            >
              <span className="tick aspect-[20/15] w-[18px] opacity-0 transition-opacity duration-[var(--transition-default-duration)]">
                <IconTick />
              </span>
            </span>
          </label>
        </span>
      ))}
    </div>
  );
}
