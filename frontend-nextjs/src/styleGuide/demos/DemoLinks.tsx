import { Fragment } from "react";

const underlines = ["yellow", "orange", "green", "blue", "purple"] as const;

// Rest, then active (`data-active`): hover any of them for the highlighter stroke.
export default function DemoLinks() {
  return (
    <div className="flex flex-col gap-10">
      <p className="max-w-160 g-text-medium">
        Body copy with an{" "}
        <a className="g-text-link" href="#links">
          inline link
        </a>{" "}
        in the middle of a sentence.
      </p>

      <div className="g-grid-cols-3">
        <p className="g-text-tiny text-text-muted">Class</p>
        <p className="g-text-tiny text-text-muted">Rest</p>
        <p className="g-text-tiny text-text-muted">Active</p>
        {underlines.map((color) => (
          <Fragment key={color}>
            <code className="g-text-small">.g-text-link.g-underline-{color}</code>
            <a className={`g-text-link g-underline-${color}`} href="#links">
              Shop the range
            </a>
            <a className={`g-text-link g-underline-${color}`} href="#links" data-active>
              Shop the range
            </a>
          </Fragment>
        ))}
        <code className="g-text-small">.g-text-link-hover</code>
        <a className="g-text-link-hover" href="#links">
          Shop the range
        </a>
        <a className="g-text-link-hover" href="#links" aria-current="page">
          Shop the range
        </a>
      </div>
    </div>
  );
}
