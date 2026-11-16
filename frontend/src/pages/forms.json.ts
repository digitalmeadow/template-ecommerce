import type { APIRoute } from "astro";
import { sanityClient } from "sanity/client";
import { formsQuery } from "sanity/queries/form";
import type { FormDefinition } from "@lib/forms/schema";

export const prerender = true;

// Every form's fields, built once per deploy for /api/forms to validate against without a
// metered Sanity request per submission.
export const GET: APIRoute = async () => {
  const { allForm } = await sanityClient.request(formsQuery);
  const definitions: Record<string, FormDefinition> = {};

  for (const form of allForm) {
    if (!form._id) continue;
    definitions[form._id] = {
      title: form.title ?? "",
      fields: (form.groups ?? [])
        .flatMap((group) => group?.fields ?? [])
        .flatMap((field) =>
          field?.name && field.type
            ? [
                {
                  name: field.name,
                  label: field.label ?? field.name,
                  type: field.type,
                  required: Boolean(field.required),
                  options: (field.options ?? []).filter((option): option is string =>
                    Boolean(option),
                  ),
                },
              ]
            : [],
        ),
      terms: (form.terms ?? []).flatMap((term) =>
        term?.name
          ? [{ name: term.name, label: term.label ?? term.name, required: Boolean(term.required) }]
          : [],
      ),
    };
  }

  return Response.json(definitions);
};
