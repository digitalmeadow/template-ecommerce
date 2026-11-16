import type {
  FormConsentFragment,
  FormFieldFragment,
  FormGroupFragment,
  SectionFormFragment,
} from "sanity-nextjs/generated/graphql";
import FormClient from "@/fields/form/FormClient";
import PortableText from "@/fields/PortableText";

interface Props {
  section: SectionFormFragment;
}

export default function SectionForm({ section }: Props) {
  const form = section.form;
  const formId = form?._id;
  if (!form || !formId) return null;

  const groups = (form.groups ?? [])
    .filter((group): group is FormGroupFragment => Boolean(group))
    .map((group) => ({
      heading: group.heading,
      fields: (group.fields ?? []).filter((field): field is FormFieldFragment =>
        Boolean(field?.name),
      ),
    }))
    .filter((group) => group.fields.length > 0);

  const terms = (form.terms ?? [])
    .filter((term): term is FormConsentFragment => Boolean(term?.name))
    .map((term) => ({ term, statement: <PortableText value={term.statementRaw} /> }));

  return (
    <section
      data-color-scheme={section.colorScheme ?? undefined}
      className="section-form g-page-margin g-section-lg"
      id={section.id ?? undefined}
    >
      {section.heading && <h2 className="g-heading-4 mb-20">{section.heading}</h2>}

      <div className="ml-[calc(8*var(--column)+8*var(--gutter))] mobile:ml-0">
        <FormClient
          formId={formId}
          groups={groups}
          terms={terms}
          submitLabel={form.submitLabel ?? "Submit"}
          successMessage={<PortableText value={form.successMessageRaw} />}
          // Group headings sit under the section heading when there is one; otherwise they'd skip a level.
          groupHeadingTag={section.heading ? "h3" : "h2"}
        />
      </div>
    </section>
  );
}
