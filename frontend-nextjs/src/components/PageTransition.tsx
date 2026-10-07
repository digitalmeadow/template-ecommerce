"use client";

import { useEffect, useRef, ViewTransition } from "react";
import { usePathname } from "next/navigation";

// Remounting a keyed boundary inside the navigation transition makes React run
// document.startViewTransition; the ::view-transition-* rules in animations.css style it.
export default function PageTransition() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Focus moves to the new content after navigation, not on first load.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <ViewTransition
      key={pathname}
      enter="page-transition"
      exit="page-transition"
    >
      <div
        className="page-transition pointer-events-none fixed inset-[0]"
        aria-hidden="true"
      />
    </ViewTransition>
  );
}
