import { SHOPIFY_STOREFRONT_URL } from "shopify/client";
import { SHOPIFY_PUBLIC_API_TOKEN } from "shopify/config";

interface ConfiguredLocale {
  path: string;
  country: string;
}

/**
 * The configured locales Shopify currently sells to, read once when the build starts
 * (astro.config.mjs). Removing a market in Shopify drops its locale on the next build. The list
 * stays curated in config: each locale is a URL prefix and a full copy of the site.
 */
export async function getSellableLocales<T extends ConfiguredLocale>(
  locales: readonly T[],
): Promise<T[]> {
  let countries: Set<string>;
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_PUBLIC_API_TOKEN,
      },
      body: JSON.stringify({ query: "{ localization { availableCountries { isoCode } } }" }),
    });
    const { data } = (await response.json()) as {
      data?: { localization: { availableCountries: { isoCode: string }[] } };
    };
    if (!data) throw new Error(`Storefront API responded ${response.status}`);
    countries = new Set(data.localization.availableCountries.map((country) => country.isoCode));
  } catch (error) {
    console.warn("Couldn't read Shopify's markets; building every configured locale.", error);
    return [...locales];
  }

  const [defaultLocale] = locales;
  if (defaultLocale && !countries.has(defaultLocale.country)) {
    throw new Error(
      `The default locale (${defaultLocale.path}) sells to ${defaultLocale.country}, which no Shopify market includes.`,
    );
  }

  return locales.filter((locale) => {
    const isSellable = countries.has(locale.country);
    if (!isSellable) {
      console.warn(`No Shopify market sells to ${locale.country}; leaving out ${locale.path}.`);
    }
    return isSellable;
  });
}
