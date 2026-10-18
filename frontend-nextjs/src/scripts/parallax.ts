import { scroll } from "motion";
import { prefersReducedMotion } from "@/styles/animations";

// Media frames whose stacked children (media + placeholder) drift together.
const FRAME_SELECTOR = ".sanity-image, .mux-video, .vimeo-video";

// Reads a numeric CSS custom property (e.g. "1.12", "5%") off :root.
function readVar(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

// [data-animate-parallax] drifts media inside its overflow-hidden frame; the -wrapper variant drifts the element itself.
export function initParallax(): () => void {
  if (prefersReducedMotion()) return () => {};

  const scale = readVar("--parallax-scale", 1.12);
  const defaultTravel = readVar("--parallax-travel", 2);
  const wrapperTravel = readVar("--parallax-travel-wrapper", 1);

  // Max drift the overscale can hide on each edge, so frame edges never show.
  const maxTravel = ((scale - 1) / 2) * 100;

  const cleanups: (() => void)[] = [];

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

  document.querySelectorAll<HTMLElement>("[data-animate-parallax-wrapper]").forEach((element) => {
    const override = parseFloat(element.dataset.animateParallaxWrapper ?? "");
    const travel = Number.isFinite(override) ? override : wrapperTravel;
    drive(element, [element], travel, "");
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
