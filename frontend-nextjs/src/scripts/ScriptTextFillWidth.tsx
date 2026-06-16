"use client";

import { useEffect } from "react";

export default function ScriptTextFillWidth() {
  useEffect(() => {
    const adjustFontSizeForElement = (textElement: HTMLElement) => {
      const section = textElement.parentElement;
      if (!section) return;

      const sectionWidth = section.clientWidth;

      const referenceFontSize = 100;
      textElement.style.fontSize = `${referenceFontSize}px`;

      const textWidth = textElement.getBoundingClientRect().width;
      const newFontSize = (sectionWidth / textWidth) * referenceFontSize;
      textElement.style.fontSize = `${newFontSize}px`;
    };

    const adjustFontSize = () => {
      const textFillWidthElements = document.querySelectorAll<HTMLElement>(
        "[data-text-fill-width]",
      );
      if (textFillWidthElements.length === 0) return;

      for (const element of textFillWidthElements) {
        adjustFontSizeForElement(element);
      }
    };

    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);
    document.fonts.ready.then(adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  return null;
}
