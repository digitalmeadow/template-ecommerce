// Opacity reveal controller. Opt in with [data-animate-reveal]; fires once at 10%
export function initReveal(): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

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
    .querySelectorAll<HTMLElement>("[data-animate-reveal]")
    .forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}
