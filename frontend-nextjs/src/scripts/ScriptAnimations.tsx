"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initReveal } from "@/scripts/reveal";
import { initParallax } from "@/scripts/parallax";
import { initWordsReveal } from "@/scripts/wordsReveal";

// Runs before paint so hidden reveal states only apply once JS is confirmed present.
const JS_FLAG_SCRIPT = "document.documentElement.dataset.js=''";

export default function ScriptAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [initReveal(), initParallax(), initWordsReveal()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />;
}
