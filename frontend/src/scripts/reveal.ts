// [data-animate-reveal] fades in once 10% is in view.
export function initReveal(): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "";
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
  );

  document
    .querySelectorAll<HTMLElement>("[data-animate-reveal]")
    .forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}
