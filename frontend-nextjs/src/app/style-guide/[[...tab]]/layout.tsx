import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DEFAULT_LOCALE, getHtmlLang } from "@/lib/shopify/locale";
import "@/styleGuide/styleGuide.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

export default function StyleGuideLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={getHtmlLang(DEFAULT_LOCALE)}>
      <body>{children}</body>
    </html>
  );
}
