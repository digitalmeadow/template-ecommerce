import type { Metadata } from "next";
import type { ReactNode } from "react";
import Grid from "@/dev/Grid";
import { DEFAULT_LOCALE, getHtmlLang } from "@/lib/shopify/locale";
import ScriptAnimations from "@/scripts/ScriptAnimations";
import ScriptMeasurements from "@/scripts/ScriptMeasurements";
import "@/styles/index.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The page context entries render in on the site: default locale, global styles, motion, grid.
export default function StyleGuideFrameLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={getHtmlLang(DEFAULT_LOCALE)}
      data-locale={DEFAULT_LOCALE.path}
      // ScriptAnimations sets html[data-js] and the frame's scheme script sets data-color-scheme pre-hydration.
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/ArchivoNarrow-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <ScriptMeasurements />
        <ScriptAnimations />
      </head>
      <body className="[&[data-outlined]_*]:[outline:1px_solid_rgb(0_0_0/0.1)]">
        {children}
        <Grid />
      </body>
    </html>
  );
}
