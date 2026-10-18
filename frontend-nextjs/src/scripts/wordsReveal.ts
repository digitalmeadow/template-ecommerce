import { interpolate, scroll } from "motion";
import { damp, easeOutCubicFn, prefersReducedMotion } from "@/styles/animations";
import { splitIntoWords } from "@/utils/splitIntoWords";

// Share of total progress a single word spends fading; wider reads as a gradient, not a hard wipe.
const WORD_FADE_WINDOW = 0.1;
const SCRUB_SMOOTHING_SECONDS = 0.07;

// Native scroll arrives in coarse steps; chase the scroll progress instead of snapping to it.
function createScrubber(paint: (progress: number) => void) {
  let current = 0;
  let target = 0;
  let raf = 0;
  let lastTime = 0;

  const frame = (time: number) => {
    const deltaSeconds = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    current = damp(current, target, SCRUB_SMOOTHING_SECONDS, deltaSeconds);
    if (Math.abs(target - current) < 0.0005) current = target;

    paint(current);
    raf = current === target ? 0 : requestAnimationFrame(frame);
  };

  return {
    set(next: number) {
      target = next;
      if (raf || current === target) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}

// Splits the block into words and returns a paint(progress) that sweeps them muted -> final colour.
function buildWordPainter(layout: HTMLElement) {
  const words = splitIntoWords(layout);
  if (words.length === 0) return null;

  const resolveColor = (value: string) => {
    const probe = document.createElement("span");
    probe.style.color = value;
    probe.style.display = "none";
    layout.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  };

  const mutedColor = resolveColor("var(--color-muted)");
  const naturalColor = resolveColor("var(--color-foreground)");

  const step = words.length > 1 ? (1 - WORD_FADE_WINDOW) / (words.length - 1) : 0;

  const mixers = words.map((word, index) => {
    const parentColor = word.parentElement
      ? getComputedStyle(word.parentElement).color
      : naturalColor;
    const finalColor = parentColor === mutedColor ? naturalColor : parentColor;
    const start = index * step;
    const end = Math.min(start + WORD_FADE_WINDOW, 1);
    return interpolate([start, end], [mutedColor, finalColor], {
      ease: easeOutCubicFn,
    });
  });

  const paint = (progress: number) => {
    words.forEach((word, index) => {
      word.style.color = mixers[index](progress);
    });
  };

  // Unwraps the spans so the text reads as rendered again.
  const restore = () => {
    words.forEach((word) => word.replaceWith(word.textContent ?? ""));
  };

  return { paint, restore };
}

// [data-animate-words] fills word by word as the block scrolls through the viewport.
// Use on static server-rendered text only: it splits text nodes React no longer tracks.
export function initWordsReveal(): () => void {
  if (prefersReducedMotion()) return () => {};

  const cleanups: (() => void)[] = [];

  document.querySelectorAll<HTMLElement>("[data-animate-words]").forEach((element) => {
    const painter = buildWordPainter(element);
    if (!painter) return;

    const scrubber = createScrubber(painter.paint);
    painter.paint(0);
    const stop = scroll((progress: number) => scrubber.set(progress), {
      target: element,
      offset: ["start 85%", "end 50%"],
    });

    cleanups.push(() => {
      stop();
      scrubber.stop();
      painter.restore();
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
