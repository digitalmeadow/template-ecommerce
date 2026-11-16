import type { ReactNode } from "react";
import type { FormConsentFragment } from "sanity-nextjs/generated/graphql";
import FieldConsent from "@/fields/form/FieldConsent";
import FieldWrapper from "@/fields/form/FieldWrapper";

interface Props {
  term: FormConsentFragment;
  /** The rendered statementRaw: PortableText is server-only. */
  statement: ReactNode;
  prefix: string;
  error?: string;
}

export default function FormTerm({ term, statement, prefix, error }: Props) {
  const name = term.name ?? "";
  const errorId = `${prefix}-${name}-error`;

  return (
    <FieldWrapper
      id={`${prefix}-${name}`}
      name={name}
      label={term.label ?? ""}
      type="consent"
      errorId={errorId}
      error={error}
    >
      <FieldConsent
        id={`${prefix}-${name}`}
        name={name}
        label={term.label ?? ""}
        required={term.required ?? false}
        statement={statement}
        errorId={errorId}
        isInvalid={Boolean(error)}
      />
    </FieldWrapper>
  );
}
