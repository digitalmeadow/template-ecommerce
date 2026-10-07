import { cubicBezier } from "motion";

// Keep in sync with the --ease-* / --transition-* tokens in styles/motion.css.
export const easeOutCubic = [0.33, 1, 0.68, 1] as const;
export const easeOutCubicFn = cubicBezier(...easeOutCubic);

export const transitionDefaultDuration = 0.25;
export const transitionMediaLoadDuration = 0.6;

export const easeSweep = [0.83, 0, 0.17, 1] as const;
export const sweepDuration = 0.7;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

// Frame-rate independent approach to a target. `tau` = seconds to close ~63% of the gap.
export const damp = (
  current: number,
  target: number,
  tau: number,
  deltaSeconds: number,
) => current + (target - current) * (1 - Math.exp(-deltaSeconds / tau));

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
