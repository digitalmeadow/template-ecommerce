"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { cartOpen, setCartOpen } from "@/stores/ui";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  layout?: "fullscreen" | "right";
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Overlay({
  id,
  layout = "fullscreen",
  ariaLabel,
  className,
  children,
}: Props) {
  const isCartOverlay = id === "cart";
  const cartOpenValue = useStore(cartOpen);
  const [open, setOpen] = useState(false);
  const previousScrollY = useRef(0);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const lockScroll = useCallback(() => {
    previousScrollY.current = window.scrollY;
    const scrollingElement = document.scrollingElement as HTMLElement | null;
    if (scrollingElement) {
      scrollingElement.style.overflow = "hidden";
      scrollingElement.style.top = `-${previousScrollY.current}px`;
      scrollingElement.style.position = "fixed";
      scrollingElement.style.width = "100%";
      const scrollbar =
        window.innerWidth - document.documentElement.clientWidth;
      scrollingElement.style.paddingRight = `${scrollbar}px`;
    }
  }, []);

  const unlockScroll = useCallback(() => {
    const scrollingElement = document.scrollingElement as HTMLElement | null;
    if (scrollingElement) {
      scrollingElement.style.overflow = "";
      scrollingElement.style.top = "";
      scrollingElement.style.position = "";
      scrollingElement.style.width = "";
      scrollingElement.style.paddingRight = "";
      const prevBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, previousScrollY.current);
      document.documentElement.style.scrollBehavior = prevBehavior;
    }
  }, []);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (isCartOverlay) {
          setCartOpen(false);
        } else {
          setOpen(false);
          previouslyFocused.current?.focus();
          unlockScroll();
        }
      }
    },
    [isCartOverlay, unlockScroll],
  );

  const closeOverlay = useCallback(() => {
    setOpen(false);
    document.removeEventListener("keydown", handleKeydown);
    previouslyFocused.current?.focus();
    unlockScroll();
  }, [unlockScroll, handleKeydown]);

  const openOverlay = useCallback(() => {
    setOpen(true);
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.addEventListener("keydown", handleKeydown);
    requestAnimationFrame(() => {
      panelRef.current?.focus();
    });
    lockScroll();
  }, [lockScroll, handleKeydown]);

  useEffect(() => {
    if (isCartOverlay) {
      if (cartOpenValue) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        openOverlay();
      } else {
        closeOverlay();
      }
    }
  }, [cartOpenValue, isCartOverlay, openOverlay, closeOverlay]);

  const handleBackdropClick = useCallback(() => {
    if (isCartOverlay) {
      setCartOpen(false);
    } else {
      closeOverlay();
    }
  }, [isCartOverlay, closeOverlay]);

  return (
    <div
      id={id}
      className={cn(
        "fixed z-20 pointer-events-none",
        open && "z-[21] pointer-events-auto",
        className,
      )}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/50 opacity-0 transition-opacity duration-[var(--transition-default-duration,250ms)] ease-[var(--ease-out-cubic)]",
          open && "opacity-100",
        )}
        onClick={handleBackdropClick}
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
            "opacity-0 pointer-events-none transition-opacity duration-[var(--transition-default-duration,250ms)] ease-[var(--ease-out-cubic)]",
            "max-sm:p-[var(--margin)]",
            open && "opacity-100 pointer-events-auto",
          ],
          layout === "right" && [
            "top-0 right-0 h-full w-[480px] p-[var(--margin)]",
            "translate-x-full transition-transform duration-[var(--transition-default-duration,250ms)] ease-[var(--ease-out-cubic)]",
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
