import { useParams } from "next/navigation";
import { getLocale, type Locale } from "@/lib/shopify/locale";

/** The locale a client component renders in; unprefixed URLs are rewritten to the default's segment. */
export function useLocale(): Locale {
  const params = useParams<{ locale?: string }>();
  return getLocale(params.locale);
}
