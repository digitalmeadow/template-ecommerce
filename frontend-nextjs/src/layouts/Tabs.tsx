"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  trigger: ReactNode;
  panel: ReactNode;
}

interface Props {
  items: TabItem[];
  // An index with no matching trigger opens with no tab selected, and makes the active tab deselectable.
  initialIndex?: number;
  orientation?: "vertical" | "horizontal";
  onChange?: (index: number) => void;
  id?: string;
  className?: string;
  triggersClassName?: string;
  triggerClassName?: string;
  panelsClassName?: string;
  panelClassName?: string;
}

export default function Tabs({
  items,
  initialIndex = 0,
  orientation = "vertical",
  onChange,
  id,
  className,
  triggersClassName,
  triggerClassName,
  panelsClassName,
  panelClassName,
}: Props) {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = items.length;
  const isDeselectable = initialIndex < 0 || initialIndex >= count;
  const triggerId = (index: number) => `${baseId}-trigger-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  function activate(index: number) {
    if (index === activeIndex) return;
    setActiveIndex(index);
    onChange?.(index);
  }

  // Clicking the active tab falls back to the default panel only where that panel has no trigger.
  function handleClick(index: number) {
    activate(index === activeIndex && isDeselectable ? initialIndex : index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (count === 0) return;

    const focusedIndex = triggerRefs.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const hasActiveTrigger = activeIndex >= 0 && activeIndex < count;
    // -1 when nothing is focused or selected, so the arrows enter from either end.
    const current =
      focusedIndex !== -1 ? focusedIndex : hasActiveTrigger ? activeIndex : -1;
    const [prevKey, nextKey] =
      orientation === "vertical"
        ? ["ArrowUp", "ArrowDown"]
        : ["ArrowLeft", "ArrowRight"];

    let next: number | null = null;
    if (event.key === nextKey)
      next = current === -1 ? 0 : (current + 1) % count;
    else if (event.key === prevKey)
      next = current === -1 ? count - 1 : (current - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next === null) return;

    event.preventDefault();
    activate(next);
    triggerRefs.current[next]?.focus();
  }

  return (
    <div id={id} className={cn("tabs", className)}>
      {/* No roving tabindex, so inactive tabs stay reachable with plain Tab. */}
      <div
        className={cn("tabs-triggers", triggersClassName)}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => (
          <button
            key={item.key}
            ref={(element) => {
              triggerRefs.current[index] = element;
            }}
            className={cn("tabs-trigger", triggerClassName)}
            type="button"
            role="tab"
            id={triggerId(index)}
            aria-controls={panelId(index)}
            aria-selected={index === activeIndex}
            data-state={index === activeIndex ? "active" : undefined}
            onClick={() => handleClick(index)}
          >
            {item.trigger}
          </button>
        ))}
      </div>

      <div className={cn("tabs-panels grid", panelsClassName)}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.key}
              className={cn(
                "tabs-panel pointer-events-none opacity-0 transition-opacity duration-[var(--transition-default-duration)] [grid-area:1/1]",
                isActive && "pointer-events-auto opacity-100",
                panelClassName,
              )}
              role="tabpanel"
              id={panelId(index)}
              aria-labelledby={triggerId(index)}
              data-state={isActive ? "active" : undefined}
              inert={!isActive}
            >
              {item.panel}
            </div>
          );
        })}
      </div>
    </div>
  );
}
