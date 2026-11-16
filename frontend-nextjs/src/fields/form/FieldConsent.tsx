import type { ReactNode } from "react";
import { CONSENT_VALUE } from "@/lib/forms/constants";

interface Props {
  id: string;
  name: string;
  label: string;
  required: boolean;
  statement: ReactNode;
  errorId: string;
  isInvalid: boolean;
}

export default function FieldConsent({
  id,
  name,
  label,
  required,
  statement,
  errorId,
  isInvalid,
}: Props) {
  const statementId = `${id}-statement`;

  return (
    <div className="g-form-choice">
      {/* Not wrapped in a <label>: the statement is block content with links of its own. */}
      <input
        type="checkbox"
        id={id}
        name={name}
        value={CONSENT_VALUE}
        required={required}
        aria-label={label}
        aria-describedby={`${statementId} ${errorId}`}
        aria-invalid={isInvalid || undefined}
      />
      <div className="g-text-small" id={statementId}>
        {statement}
      </div>
    </div>
  );
}
