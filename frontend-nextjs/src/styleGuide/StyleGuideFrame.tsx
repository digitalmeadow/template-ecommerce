import SectionsRenderer from "@/sections/SectionsRenderer";
import type { Entry, Scheme } from "./entry";

interface Props {
  entry: Entry;
  scheme: Scheme;
}

// One entry on a bare page, loaded by the style guide's frames (or opened directly).
export default function StyleGuideFrame({ entry, scheme }: Props) {
  const { render } = entry;

  return (
    <>
      {scheme !== "light" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.colorScheme=${JSON.stringify(scheme)}`,
          }}
        />
      )}
      {"section" in render && <SectionsRenderer sections={[render.section]} />}
      {"component" in render &&
        (render.padded ? (
          <div className="g-section-md">
            <div className="g-page-margin">
              <render.component {...render.props} />
            </div>
          </div>
        ) : (
          <render.component {...render.props} />
        ))}
    </>
  );
}
