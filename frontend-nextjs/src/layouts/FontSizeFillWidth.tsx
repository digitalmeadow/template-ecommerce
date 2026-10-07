"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

const REFERENCE_FONT_SIZE = 100;

// Fits to the glyphs, not the text box: side bearings and negative tracking otherwise
// leave the first character short of one edge and the last one hanging past it.
function measureInk(textElement: HTMLElement) {
  const text = textElement.textContent?.trim();
  const context = document.createElement("canvas").getContext("2d");
  if (!text || !context) return null;

  const style = getComputedStyle(textElement);
  context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  // Canvas ignores text-transform, so measure what is actually painted.
  const painted =
    style.textTransform === "uppercase" ? text.toUpperCase() : text;
  const metrics = context.measureText(painted);

  // Canvas ignores CSS letter-spacing, which displaces every glyph after the first.
  const tracking =
    (parseFloat(style.letterSpacing) || 0) * ([...painted].length - 1);

  return {
    left: -metrics.actualBoundingBoxLeft,
    right: metrics.actualBoundingBoxRight + tracking,
    advance: textElement.getBoundingClientRect().width,
  };
}

function fit(wrapper: HTMLElement) {
  const textElement = wrapper.firstElementChild;
  if (!(textElement instanceof HTMLElement)) return;

  textElement.style.marginLeft = "0px";
  textElement.style.marginRight = "0px";
  textElement.style.fontSize = `${REFERENCE_FONT_SIZE}px`;

  const ink = measureInk(textElement);
  if (!ink || ink.right <= ink.left) return;

  // getBoundingClientRect on both, so an ancestor scale transform cancels out of the ratio.
  const scale = wrapper.getBoundingClientRect().width / (ink.right - ink.left);

  textElement.style.fontSize = `${REFERENCE_FONT_SIZE * scale}px`;
  // Negative margins pull the bearings out; the right one reserves the tracking overhang.
  textElement.style.marginLeft = `${-ink.left * scale}px`;
  textElement.style.marginRight = `${(ink.right - ink.advance) * scale}px`;
}

export default function FontSizeFillWidth({ children, className }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let lastWidth = -1;
    // Refitting changes height, not width, so only width changes need a refit.
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      if (width === lastWidth) return;
      lastWidth = width;
      fit(wrapper);
    });
    observer.observe(wrapper);

    let active = true;
    document.fonts.ready.then(() => {
      if (active) fit(wrapper);
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "font-size-fill-width w-full [contain:inline-size] [&>*]:inline-block [&>*]:max-w-none [&>*]:text-[1px] [&>*]:leading-[0.8] [&>*]:whitespace-nowrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
