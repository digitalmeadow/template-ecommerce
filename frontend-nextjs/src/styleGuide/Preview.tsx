"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { WIDTHS, type EntrySummary, type Scheme, type WidthId } from "./entry";

const MIN_WIDTH = 320;
const FALLBACK_HEIGHT = 480;
const WIDTH_IDS = Object.keys(WIDTHS) as WidthId[];

/** The bar's width choice; a fresh object each click, so it re-applies even to the same width. */
export interface WidthCommand {
  id: WidthId;
}

interface Props {
  entry: EntrySummary;
  scheme: Scheme;
  width: WidthCommand;
  isGridVisible: boolean;
}

function frameSrc(entry: EntrySummary, scheme: Scheme) {
  return `/style-guide/frame/${entry.id}${scheme === "light" ? "" : `?scheme=${scheme}`}`;
}

// One entry in an iframe: sections respond to the viewport, so only a frame shows the real
// mobile layout. Wider than the column, it scales down to fit; the handle drags it narrower.
export default function Preview({ entry, scheme, width, isGridVisible }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // Null fills the column; a number is an exact frame width in px.
  const [frameWidth, setFrameWidth] = useState<number | null>(WIDTHS[width.id]);
  const [preset, setPreset] = useState<WidthId | null>(width.id);
  const [appliedWidth, setAppliedWidth] = useState(width);
  const [stageWidth, setStageWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(entry.height ?? FALLBACK_HEIGHT);
  const [isDragging, setIsDragging] = useState(false);
  // The src stays as first loaded: schemes are applied to the loaded page, keeping its state.
  const [src] = useState(() => frameSrc(entry, scheme));

  if (appliedWidth !== width) {
    setAppliedWidth(width);
    setPreset(width.id);
    setFrameWidth(WIDTHS[width.id]);
  }

  // Width only: the stage's height follows the frame, so reacting to it would loop.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([observed]) => {
      if (observed) setStageWidth(observed.contentRect.width);
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Set on the loaded page directly: instant, and keeps the frame's state (open menus, tabs).
  const applyScheme = () => {
    const root = frameRef.current?.contentDocument?.documentElement;
    if (!root) return;
    if (scheme === "light") root.removeAttribute("data-color-scheme");
    else root.dataset.colorScheme = scheme;
  };

  // Through the frame's own Ctrl+G (dev/Grid), only when its state differs.
  const applyGrid = () => {
    const frameWindow = frameRef.current?.contentWindow as typeof window | null | undefined;
    const grid = frameRef.current?.contentDocument?.getElementById("grid-visualizer");
    if (!frameWindow || !grid || !grid.hidden === isGridVisible) return;
    frameWindow.dispatchEvent(
      new frameWindow.KeyboardEvent("keydown", { ctrlKey: true, code: "KeyG" }),
    );
  };

  useEffect(applyScheme);
  useEffect(applyGrid);

  const contentObserverRef = useRef<ResizeObserver | null>(null);
  useEffect(() => () => contentObserverRef.current?.disconnect(), []);

  const handleLoad = () => {
    applyScheme();
    applyGrid();
    contentObserverRef.current?.disconnect();
    const body = frameRef.current?.contentDocument?.body;
    // Entries with a set height (overlays) keep it; others grow to fit their content.
    if (!body || entry.height) return;
    const FrameResizeObserver = (frameRef.current?.contentWindow as typeof window).ResizeObserver;
    // Next frame: resizing the iframe inside its own observer's callback would loop.
    contentObserverRef.current = new FrameResizeObserver(() =>
      requestAnimationFrame(() => setContentHeight(body.scrollHeight || FALLBACK_HEIGHT)),
    );
    contentObserverRef.current.observe(body);
  };

  // Drags narrower than the column only, so a dragged frame is always shown at full size.
  const handleDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const handle = event.currentTarget;
    const startX = event.clientX;
    const startWidth = handle.parentElement?.offsetWidth ?? 0;
    handle.setPointerCapture(event.pointerId);
    setIsDragging(true);

    const move = (moveEvent: PointerEvent) => {
      const available = stageRef.current?.clientWidth ?? startWidth;
      const next = startWidth + moveEvent.clientX - startX;
      setPreset(null);
      setFrameWidth(Math.round(Math.min(available, Math.max(MIN_WIDTH, next))));
    };
    const end = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      setIsDragging(false);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  };

  const shownWidth = frameWidth ?? stageWidth;
  const scale = stageWidth && shownWidth ? Math.min(1, stageWidth / shownWidth) : 1;
  const openHref = frameSrc(entry, scheme);

  return (
    <div className="preview" id={entry.id}>
      <div className="head">
        <h3 className="title">
          <a href={`#${entry.id}`}>{entry.title}</a>
        </h3>
        <div className="actions">
          <span className="size">
            {stageWidth > 0 &&
              `${Math.round(shownWidth)}px${scale < 1 ? ` at ${Math.round(scale * 100)}%` : ""}`}
          </span>
          <div className="segments" role="group" aria-label="Width">
            {WIDTH_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === preset}
                onClick={() => {
                  setPreset(id);
                  setFrameWidth(WIDTHS[id]);
                }}
              >
                {id}
              </button>
            ))}
          </div>
          <a className="open" href={openHref} target="_blank">
            Open ↗
          </a>
        </div>
      </div>
      <div className="stage" ref={stageRef}>
        <div
          className="device"
          style={{ width: shownWidth * scale || undefined, height: contentHeight * scale }}
        >
          <iframe
            ref={frameRef}
            src={src}
            title={`${entry.group}: ${entry.title}`}
            loading="lazy"
            onLoad={handleLoad}
            style={{
              width: shownWidth || "100%",
              height: contentHeight,
              scale,
              pointerEvents: isDragging ? "none" : undefined,
            }}
          />
          <button
            className="handle"
            type="button"
            aria-label="Drag to resize"
            onPointerDown={handleDrag}
          />
        </div>
      </div>
    </div>
  );
}
