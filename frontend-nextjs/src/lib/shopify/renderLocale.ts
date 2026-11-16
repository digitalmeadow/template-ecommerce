import "server-only";
import { locale } from "next/root-params";
import { getLocale, type Locale } from "@/lib/shopify/locale";

/** The locale a server component renders in, from the `[locale]` root segment. */
export async function getRenderLocale(): Promise<Locale> {
  return getLocale(await locale());
}
