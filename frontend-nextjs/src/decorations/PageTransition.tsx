"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ViewTransition, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// Remounting per pathname makes React run a view transition on navigation; styled in
// styles/transitions.css. Delete this wrapper (and that file) to remove transitions.
export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // Router navigations swap <main> without moving focus; never on first load.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <ViewTransition key={pathname} enter="page-reveal" exit="page-cover" default="none">
      <div className="page-transition">{children}</div>
    </ViewTransition>
  );
}
