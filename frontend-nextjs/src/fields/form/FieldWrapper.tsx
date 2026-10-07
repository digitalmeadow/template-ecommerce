import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  type: string;
  width?: "full" | "half" | null;
  errorId: string;
  error?: string;
  children: ReactNode;
}

// Group types lay out their own label, so the single-line control styling would fight them.
const GROUP_TYPES = ["checkboxGroup", "radioGroup", "consent"];

export default function FieldWrapper({
  type,
  width = "full",
  errorId,
  error,
  children,
}: Props) {
  const isFile = type === "file" || type === "files";

  return (
    <div
      className="field flex flex-col data-[width=full]:col-span-full max-[64rem]:col-span-full"
      data-width={width ?? "full"}
      data-type={type}
    >
      <div
        className={cn(
          "control border-t border-current",
          !GROUP_TYPES.includes(type) && "flex items-center gap-[var(--s16)]",
          type === "consent" && "border-t-0",
          isFile && "mb-[var(--gutter)] border",
        )}
      >
        {children}
      </div>

      <p
        id={errorId}
        className="error text-accent mt-[var(--s4)] mb-[var(--s8)] empty:hidden"
        aria-live="polite"
      >
        {error}
      </p>
    </div>
  );
}
