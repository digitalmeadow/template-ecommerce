"use client";

import type { ChangeEvent } from "react";
import { isValidLocale, type LocaleCode } from "@/lib/shopify/locale";
import { getStoredLocale, setStoredLocale } from "@/lib/shopify/locale.client";
import { useBrowserValue } from "@/lib/useBrowserValue";

interface Props {
  localeOptions: { locale: LocaleCode; label: string }[];
}

export default function LocaleSelector({ localeOptions }: Props) {
  const currentLocale = useBrowserValue<LocaleCode | "">(getStoredLocale, "");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    if (isValidLocale(newLocale)) {
      setStoredLocale(newLocale);
      window.location.reload();
    }
  };

  if (localeOptions.length === 0) return null;

  return (
    <div data-current={currentLocale}>
      <select aria-label="Select market" value={currentLocale} onChange={handleChange}>
        {localeOptions.map((option) => (
          <option key={option.locale} value={option.locale}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
