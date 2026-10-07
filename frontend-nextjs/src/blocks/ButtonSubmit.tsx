import { cn } from "@/lib/utils";
import IconArrow from "@/fields/form/IconArrow";

interface Props {
  label: string;
  labelSubmitting?: string;
  labelSuccess?: string;
  variant?: "outline" | "filled";
  state?: "submitting" | "success" | "error" | null;
  mutedUntilReady?: boolean;
  ready?: boolean;
  className?: string;
}

export default function ButtonSubmit({
  label,
  labelSubmitting = "Submitting",
  labelSuccess = "Submitted",
  variant = "outline",
  state,
  mutedUntilReady,
  ready,
  className,
}: Props) {
  const text =
    state === "submitting"
      ? labelSubmitting
      : state === "success"
        ? labelSuccess
        : label;

  return (
    <button
      className={cn(
        "button-submit flex cursor-pointer items-center justify-between gap-[var(--s16)] border border-current px-[var(--s20)] py-[var(--s16)] transition-opacity duration-[var(--transition-default-duration)]",
        // Border kept so the box still measures the same as a file control.
        variant === "filled" && "bg-accent border-accent text-background",
        mutedUntilReady && !ready && "opacity-50",
        state === "submitting" && "pointer-events-none opacity-50",
        className,
      )}
      type="submit"
      data-state={state ?? undefined}
      aria-disabled={state === "submitting" || undefined}
    >
      <span>{text}</span>
      <span className="h-[0.8em] w-[0.8em] shrink-0">
        <IconArrow />
      </span>
    </button>
  );
}
