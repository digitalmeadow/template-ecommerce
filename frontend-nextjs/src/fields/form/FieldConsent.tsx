import type { ReactNode } from "react";
import { CONSENT_VALUE } from "@/lib/forms/constants";
import IconTick from "@/fields/form/IconTick";

interface Props {
  id: string;
  name: string;
  label: string;
  required: boolean;
  statement: ReactNode;
  errorId: string;
  invalid: boolean;
}

export default function FieldConsent({
  id,
  name,
  label,
  required,
  statement,
  errorId,
  invalid,
}: Props) {
  const statementId = `${id}-statement`;

  return (
    <div className="field-consent group grid grid-cols-[1fr_auto] gap-[var(--s20)] py-[var(--s12)]">
      {/* A sibling, not label content, so its links stay clickable; describedby carries it to AT. */}
      <div
        className="min-w-0 opacity-50 transition-opacity duration-[var(--transition-default-duration)] group-has-[input:checked]:opacity-100"
        id={statementId}
      >
        {statement}
      </div>

      <input
        className="peer pointer-events-none absolute m-0 appearance-none opacity-0"
        type="checkbox"
        id={id}
        name={name}
        value={CONSENT_VALUE}
        required={required}
        aria-describedby={`${statementId} ${errorId}`}
        aria-invalid={invalid || undefined}
      />
      <label
        className="shrink-0 cursor-pointer peer-focus-visible:[&_.box]:outline peer-focus-visible:[&_.box]:outline-offset-[var(--s4)] peer-checked:[&_.tick]:opacity-100"
        htmlFor={id}
        aria-label={label}
      >
        <span
          className="box flex h-[30px] w-[30px] items-center justify-center border border-current"
          aria-hidden="true"
        >
          <span className="tick aspect-[20/15] w-[18px] opacity-0 transition-opacity duration-[var(--transition-default-duration)]">
            <IconTick />
          </span>
        </span>
      </label>
    </div>
  );
}
