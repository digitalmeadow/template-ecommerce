import { cubicBezier } from "motion";

// Keep in sync with --ease-out-cubic (theme.css) and --transition-default-duration (animations.css).
export const easeOutCubic = [0.33, 1, 0.68, 1] as const;
export const easeOutCubicFn = cubicBezier(...easeOutCubic);

export const transitionDefaultDuration = 0.25;

// Frame-rate independent approach to a target. `tau` = seconds to close ~63% of the gap.
export const damp = (current: number, target: number, tau: number, deltaSeconds: number) =>
  current + (target - current) * (1 - Math.exp(-deltaSeconds / tau));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
