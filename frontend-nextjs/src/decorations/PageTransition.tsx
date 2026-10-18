"use client";

import { useEffect, useRef, ViewTransition } from "react";
import { usePathname } from "next/navigation";

// A keyed boundary remounting mid-navigation makes React start a view transition; styled in animations.css.
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
    <ViewTransition key={pathname} enter="page-transition" exit="page-transition">
      <div className="page-transition pointer-events-none fixed inset-[0]" aria-hidden="true" />
    </ViewTransition>
  );
}
