import { scroll } from "motion";

// Reads a numeric CSS custom property (e.g. "1.12", "5%") off :root.
function readVar(name: string, fallback: number): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

// [data-animate-parallax] drifts media inside its overflow-hidden frame; the -wrapper variant drifts the element itself.
export function initParallax(): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const scale = readVar("--parallax-scale", 1.12);
  const defaultTravel = readVar("--parallax-travel", 5);
  const wrapperTravel = readVar("--parallax-travel-wrapper", 3);

  // Max drift the overscale can hide on each edge — clamp so we never reveal frame edges.
  const maxTravel = ((scale - 1) / 2) * 100;

  const cleanups: (() => void)[] = [];

  // Drives translateY from -travel% to +travel%; `extra` appends the overscale, for media layers only.
  const drive = (target: HTMLElement, layers: HTMLElement[], travel: number, extra: string) => {
    layers.forEach((layer) => (layer.style.willChange = "transform"));
    const stop = scroll(
      (progress: number) => {
        const y = progress * travel * 2 - travel;
        const transform = `translate3d(0, ${y}%, 0)${extra}`;
        layers.forEach((layer) => (layer.style.transform = transform));
      },
      { target, offset: ["start end", "end start"] },
    );
    cleanups.push(() => {
      stop();
      layers.forEach((layer) => {
        layer.style.transform = "";
        layer.style.willChange = "";
      });
    });
  };

  // Media drift: move the frame's stacked children (image/video + blurhash) together.
  const FRAME_SELECTOR = ".sanity-image, .vimeo-video";
  document.querySelectorAll<HTMLElement>("[data-animate-parallax]").forEach((host) => {
    const frame = host.matches(FRAME_SELECTOR)
      ? host
      : host.querySelector<HTMLElement>(FRAME_SELECTOR);
    if (!frame) return;
    const layers = Array.from(frame.children) as HTMLElement[];
    if (layers.length === 0) return;
    const override = parseFloat(host.dataset.animateParallax ?? "");
    const travel = Math.min(Number.isFinite(override) ? override : defaultTravel, maxTravel);
    drive(frame, layers, travel, ` scale(${scale})`);
  });

  // Wrapper drift: move the element itself, no scale, no overflow assumptions.
  document.querySelectorAll<HTMLElement>("[data-animate-parallax-wrapper]").forEach((el) => {
    const override = parseFloat(el.dataset.animateParallaxWrapper ?? "");
    const travel = Number.isFinite(override) ? override : wrapperTravel;
    drive(el, [el], travel, "");
  });

  return () => cleanups.forEach((clean) => clean());
}
