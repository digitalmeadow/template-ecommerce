"use client";

import { useEffect, useEffectEvent, useRef, type ReactNode } from "react";
import { trapFocus } from "@/lib/focus";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  layout?: "fullscreen" | "right";
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export default function Overlay({
  id,
  isOpen,
  onClose,
  layout = "fullscreen",
  ariaLabel,
  className,
  children,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const panel = panelRef.current;
    if (!isOpen || !panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();
    requestAnimationFrame(() => panel.focus());

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      trapFocus(panel!, event);
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      unlockScroll();
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  return (
    <div
      id={id}
      // Closed overlays stay in the DOM; keep their content out of the tab order and accessibility tree.
      inert={!isOpen}
      data-state={isOpen ? "open" : undefined}
      className={cn(
        "overlay-root pointer-events-none fixed z-20",
        isOpen && "pointer-events-auto z-21",
        className,
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-alpha-50 opacity-0 transition-opacity duration-(--duration-default) ease-out",
          isOpen && "opacity-100",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={cn(
          "panel fixed top-0 right-0 grid h-full grid-rows-[auto_1fr] overflow-y-auto bg-background p-(--margin) outline-none",
          layout === "fullscreen" && [
            "w-full opacity-0 transition-opacity duration-(--duration-default) ease-out",
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
          ],
          // On phones the side panel becomes a sheet rising from the bottom.
          layout === "right" && [
            "w-(--max-w-120) translate-x-full transition-transform duration-(--duration-default) ease-out",
            "mobile:top-auto mobile:bottom-0 mobile:h-[calc(100svh-var(--size-30))] mobile:w-full mobile:translate-x-0 mobile:translate-y-full mobile:rounded-t-lg mobile:pt-5 mobile:pb-10",
            isOpen && "translate-x-0 mobile:translate-y-0",
          ],
        )}
      >
        {children}
      </div>
    </div>
  );
}
