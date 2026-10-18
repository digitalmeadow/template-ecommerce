import { cn } from "@/lib/utils";

interface Props {
  direction?: "right" | "up";
  className?: string;
}

export default function IconArrow({ direction = "right", className }: Props) {
  return (
    <svg
      className={cn(
        "icon-arrow block h-full w-full",
        direction === "up" && "-rotate-90",
        className,
      )}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M1 8H15M15 8L8.5 1.5M15 8L8.5 14.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
