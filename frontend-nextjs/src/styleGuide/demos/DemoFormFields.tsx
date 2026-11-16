import FormField from "@/fields/FormField";
import { formFields } from "../fixtures/content";

// Every field type in the two-column layout SectionForm gives them.
export default function DemoFormFields() {
  return (
    <div className="demo-form-fields grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6 mobile:grid-cols-1 [&>[data-width=full]]:col-span-full">
      {Object.values(formFields).map((field) => (
        <FormField key={field._key} field={field} prefix="sg-fields" />
      ))}
    </div>
  );
}
