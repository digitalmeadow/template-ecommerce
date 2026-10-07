"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type {
  FormConsentDefinition,
  FormGroupDefinition,
} from "@/lib/forms/types";
import { FORM_ENDPOINT, HONEYPOT_FIELD_NAME } from "@/lib/forms/constants";
import { formFields } from "@/lib/forms/fields";
import {
  validateSubmission,
  validateTotalUploadSize,
} from "@/lib/forms/schema";
import { cn } from "@/lib/utils";
import FormField from "@/fields/FormField";
import FormTerm from "@/fields/FormTerm";
import ButtonSubmit from "@/blocks/ButtonSubmit";

interface Props {
  formId: string;
  groups: FormGroupDefinition[];
  terms: (FormConsentDefinition & { statement: ReactNode })[];
  submitLabel: string;
  successMessage: ReactNode;
  groupHeadingTag?: "h2" | "h3";
  className?: string;
}

type Status = "submitting" | "success" | "error" | null;

export default function FormClient({
  formId,
  groups,
  terms,
  submitLabel,
  successMessage,
  groupHeadingTag: GroupHeading = "h2",
  className,
}: Props) {
  const fields = formFields({ groups, terms });
  const [status, setStatus] = useState<Status>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Every control starts empty, so only a form without required fields starts ready.
  const [ready, setReady] = useState(() => !fields.some((f) => f.required));

  const lastGroupIndex = groups.length - 1;

  function updateReady(form: HTMLFormElement) {
    const pending = validateSubmission(fields, new FormData(form));
    setReady(Object.keys(pending).length === 0);
  }

  // Without this a failed submit leaves focus on the button and the errors go unnoticed.
  function focusFirstError(
    form: HTMLFormElement,
    fieldErrors: Record<string, string>,
  ) {
    const name = fields.find((field) => fieldErrors[field.name])?.name;
    if (!name) return;
    form.querySelector<HTMLElement>(`[name="${CSS.escape(name)}"]`)?.focus();
  }

  function fail(text: string) {
    setStatus("error");
    setMessage(text);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const body = new FormData(form);
    const fieldErrors = validateSubmission(fields, body);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setStatus(null);
      setMessage("");
      focusFirstError(form, fieldErrors);
      return;
    }

    const uploadError = validateTotalUploadSize(fields, body);
    if (uploadError) return fail(uploadError);

    // Bots that fill the honeypot get a silent success.
    if (body.get(HONEYPOT_FIELD_NAME)) {
      setStatus("success");
      return;
    }

    if (!FORM_ENDPOINT) {
      console.warn("FORM_ENDPOINT is not set; form submission skipped.");
      return fail("This form is not accepting submissions right now.");
    }

    body.append("formId", formId);
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", body });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
          errors?: Record<string, string>;
        } | null;

        if (result?.errors) {
          setErrors(result.errors);
          focusFirstError(form, result.errors);
        }
        return fail(result?.message ?? "Please check the highlighted fields.");
      }

      setStatus("success");
    } catch {
      fail("Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className={cn("form flex flex-col gap-y-[var(--s20)]", className)}
      data-form-id={formId}
      data-state={status ?? undefined}
    >
      {/* Locked once submitted; the values stay visible behind it. */}
      <form
        className={cn(
          "groups flex flex-col gap-y-[var(--s40)] transition-opacity duration-[var(--transition-default-duration)]",
          status === "success" && "pointer-events-none opacity-50",
        )}
        noValidate
        inert={status === "success"}
        onSubmit={handleSubmit}
        onInput={(event) => updateReady(event.currentTarget)}
        onChange={(event) => updateReady(event.currentTarget)}
      >
        {groups.map((group, index) => (
          <div className="group" key={index}>
            {group.heading && (
              <GroupHeading className="mb-[var(--s16)]">
                {group.heading}
              </GroupHeading>
            )}

            {/* Rows sit flush; each field draws its own top border, forming the dividers. */}
            <div className="grid grid-cols-2 gap-x-[var(--gutter)] max-[64rem]:grid-cols-1">
              {group.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  prefix={formId}
                  error={errors[field.name]}
                />
              ))}

              {index === lastGroupIndex && (
                // Beside a trailing half field, on its own row after a full one.
                <div className="flex flex-col gap-y-[var(--s20)] max-[64rem]:col-span-full [[data-width=full]+&]:col-span-full">
                  <ButtonSubmit
                    label={submitLabel}
                    variant="filled"
                    state={status}
                    mutedUntilReady
                    ready={ready}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {terms.length > 0 && (
          <div className="flex flex-col gap-y-[var(--s12)]">
            {terms.map(({ statement, ...term }) => (
              <FormTerm
                key={term.name}
                term={term}
                statement={statement}
                prefix={formId}
                error={errors[term.name]}
              />
            ))}
          </div>
        )}

        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor={`${HONEYPOT_FIELD_NAME}-${formId}`}>
            Leave this field empty
          </label>
          <input
            id={`${HONEYPOT_FIELD_NAME}-${formId}`}
            name={HONEYPOT_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>

      <div className="min-h-[1em]" aria-live="polite">
        {status === "error" && <p className="text-accent">{message}</p>}
        {status === "success" && successMessage}
      </div>
    </div>
  );
}
