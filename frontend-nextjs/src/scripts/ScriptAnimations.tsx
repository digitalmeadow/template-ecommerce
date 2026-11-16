"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initParallax } from "@/scripts/parallax";
import { initReveal } from "@/scripts/reveal";
import { initWordsReveal } from "@/scripts/wordsReveal";

// Sync flag (before paint) so reveal only hides content once JS is confirmed present.
const JS_FLAG_SCRIPT = 'document.documentElement.dataset.js = "";';

export default function ScriptAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups = [initReveal(), initParallax(), initWordsReveal()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return <script dangerouslySetInnerHTML={{ __html: JS_FLAG_SCRIPT }} />;
}
