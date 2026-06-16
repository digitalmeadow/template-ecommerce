"use client";

import { useState, useEffect } from "react";
import { shopifyClient } from "shopify/client";
import { localizationsQuery } from "shopify/queries/localization";
import type { AllLocalizationsQuery } from "shopify/generated/graphql";
import {
  LOCALE_CONFIG,
  isValidLocale,
  type LocaleCode,
} from "@/lib/shopify/locale";
import {
  getStoredLocale,
  LOCALE_STORAGE_KEY,
} from "@/lib/shopify/locale.client";

export default function LocaleSelector() {
  const [localeOptions, setLocaleOptions] = useState<
    { locale: LocaleCode; label: string }[]
  >([]);
  const [currentLocale, setCurrentLocale] = useState<LocaleCode | "">("");

  useEffect(() => {
    const storedLocale = getStoredLocale();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentLocale(storedLocale);

    let cancelled = false;

    shopifyClient
      .request<AllLocalizationsQuery>(localizationsQuery)
      .then(({ localization }) => {
        if (cancelled) return;
        const availableCountries = localization.availableCountries;

        const options = Object.entries(LOCALE_CONFIG)
          .filter(([, config]) =>
            availableCountries.some(
              (country) =>
                country.isoCode === config.country &&
                country.currency.isoCode === config.currency,
            ),
          )
          .map(([locale, config]) => ({
            locale: locale as LocaleCode,
            label: `${config.label} (${config.currency})`,
          }));

        setLocaleOptions(options);
      })
      .catch((error) => {
        console.error("Failed to fetch localizations:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    if (isValidLocale(newLocale)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      window.location.reload();
    }
  };

  if (localeOptions.length === 0) return null;

  return (
    <div data-current={currentLocale}>
      <select
        aria-label="Select market"
        value={currentLocale}
        onChange={handleChange}
      >
        {localeOptions.map((option) => (
          <option key={option.locale} value={option.locale}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
