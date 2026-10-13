import localFont from "next/font/local";

// next/font preloads the file and generates a size-adjusted fallback, so swapping in causes no layout shift.
export const fontBody = localFont({
  src: "./BIZUDMincho-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-biz-ud-mincho",
});
