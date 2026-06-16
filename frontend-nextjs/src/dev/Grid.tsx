"use client";

import { useEffect, useRef, useCallback } from "react";

const COLUMNS = 24;

export default function Grid() {
  const visibleRef = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const toggleGrid = useCallback(() => {
    visibleRef.current = !visibleRef.current;
    if (gridRef.current) {
      gridRef.current.classList.toggle("hidden", !visibleRef.current);
    }
    if (visibleRef.current) {
      document.body.dataset.outlined = "";
    } else {
      delete document.body.dataset.outlined;
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "KeyG") {
        toggleGrid();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleGrid]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("grid") === "true") {
      toggleGrid();
    }
  }, [toggleGrid]);

  return (
    <div id="grid-visualizer" ref={gridRef} className="hidden">
      <div className="pointer-events-none fixed top-0 left-1/2 z-100 grid h-screen w-[var(--container-width)] -translate-x-1/2 gap-x-[var(--gutter)]" style={{ gridTemplateColumns: `repeat(var(--columns-count), 1fr)` }}>
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} className="h-full w-full bg-black/10" />
        ))}
      </div>
    </div>
  );
}
