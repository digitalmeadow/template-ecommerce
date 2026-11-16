const levels = [1, 2, 3, 4, 5, 6] as const;

// Heading tags and their class twins, which take the look without the tag.
export default function DemoHeadings() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {levels.map((level) => {
          const Heading = `h${level}` as const;
          return <Heading key={level}>Heading {level}</Heading>;
        })}
      </div>
      <div className="g-rule flex flex-col gap-5 pt-10">
        {levels.map((level) => (
          <p key={level} className={`g-heading-${level}`}>
            p.g-heading-{level}
          </p>
        ))}
      </div>
    </div>
  );
}
