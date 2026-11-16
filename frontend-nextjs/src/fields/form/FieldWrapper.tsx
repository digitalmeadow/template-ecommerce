import type { ReactNode } from "react";

interface Props {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  width?: string;
  errorId: string;
  error?: string;
  children: ReactNode;
}

export default function FieldWrapper({
  id,
  name,
  label,
  type,
  required = false,
  width = "full",
  errorId,
  error,
  children,
}: Props) {
  // Groups of choices are named by a legend; consent carries its statement instead of a label.
  const isGroup = type === "checkboxGroup" || type === "radioGroup";
  const isConsent = type === "consent";
  const Tag = isGroup ? "fieldset" : "div";
  const requiredMark = required && (
    <span className="ml-[0.125em]" aria-hidden="true">
      *
    </span>
  );

  return (
    <Tag
      className="g-form-field"
      data-width={width}
      data-type={type}
      aria-describedby={isGroup ? errorId : undefined}
    >
      {isGroup && (
        <legend className="font-bold">
          {label}
          {requiredMark}
        </legend>
      )}
      {!isGroup && !isConsent && (
        <label className="font-bold" htmlFor={id}>
          {label}
          {requiredMark}
        </label>
      )}
      {children}
      <p
        className="g-form-error g-text-small empty:hidden"
        id={errorId}
        data-error-for={name}
        aria-live="polite"
      >
        {error}
      </p>
    </Tag>
  );
}
