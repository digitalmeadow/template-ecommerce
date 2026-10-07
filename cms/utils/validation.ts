import type { Rule, StringRule } from "sanity";

const SLUG_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function validateSlugId(Rule: StringRule) {
  return Rule.regex(SLUG_ID_PATTERN, { name: "slug" }).error(
    'Use lowercase letters, numbers and hyphens only, e.g. "our-team".',
  );
}

type MetaField = "title" | "description";

// `meta` is one shared type, so per-document requirements live here rather than in the type itself.
// Descriptions are never required — they fall back to the organisation description. Only a title
// has no last resort, so only `metaSettings` uses this.
export function requireMetaFields(rule: Rule, fields: MetaField[]) {
  return rule.custom((meta) => {
    const value = meta as Partial<Record<MetaField, string>> | undefined;
    const missing = fields.filter((field) => !value?.[field]);
    if (!missing.length) return true;
    return `Meta ${missing.join(" and ")} required — this page has nothing to fall back to.`;
  });
}

const LINK_TARGET_FIELDS = ["page", "url", "section", "email", "phone", "file"] as const;

// Target fields are hidden until a type is picked, so a typeless link shows as empty in the Studio
// and renders nothing — treat it as empty however much stale data it carries.
export function isEmptyLink(link: unknown) {
  if (!link || typeof link !== "object") return true;
  const record = link as Record<string, unknown>;
  if (!record.type) return true;
  return LINK_TARGET_FIELDS.every((field) => !record[field]);
}

// Sanity validates an optional object's fields as soon as the object exists, and a half-filled or
// initial-value-seeded button counts as existing. Treat one with nothing in it as unused.
export function isEmptyButton(button: unknown) {
  if (!button || typeof button !== "object") return true;
  const { label, link } = button as { label?: unknown; link?: unknown };
  return !label && isEmptyLink(link);
}

// Every media object is seeded with `type: "image"` at document creation, so an optional media
// field reads as existing before anyone touches it — and its inner "Image required" check fires on
// a field nobody filled in. Judge media by its payload, not its presence.
export function isEmptyMedia(media: unknown) {
  if (!media || typeof media !== "object") return true;
  const { image, video, vimeo } = media as {
    image?: { asset?: unknown };
    video?: { asset?: unknown };
    vimeo?: { url?: unknown };
  };
  return !image?.asset && !video?.asset && !vimeo?.url;
}
