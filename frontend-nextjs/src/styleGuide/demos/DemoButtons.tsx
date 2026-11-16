// Each button at rest, then disabled.
export default function DemoButtons() {
  return (
    <div className="flex flex-col gap-10">
      {[false, true].map((isDisabled) => (
        <div key={String(isDisabled)} className="flex flex-wrap items-center gap-5">
          <button className="g-button" type="button" disabled={isDisabled}>
            Add to cart
          </button>
          <button className="g-button-secondary" type="button" disabled={isDisabled}>
            View details
          </button>
          <button className="g-button-icon" type="button" aria-label="Next" disabled={isDisabled}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
