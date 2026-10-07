import type { SectionFormFragment } from "sanity-nextjs/generated/graphql";
import { normaliseForm } from "@/lib/forms/fields";
import PortableText from "@/fields/PortableText";
import FormClient from "@/fields/form/FormClient";

interface Props {
  sectionData: SectionFormFragment;
}

export default function SectionForm({ sectionData }: Props) {
  const form = sectionData.form;
  if (!form?._id) return null;

  const { groups, terms } = normaliseForm(form);

  return (
    <section
      className="section-form mt-[var(--s120)] pb-[var(--s200)]"
      id={sectionData.id ?? undefined}
    >
      <div className="u-container">
        {sectionData.heading && (
          <h2 className="text-muted mb-[100px] max-[64rem]:mb-[var(--s80)]">
            {sectionData.heading}
          </h2>
        )}

        <FormClient
          className="text-foreground ml-[calc(6*var(--column)+6*var(--gutter))] max-[64rem]:ml-0"
          formId={form._id}
          groups={groups}
          terms={(terms ?? []).map((term) => ({
            ...term,
            statementRaw: undefined,
            statement: <PortableText value={term.statementRaw} />,
          }))}
          submitLabel={form.submitLabel ?? "Submit"}
          successMessage={<PortableText value={form.successMessageRaw} />}
          // Group headings sit under the section heading when there is one.
          groupHeadingTag={sectionData.heading ? "h3" : "h2"}
        />
      </div>
    </section>
  );
}
