"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { FormConsentFragment, FormFieldFragment } from "sanity-nextjs/generated/graphql";
import ButtonSubmit from "@/blocks/ButtonSubmit";
import FormField from "@/fields/FormField";
import FormTerm from "@/fields/FormTerm";
import { FORM_ENDPOINT, FORM_ID_FIELD_NAME, HONEYPOT_FIELD_NAME } from "@/lib/forms/constants";
import type { FormSubmissionResponse } from "@/lib/forms/types";
import { cn } from "@/lib/utils";

interface Props {
  formId: string;
  groups: { heading?: string | null; fields: FormFieldFragment[] }[];
  terms: { term: FormConsentFragment; statement: ReactNode }[];
  submitLabel: string;
  successMessage: ReactNode;
  groupHeadingTag: "h2" | "h3";
}

type Status = "submitting" | "success" | "error" | null;

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const FAILURE_MESSAGE = "Something went wrong. Please try again.";

// `required` on a checkbox only requires that one box, so groups check here.
function requiredGroupErrors(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {};
  form.querySelectorAll<HTMLElement>("[data-required-group]").forEach((group) => {
    if (group.querySelector("input:checked")) return;
    errors[group.dataset.groupName ?? ""] = `${group.dataset.groupLabel} is required.`;
  });
  return errors;
}

// Native constraint messages, shown inline under each field instead of browser bubbles.
function controlErrors(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {};
  form.querySelectorAll<Control>("input, select, textarea").forEach((control) => {
    if (control.validity.valid) return;
    errors[control.name] ??= control.validationMessage;
  });
  return errors;
}

// Without this a failed submit leaves focus on the button and the errors go unnoticed.
function focusFirstError(form: HTMLFormElement, errors: Record<string, string>) {
  const controls = Array.from(form.querySelectorAll<Control>("input, select, textarea"));
  controls.find((control) => errors[control.name])?.focus();
}

export default function FormClient({
  formId,
  groups,
  terms,
  submitLabel,
  successMessage,
  groupHeadingTag: GroupHeading,
}: Props) {
  const [status, setStatus] = useState<Status>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Every control starts empty, so only a form without required fields starts ready.
  const [isReady, setIsReady] = useState(
    () =>
      !groups.some((group) => group.fields.some((field) => field.required)) &&
      !terms.some(({ term }) => term.required),
  );

  const lastGroupIndex = groups.length - 1;

  // Matches `:invalid` rather than checkValidity(), which fires events while typing.
  function updateReady(form: HTMLFormElement) {
    setIsReady(
      !form.querySelector(":invalid") && Object.keys(requiredGroupErrors(form)).length === 0,
    );
  }

  function fail(text: string) {
    setStatus("error");
    setMessage(text);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    // Both run so every problem shows at once, not one category per submit.
    const clientErrors = { ...requiredGroupErrors(form), ...controlErrors(form) };
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      focusFirstError(form, clientErrors);
      return;
    }

    setStatus("submitting");
    setMessage("");

    const body = new FormData(form);
    body.append(FORM_ID_FIELD_NAME, formId);

    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", body });
      const result = (await response.json().catch(() => ({}))) as FormSubmissionResponse;

      if (!response.ok || result.ok === false) {
        if (result.errors) {
          setErrors(result.errors);
          focusFirstError(form, result.errors);
        }
        return fail(result.message ?? FAILURE_MESSAGE);
      }

      // Locked for the rest of this page view; the values stay visible behind it.
      setStatus("success");
    } catch {
      fail(FAILURE_MESSAGE);
    }
  }

  return (
    <div className="form flex flex-col gap-y-5" data-state={status ?? undefined}>
      <form
        className={cn(
          "groups flex flex-col gap-y-10 transition-opacity duration-(--duration-default) ease-out",
          status === "success" && "pointer-events-none opacity-(--opacity-disabled)",
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
              <GroupHeading className="g-heading-6 mb-4">{group.heading}</GroupHeading>
            )}

            <div className="grid grid-cols-2 gap-x-(--gutter) gap-y-6 mobile:grid-cols-1 [&>[data-width=full]]:col-span-full mobile:[&>[data-width=half]]:col-span-full">
              {group.fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  prefix={formId}
                  error={errors[field.name ?? ""]}
                />
              ))}

              {index === lastGroupIndex && (
                // Follows the trailing field: beside a half one, on its own row after a full one.
                <div className="self-end mobile:col-span-full [[data-width=full]+&]:col-span-full">
                  <ButtonSubmit
                    label={submitLabel}
                    state={status === "error" ? null : status}
                    mutedUntilReady
                    isReady={isReady}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {terms.length > 0 && (
          <div className="flex flex-col gap-y-3">
            {terms.map(({ term, statement }) => (
              <FormTerm
                key={term.name}
                term={term}
                statement={statement}
                prefix={formId}
                error={errors[term.name ?? ""]}
              />
            ))}
          </div>
        )}

        <div className="g-sr-only" aria-hidden="true">
          <label htmlFor={`${HONEYPOT_FIELD_NAME}-${formId}`}>Leave this field empty</label>
          <input
            id={`${HONEYPOT_FIELD_NAME}-${formId}`}
            name={HONEYPOT_FIELD_NAME}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>

      <div className="min-h-lh" aria-live="polite">
        <p className={cn(status === "error" && "text-error")}>{message}</p>
        <div hidden={status !== "success"}>{successMessage}</div>
      </div>
    </div>
  );
}
