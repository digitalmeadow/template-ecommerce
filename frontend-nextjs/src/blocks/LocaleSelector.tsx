"use client";

import { useState, useEffect } from "react";
import { isValidLocale, type LocaleCode } from "@/lib/shopify/locale";
import {
  getStoredLocale,
  LOCALE_STORAGE_KEY,
} from "@/lib/shopify/locale.client";

interface Props {
  localeOptions: { locale: LocaleCode; label: string }[];
}

export default function LocaleSelector({ localeOptions }: Props) {
  const [currentLocale, setCurrentLocale] = useState<LocaleCode | "">("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentLocale(getStoredLocale());
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
