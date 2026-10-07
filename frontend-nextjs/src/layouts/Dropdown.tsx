"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  onToggle?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
}

export default function Dropdown({
  id,
  trigger,
  children,
  onToggle,
  className,
  triggerClassName,
  panelClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = `${id}-panel`;

  function setOpen(open: boolean) {
    setIsOpen(open);
    onToggle?.(open);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
      onToggle?.(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
      onToggle?.(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onToggle]);

  // A <button> never receives arrow keys natively, so without this there is no keyboard way in.
  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (isOpen) return;
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    // Commit first so the panel is no longer inert when focus moves into it.
    flushSync(() => setOpen(true));
    const panel = panelRef.current;
    const current = panel?.querySelector<HTMLElement>("input:checked");
    const fallback = panel?.querySelector<HTMLElement>(
      "input, button, [href], [tabindex]",
    );
    (current ?? fallback)?.focus();
  }

  return (
    <div ref={rootRef} id={id} className={cn("dropdown", className)}>
      <button
        ref={triggerRef}
        className={cn("dropdown-trigger", triggerClassName)}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
      >
        {trigger}
      </button>

      {/* 0fr -> 1fr keeps the panel in flow, so opening pushes following content down. */}
      <div
        className={cn(
          "grid justify-items-start transition-[grid-template-rows] duration-[var(--transition-default-duration)]",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div
          ref={panelRef}
          id={panelId}
          className={cn(
            "dropdown-panel pointer-events-none relative z-[5] overflow-hidden opacity-0 transition-opacity duration-[var(--transition-default-duration)]",
            isOpen && "pointer-events-auto opacity-100",
            panelClassName,
          )}
          data-state={isOpen ? "open" : undefined}
          inert={!isOpen}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
