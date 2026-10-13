"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import { trapFocus } from "@/lib/focus";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  layout?: "fullscreen" | "right";
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

// position:fixed rather than overflow:hidden alone, which iOS Safari ignores on the body.
function lockScroll(): number {
  const scrollY = window.scrollY;
  const scrollingElement = document.scrollingElement as HTMLElement | null;
  if (scrollingElement) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    scrollingElement.style.overflow = "hidden";
    scrollingElement.style.top = `-${scrollY}px`;
    scrollingElement.style.position = "fixed";
    scrollingElement.style.width = "100%";
    scrollingElement.style.paddingRight = `${scrollbar}px`;
  }
  return scrollY;
}

function unlockScroll(scrollY: number) {
  const scrollingElement = document.scrollingElement as HTMLElement | null;
  if (!scrollingElement) return;
  scrollingElement.style.overflow = "";
  scrollingElement.style.top = "";
  scrollingElement.style.position = "";
  scrollingElement.style.width = "";
  scrollingElement.style.paddingRight = "";
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollY);
  document.documentElement.style.scrollBehavior = previousBehavior;
}

export default function Overlay({
  id,
  open,
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
    if (!open || !panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollY = lockScroll();
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
      unlockScroll(scrollY);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        "fixed z-20 pointer-events-none",
        open && "z-[21] pointer-events-auto",
        className,
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/50 opacity-0 transition-opacity duration-[var(--transition-default-duration,250ms)] ease-out-cubic",
          open && "opacity-100",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? undefined}
        tabIndex={-1}
        className={cn(
          "panel fixed grid grid-rows-[auto_1fr] bg-background overflow-y-auto outline-none",
          layout === "fullscreen" && [
            "top-0 right-0 h-full w-full p-6",
            "opacity-0 pointer-events-none transition-opacity duration-[var(--transition-default-duration,250ms)] ease-out-cubic",
            "max-sm:p-[var(--margin)]",
            open && "opacity-100 pointer-events-auto",
          ],
          layout === "right" && [
            "top-0 right-0 h-full w-[480px] p-[var(--margin)]",
            "translate-x-full transition-transform duration-[var(--transition-default-duration,250ms)] ease-out-cubic",
            "max-sm:top-auto max-sm:bottom-0 max-sm:w-full max-sm:h-[calc(100svh-var(--s120))] max-sm:px-[var(--margin)] max-sm:pt-5 max-sm:pb-10 max-sm:rounded-t-2xl max-sm:translate-y-full",
            open && "translate-x-0 max-sm:translate-y-0",
          ],
        )}
      >
        {children}
      </div>
    </div>
  );
}
