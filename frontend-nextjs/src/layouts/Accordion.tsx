"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  summary: string | null | undefined;
  headingLevel?: 2 | 3 | 4;
  // Opening one accordion closes the others in the same group.
  group?: string;
  isInitiallyOpen?: boolean;
  content: ReactNode;
  className?: string;
}

type EventAccordionOpen = CustomEvent<{ target: HTMLElement | null }>;

export default function Accordion({
  summary,
  headingLevel = 2,
  group,
  isInitiallyOpen = false,
  content,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const accordionRef = useRef<HTMLDivElement>(null);
  const contentId = `accordion-${useId()}`;
  const Heading = `h${headingLevel}` as const;

  function open() {
    setIsOpen(true);
    if (group) {
      window.dispatchEvent(
        new CustomEvent(`accordion:opened:${group}`, {
          detail: { target: accordionRef.current },
        }),
      );
    }
  }

  useEffect(() => {
    if (!group) return;
    const handleAccordionOpen = (event: Event) => {
      if ((event as EventAccordionOpen).detail.target !== accordionRef.current) setIsOpen(false);
    };
    window.addEventListener(`accordion:opened:${group}`, handleAccordionOpen);
    return () => {
      window.removeEventListener(`accordion:opened:${group}`, handleAccordionOpen);
    };
  }, [group]);

  function toggle() {
    if (isOpen) setIsOpen(false);
    else open();
  }

  return (
    <div
      ref={accordionRef}
      className={cn(
        "accordion group/accordion -mt-px block border-t border-rule last:border-b",
        className,
      )}
      data-state={isOpen ? "open" : undefined}
    >
      <Heading className="heading g-heading-6">
        <button
          type="button"
          className="summary grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-2 py-2 text-left"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span className="summary-text">{summary}</span>
          <span className="icon grid size-4 place-items-center" aria-hidden="true">
            <span className="icon-open transition-opacity duration-(--duration-default) ease-out [grid-area:1/1] group-data-[state=open]/accordion:opacity-0">
              +
            </span>
            <span className="icon-close opacity-0 transition-opacity duration-(--duration-default) ease-out [grid-area:1/1] group-data-[state=open]/accordion:opacity-100">
              -
            </span>
          </span>
        </button>
      </Heading>

      <div
        id={contentId}
        className="content-container grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--duration-default) ease-out group-data-[state=open]/accordion:grid-rows-[1fr]"
        inert={!isOpen}
      >
        <div className="content-inner overflow-hidden">
          <div className="content pt-2 pb-6 pl-8">{content}</div>
        </div>
      </div>
    </div>
  );
}
