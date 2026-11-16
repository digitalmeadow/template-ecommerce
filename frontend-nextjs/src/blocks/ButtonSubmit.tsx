import { cn } from "@/lib/utils";

interface Props {
  label: string;
  labelSubmitting?: string;
  labelSuccess?: string;
  state?: "submitting" | "success" | null;
  /** Dimmed until `isReady` (every required field filled). */
  mutedUntilReady?: boolean;
  isReady?: boolean;
  className?: string;
}

export default function ButtonSubmit({
  label,
  labelSubmitting = "Submitting",
  labelSuccess = "Submitted",
  state,
  mutedUntilReady,
  isReady,
  className,
}: Props) {
  const text =
    state === "submitting" ? labelSubmitting : state === "success" ? labelSuccess : label;

  return (
    <button
      className={cn(
        "button-submit g-button justify-center transition-[background-color,color,opacity] duration-[var(--duration-default)] ease-out",
        (state === "submitting" || (mutedUntilReady && !isReady)) && "opacity-(--opacity-disabled)",
        state === "submitting" && "pointer-events-none",
        className,
      )}
      type="submit"
      data-state={state ?? undefined}
      aria-disabled={state === "submitting" || undefined}
    >
      {text}
    </button>
  );
}
