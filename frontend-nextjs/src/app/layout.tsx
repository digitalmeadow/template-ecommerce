import type { ReactNode } from "react";
import { headers } from "next/headers";
import { sanityClient } from "sanity-nextjs/client.server";
import { metaSettingsQuery } from "sanity-nextjs/queries/metaSettings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/cart/Cart";
import CookiesBanner from "@/components/CookiesBanner";
import Grid from "@/dev/Grid";
import Meta from "@/meta/Meta";
import ScriptSpacing from "@/scripts/ScriptSpacing";
import ScriptTextFillWidth from "@/scripts/ScriptTextFillWidth";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  const metaSettingsResult = await sanityClient.request(metaSettingsQuery);
  const metaSettingsData = metaSettingsResult.allMetaSettings[0] ?? null;

  return (
    <html
      lang="en"
      className="bg-background text-foreground h-full antialiased"
    >
      <head>
        <Meta metaSettingsData={metaSettingsData} pathname={pathname} />
      </head>
      <body className="flex min-h-full flex-col">
        <ScriptSpacing />
        <ScriptTextFillWidth />
        <Grid />
        <Header />
        <main>{children}</main>
        <Footer />
        <Cart />
        <CookiesBanner />
      </body>
    </html>
  );
}
