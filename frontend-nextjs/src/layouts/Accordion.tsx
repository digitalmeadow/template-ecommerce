"use client";

import { useState, useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  summary: string | null | undefined;
  headingLevel?: 2 | 3 | 4;
  // Opening one accordion closes the others in the same group.
  group?: string;
  initOpen?: boolean;
  content: ReactNode;
  className?: string;
}

type EventAccordionOpen = CustomEvent<{ target: HTMLElement | null }>;

export default function Accordion({
  summary,
  headingLevel = 2,
  group,
  initOpen = false,
  content,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const accordionRef = useRef<HTMLDivElement>(null);
  const contentId = `accordion-${useId()}`;
  const Heading = `h${headingLevel}` as const;

  const close = useCallback(() => setIsOpen(false), []);

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
    const handleAccordionOpen = (event: Event) => {
      if ((event as EventAccordionOpen).detail.target !== accordionRef.current) close();
    };
    window.addEventListener(`accordion:opened:${group}`, handleAccordionOpen);
    return () => {
      window.removeEventListener(`accordion:opened:${group}`, handleAccordionOpen);
    };
  }, [group, close]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return (
    <div
      ref={accordionRef}
      className={cn(
        "accordion group/accordion -mt-px block border-t border-border last:border-b",
        className,
      )}
      data-state={isOpen ? "open" : undefined}
    >
      <Heading className="heading">
        <button
          type="button"
          className="summary grid w-full cursor-pointer grid-cols-[1fr_auto] items-start gap-[var(--s8)] py-[var(--s4)] text-left"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="summary-text">{summary}</span>
          <span
            className="icon grid h-[var(--s16)] w-[var(--s16)] items-center justify-items-center text-[1.125rem] leading-none"
            aria-hidden="true"
          >
            <span className="icon-open col-start-1 row-start-1 transition-opacity duration-[var(--transition-default-duration)] group-data-[state=open]/accordion:opacity-0">
              +
            </span>
            <span className="icon-close col-start-1 row-start-1 opacity-0 transition-opacity duration-[var(--transition-default-duration)] group-data-[state=open]/accordion:opacity-100">
              -
            </span>
          </span>
        </button>
      </Heading>

      <div
        id={contentId}
        className="content-container grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--transition-default-duration)] group-data-[state=open]/accordion:grid-rows-[1fr]"
        inert={!isOpen}
      >
        <div className="content-inner overflow-hidden">
          <div className="content pt-[var(--s8)] pb-[var(--s24)] pl-[2em]">{content}</div>
        </div>
      </div>
    </div>
  );
}
