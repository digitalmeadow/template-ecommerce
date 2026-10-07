import { prefersReducedMotion } from "./tokens";

// Opacity reveal. Opt in with [data-animate-reveal]; fires once at 10% visibility.
export function initReveal(): () => void {
  if (prefersReducedMotion()) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
  );

  document
    .querySelectorAll<HTMLElement>("[data-animate-reveal]:not(.is-revealed)")
    .forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
