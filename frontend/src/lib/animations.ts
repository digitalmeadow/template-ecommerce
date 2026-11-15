import { cubicBezier } from "motion";

// Keep in sync with the --ease-out / --ease-in-out tokens in styles/tokens/motion.css.
export const easeOut = [0.33, 1, 0.68, 1] as const;
export const easeOutFn = cubicBezier(...easeOut);

export const easeInOut = [0.83, 0, 0.17, 1] as const;
export const pageTransitionDuration = 0.7;

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// Frame-rate independent approach to a target. `tau` = seconds to close ~63% of the gap.
export const damp = (current: number, target: number, tau: number, deltaSeconds: number) =>
  current + (target - current) * (1 - Math.exp(-deltaSeconds / tau));
