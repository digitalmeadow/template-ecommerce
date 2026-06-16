"use client";

import { useEffect } from "react";

export default function ScriptSpacing() {
  useEffect(() => {
    const setDimensions = () => {
      const vw = document.documentElement.clientWidth / 100;
      const scrollbar =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--vw", `${vw}px`);
      document.documentElement.style.setProperty(
        "--scrollbar",
        `${scrollbar}px`,
      );
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => window.removeEventListener("resize", setDimensions);
  }, []);

  return null;
}
