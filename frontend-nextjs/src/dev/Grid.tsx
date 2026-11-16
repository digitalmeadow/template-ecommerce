"use client";

import { useEffect, useRef } from "react";

const COLUMNS = 16;

export default function Grid() {
  const visualizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isVisible = false;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || event.code !== "KeyG") return;
      isVisible = !isVisible;
      if (visualizerRef.current) visualizerRef.current.hidden = !isVisible;
      if (isVisible) document.body.dataset.outlined = "";
      else delete document.body.dataset.outlined;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="grid-visualizer" ref={visualizerRef} hidden>
      <div className="pointer-events-none fixed top-0 left-[var(--margin)] z-100 grid h-screen w-[var(--container-width)] grid-cols-[repeat(var(--column-count),1fr)] gap-x-[var(--gutter)] opacity-12">
        {Array.from({ length: COLUMNS }, (_, index) => (
          // The grid has 4 columns below the breakpoint (tokens/grid.css).
          <div key={index} className="column h-full w-full bg-accent mobile:nth-[n+5]:hidden" />
        ))}
      </div>
    </div>
  );
}
