import type { StringRule } from "sanity";

export function validateSlugId(Rule: StringRule): StringRule {
  return Rule.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { name: "slug" }).error(
    "Lowercase letters, numbers, and hyphens only (e.g. my-section)",
  );
}
