"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  group?: string;
  initOpen?: boolean;
  summary: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export default function Accordion({
  group,
  initOpen = false,
  summary,
  content,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const accordionRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    if (group) {
      window.dispatchEvent(
        new CustomEvent(`accordion:opened:${group}`, {
          detail: { target: accordionRef.current },
        }),
      );
    }
  }, [group]);

  useEffect(() => {
    if (!group) return;
    const handler = (event: Event) => {
      const { target } = (event as CustomEvent).detail;
      if (target !== accordionRef.current) {
        close();
      }
    };
    window.addEventListener(`accordion:opened:${group}`, handler);
    return () => {
      window.removeEventListener(`accordion:opened:${group}`, handler);
    };
  }, [group, close]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  return (
    <div
      ref={accordionRef}
      className={cn(
        "block -mt-px border-t border-border",
        "last:border-b",
        className,
      )}
    >
      <button
        type="button"
        className="summary w-full grid grid-cols-[1fr_auto] items-start gap-2 py-1 cursor-pointer"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <div>{summary}</div>
        <div className="icon grid items-center justify-items-center w-4 h-4 text-lg leading-[18px]">
          <span
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-300",
              isOpen ? "opacity-0" : "opacity-100",
            )}
          >
            +
          </span>
          <span
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0",
            )}
          >
            -
          </span>
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-2 pb-6 pl-[2em]">{content}</div>
        </div>
      </div>
    </div>
  );
}
