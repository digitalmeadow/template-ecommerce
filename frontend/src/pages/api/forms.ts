export const prerender = false;

import type { APIRoute } from "astro";
import { loadBuildJson } from "@lib/buildAssets";
import { FORM_ID_FIELD_NAME, HONEYPOT_FIELD_NAME } from "@lib/forms/constants";
import { validateSubmission, type FormDefinition } from "@lib/forms/schema";
import { deliverFormSubmission } from "@lib/forms/delivery";
import type { FormSubmissionResponse } from "@lib/forms/types";
import { PRIVATE_CACHE_CONTROL } from "@lib/responses";

// CMS form submissions (multipart FormData + `formId`), validated against the form's fields.
// Answers `{ ok, message, errors }`; `errors` is keyed by field name for inline error states.
export const POST: APIRoute = async ({ request, url }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond({ ok: false, message: "This form couldn't be read. Please try again." }, 400);
  }

  // Bots fill the hidden field; tell them it worked and drop it.
  if (form.get(HONEYPOT_FIELD_NAME)) return respond({ ok: true });

  const definitions = await loadBuildJson<Record<string, FormDefinition>>("/forms.json", url);
  const formId = String(form.get(FORM_ID_FIELD_NAME) ?? "");
  const definition = definitions[formId];
  if (!definition) return respond({ ok: false, message: "This form no longer exists." }, 404);

  const result = validateSubmission(form, definition);
  if (!result.success) {
    return respond(
      { ok: false, message: "Please check the highlighted fields.", errors: result.errors },
      400,
    );
  }

  try {
    await deliverFormSubmission(formId, definition, result.values);
  } catch (error) {
    console.error(`Form "${definition.title}" delivery failed:`, error);
    return respond({ ok: false, message: "Something went wrong. Please try again." }, 502);
  }
  return respond({ ok: true });
};

function respond(body: FormSubmissionResponse, status = 200): Response {
  return Response.json(body, { status, headers: { "cache-control": PRIVATE_CACHE_CONTROL } });
}
