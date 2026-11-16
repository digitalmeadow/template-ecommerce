"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/animations";

interface Props {
  heading: string;
}

const COLORS = [
  "var(--color-highlight-green)",
  "var(--color-highlight-blue)",
  "var(--color-highlight-purple)",
  "var(--color-highlight-yellow)",
  "var(--color-highlight-orange)",
];

export default function SectionHeroHeading({ heading }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Split server-side so FontSizeFillWidth fits the final per-character layout.
  const characters = heading.trim().split("");

  useEffect(() => {
    const element = headingRef.current;
    if (!element || prefersReducedMotion()) return;

    const animations = Array.from(element.children).map((character, index) =>
      character.animate(
        [
          { color: "var(--color-text)" },
          ...COLORS.map((color) => ({ color })),
          { color: "var(--color-text)" },
        ],
        { duration: 2000, delay: 500 + index * 50, iterations: 1 },
      ),
    );

    return () => animations.forEach((animation) => animation.cancel());
  }, []);

  return (
    <h1 ref={headingRef} className="whitespace-pre uppercase" aria-label={heading}>
      {characters.map((character, index) => (
        <span key={index} aria-hidden="true">
          {character}
        </span>
      ))}
    </h1>
  );
}
