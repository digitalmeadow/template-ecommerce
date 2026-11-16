// Pre-paint: `--vw` and the header's height (anchors clear the sticky header) before first render.
const MEASUREMENTS_SCRIPT = `(() => {
  const setDimensions = () => {
    const root = document.documentElement;
    root.style.setProperty("--vw", root.clientWidth / 100 + "px");
    const header = document.querySelector("[data-header]");
    if (header) root.style.setProperty("--scroll-padding-top", header.offsetHeight + "px");
  };
  setDimensions();
  window.addEventListener("resize", setDimensions);
  window.addEventListener("DOMContentLoaded", () => {
    setDimensions();
    // The header persists across navigations, so one observer covers wrapping nav and font swaps.
    const header = document.querySelector("[data-header]");
    if (header) new ResizeObserver(setDimensions).observe(header);
  });
})();`;

export default function ScriptMeasurements() {
  return <script dangerouslySetInnerHTML={{ __html: MEASUREMENTS_SCRIPT }} />;
}
