import type { Metadata, Viewport } from "next";
import { connection } from "next/server";
import type { ReactNode } from "react";
import Analytics from "@/components/Analytics";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Cart from "@/components/cart/Cart";
import CookiesBanner from "@/components/CookiesBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LocationNotice from "@/components/LocationNotice";
import { THEME_COLOR } from "@/config";
import PageTransition from "@/decorations/PageTransition";
import Grid from "@/dev/Grid";
import { getGlobals } from "@/lib/sanity/globals";
import { buildOrganisationSchema, buildWebSiteSchema } from "@/lib/sanity/structuredData";
import { getHtmlLang, LOCALE_LIST } from "@/lib/shopify/locale";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import JsonLd from "@/meta/JsonLd";
import { SITE_URL } from "@/meta/metadata";
import ScriptAnimations from "@/scripts/ScriptAnimations";
import ScriptMeasurements from "@/scripts/ScriptMeasurements";
import "@/styles/index.css";

export function generateStaticParams() {
  return LOCALE_LIST.map((locale) => ({ locale: locale.path }));
}

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const { organisationSettings } = await getGlobals();
  return {
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    manifest: "/site.webmanifest",
    appleWebApp: organisationSettings?.name ? { title: organisationSettings.name } : undefined,
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: THEME_COLOR,
};

export default async function LocaleLayout({ children }: { children: ReactNode }) {
  // The drafts site renders every request, so content stays live.
  if (process.env.PREVIEW === "true") await connection();

  const locale = await getRenderLocale();
  const {
    header,
    footer,
    cart,
    organisationSettings,
    analyticsSettings,
    announcementBanner,
    cookieConsent,
    locationNotice,
  } = await getGlobals();

  return (
    <html
      lang={getHtmlLang(locale)}
      data-locale={locale.path}
      // ScriptAnimations sets html[data-js] pre-hydration.
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
      {/* Header overlays the top of main; the announcement banner, when present, gets its own row.
          minmax(0, …): a wide child (a carousel's slide strip) must never size the page. */}
      <body className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr] [&[data-outlined]_*]:[outline:1px_solid_rgb(0_0_0/0.1)]">
        <JsonLd schema={buildOrganisationSchema(organisationSettings, SITE_URL)} />
        <JsonLd schema={buildWebSiteSchema(organisationSettings, SITE_URL, locale)} />

        <a
          className="fixed top-0 left-0 z-100 -translate-y-full bg-text px-5 py-3 text-background focus-visible:translate-y-0"
          href="#main"
        >
          Skip to content
        </a>

        <AnnouncementBanner announcementBanner={announcementBanner} />

        <div className="[grid-area:2/1/3/2]">
          <Header header={header} />
        </div>

        <Cart cart={cart} />

        <main id="main" tabIndex={-1} className="[grid-area:2/1/3/2] focus:outline-none">
          <PageTransition>{children}</PageTransition>
        </main>

        <CookiesBanner cookieConsent={cookieConsent} />
        <LocationNotice
          locationNotice={locationNotice}
          waitForConsent={Boolean(cookieConsent?.messageRaw)}
        />
        <Analytics analyticsSettings={analyticsSettings} />

        <div className="row-start-3">
          <Footer footer={footer} />
        </div>

        <Grid />
      </body>
    </html>
  );
}
