import { cubicBezier } from "motion";

// Keep in sync with the --ease-out-cubic / --ease-sweep tokens in animations.css.
export const easeOutCubic = [0.33, 1, 0.68, 1] as const;
export const easeOutCubicFn = cubicBezier(...easeOutCubic);

export const easeSweep = [0.83, 0, 0.17, 1] as const;
export const sweepDuration = 0.7;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Frame-rate independent approach to a target. `tau` = seconds to close ~63% of the gap.
export const damp = (current: number, target: number, tau: number, deltaSeconds: number) =>
  current + (target - current) * (1 - Math.exp(-deltaSeconds / tau));
