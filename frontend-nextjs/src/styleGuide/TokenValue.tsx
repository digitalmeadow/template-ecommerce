"use client";

import { useBrowserValue } from "@/lib/useBrowserValue";

interface Props {
  token: string;
  className?: string;
}

// Read from the live stylesheet, so the list can't drift from styles/.
export default function TokenValue({ token, className }: Props) {
  const value = useBrowserValue(
    () => getComputedStyle(document.documentElement).getPropertyValue(token).trim(),
    "",
  );
  return <code className={className}>{value}</code>;
}
