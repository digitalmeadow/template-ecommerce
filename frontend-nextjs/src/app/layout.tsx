import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/cart/Cart";
import CookiesBanner from "@/components/CookiesBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import LocationNotice from "@/components/LocationNotice";
import Analytics from "@/components/Analytics";
import PageTransition from "@/components/PageTransition";
import Grid from "@/dev/Grid";
import JsonLd from "@/meta/JsonLd";
import { buildMetadata, SITE_URL } from "@/meta/metadata";
import ScriptMeasurements from "@/scripts/ScriptMeasurements";
import ScriptAnimations from "@/scripts/ScriptAnimations";
import { getGlobals } from "@/lib/sanity/globals";
import { DEFAULT_LOCALE } from "@/lib/shopify/locale";
import {
  buildOrganisationSchema,
  buildWebSiteSchema,
} from "@/lib/sanity/structuredData";
import { fontBody } from "@/fonts";
import { cn } from "@/lib/utils";
import "../styles/globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...(await buildMetadata()),
    icons: {
      icon: [
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    manifest: "/site.webmanifest",
    appleWebApp: { title: "Digital Meadow" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F2E5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const {
    headerData,
    footerData,
    cartData,
    organisationSettingsData,
    analyticsSettingsData,
    announcementBannerData,
    cookieConsentData,
    locationNoticeData,
  } = await getGlobals();

  return (
    <html
      lang={DEFAULT_LOCALE}
      className={cn(
        fontBody.variable,
        "bg-background text-foreground h-full antialiased",
      )}
      // ScriptAnimations sets html[data-js] pre-hydration.
      suppressHydrationWarning
    >
      <body className="grid min-h-full">
        <JsonLd
          schema={buildOrganisationSchema(organisationSettingsData, SITE_URL)}
        />
        <JsonLd
          schema={buildWebSiteSchema(
            organisationSettingsData,
            SITE_URL,
            DEFAULT_LOCALE,
          )}
        />
        <ScriptMeasurements />
        <ScriptAnimations />
        <PageTransition />
        <Grid />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AnnouncementBanner announcementBannerData={announcementBannerData} />
        <Header headerData={headerData} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer footerData={footerData} />
        <Cart cartData={cartData} />
        <CookiesBanner cookieConsentData={cookieConsentData} />
        <LocationNotice
          locationNoticeData={locationNoticeData}
          waitForConsent={Boolean(cookieConsentData?.messageRaw)}
        />
        <Analytics analyticsSettingsData={analyticsSettingsData} />
      </body>
    </html>
  );
}
