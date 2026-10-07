import type { ReactNode } from "react";
import type { FormConsentDefinition } from "@/lib/forms/types";
import FieldWrapper from "@/fields/form/FieldWrapper";
import FieldConsent from "@/fields/form/FieldConsent";

interface Props {
  term: FormConsentDefinition;
  statement: ReactNode;
  prefix: string;
  error?: string;
}

export default function FormTerm({ term, statement, prefix, error }: Props) {
  const errorId = `${prefix}-${term.name}-error`;

  return (
    <FieldWrapper type="consent" errorId={errorId} error={error}>
      <FieldConsent
        id={`${prefix}-${term.name}`}
        name={term.name}
        label={term.label}
        required={term.required ?? false}
        statement={statement}
        errorId={errorId}
        invalid={Boolean(error)}
      />
    </FieldWrapper>
  );
}
