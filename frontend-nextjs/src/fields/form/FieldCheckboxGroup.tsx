import { Fragment } from "react";

interface Props {
  id: string;
  name: string;
  label: string;
  required: boolean;
  options: string[];
  errorId: string;
  invalid: boolean;
}

export default function FieldCheckboxGroup({
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
      className="field-checkbox-group py-[var(--s20)]"
      role="group"
      aria-labelledby={labelId}
      aria-describedby={errorId}
      data-required={required || undefined}
      data-invalid={invalid || undefined}
    >
      <span className="mb-[var(--s8)] block opacity-50" id={labelId}>
        {label}
      </span>

      <div className="text-balance">
        {options.map((option, index) => (
          <Fragment key={option}>
            {index > 0 && (
              <>
                <span
                  className="mx-[0.25em] opacity-50 max-[64rem]:mx-[0.125em]"
                  aria-hidden="true"
                >
                  /
                </span>
                {"​"}
              </>
            )}
            <span>
              <input
                className="peer pointer-events-none absolute m-0 appearance-none opacity-0"
                type="checkbox"
                id={`${id}-${index}`}
                name={name}
                value={option}
              />
              <label
                className="peer-checked:text-accent cursor-pointer leading-[1.1] opacity-50 transition-[color,opacity] duration-[var(--transition-default-duration)] peer-checked:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-offset-[var(--s4)] hover:opacity-100"
                htmlFor={`${id}-${index}`}
              >
                {option}
              </label>
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
