import { interpolate, scroll } from "motion";
import { clamp01, damp, easeOutCubicFn } from "@styles/animations";
import { splitIntoWords } from "@utils/splitIntoWords";

// Share of total progress a single word spends fading — the wider it is, the more words
// are mid-fade at once, so the leading edge reads as a gradient rather than a hard wipe.
const WORD_FADE_WINDOW = 0.1;
const SCRUB_SMOOTHING_SECONDS = 0.07;
const MUTED_OPACITY = 0.2;

// Scrub band: where the block's start edge sits in the viewport.
const SCRUB_START = 0.65;
const SCRUB_END = 0.4;

// Native scroll arrives in coarse steps; chase the scroll progress instead of snapping to it.
const createScrubber = (paint: (progress: number) => void) => {
  let current = 0;
  let target = 0;
  let raf = 0;
  let lastTime = 0;

  const frame = (time: number) => {
    const deltaSeconds = Math.min((time - lastTime) / 1000, 0.1); // clamp tab-switch gaps
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
};

// Opacity rather than colour so it works with any text colour without parsing CSS colour formats.
const buildWordPainter = (layout: HTMLElement) => {
  const words = splitIntoWords(layout);
  if (words.length === 0) return null;

  const step = words.length > 1 ? (1 - WORD_FADE_WINDOW) / (words.length - 1) : 0;

  const mixers = words.map((_, wordIndex) => {
    const start = wordIndex * step;
    const end = Math.min(start + WORD_FADE_WINDOW, 1);
    return interpolate([start, end], [MUTED_OPACITY, 1], { ease: easeOutCubicFn });
  });

  return (progress: number) => {
    words.forEach((word, wordIndex) => {
      word.style.opacity = String(mixers[wordIndex](progress));
    });
  };
};

// [data-animate-words] fills word by word as its top edge scrolls through the band.
export function initWordsReveal(): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const cleanups: (() => void)[] = [];

  document.querySelectorAll<HTMLElement>("[data-animate-words]").forEach((element) => {
    const paint = buildWordPainter(element);
    if (!paint) return;
    paint(0);

    const scrubber = createScrubber(paint);
    cleanups.push(scrubber.stop);

    // A block already above the band on load could only ever report "finished"; scrub from page top instead.
    const top = element.getBoundingClientRect().top + window.scrollY;
    if (top - window.innerHeight * SCRUB_START <= 0) {
      cleanups.push(
        scroll((_progress: number, info: { y: { current: number } }) => {
          const band = window.innerHeight * (SCRUB_START - SCRUB_END);
          scrubber.set(clamp01(info.y.current / band));
        }),
      );
      return;
    }

    cleanups.push(
      scroll(scrubber.set, {
        target: element,
        offset: [`start ${SCRUB_START * 100}%`, `start ${SCRUB_END * 100}%`],
      }),
    );
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
