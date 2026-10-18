import { defineField } from "sanity";
import { validateSlugId } from "../../utils/validation";

export const sectionIdField = defineField({
  type: "string",
  name: "id",
  title: "Section ID",
  description: "Optional. Used as an anchor so links can scroll directly to this section.",
  validation: validateSlugId,
});
