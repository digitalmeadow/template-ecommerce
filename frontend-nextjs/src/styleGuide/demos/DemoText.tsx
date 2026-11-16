import { lorem } from "../fixtures/content";

const sizes = ["large", "medium", "regular", "small", "tiny"] as const;

export default function DemoText() {
  return (
    <div className="flex flex-col gap-10">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2.5">
          <p className="g-text-tiny text-text-muted">.g-text-{size}</p>
          <p className={`g-text-${size} max-w-160`}>{lorem.medium}</p>
        </div>
      ))}
      <div className="g-rule flex flex-wrap gap-5 pt-10">
        <span className="font-regular">Regular</span>
        <span className="font-bold">Bold</span>
        <span className="italic">Italic</span>
        <span className="uppercase">Uppercase</span>
        <span className="text-text-muted">Muted</span>
        <span className="text-text-subtle">Subtle</span>
        <span className="text-error">Error</span>
      </div>
    </div>
  );
}
