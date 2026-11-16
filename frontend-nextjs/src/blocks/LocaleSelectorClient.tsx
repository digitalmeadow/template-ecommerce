"use client";

import type { ChangeEvent } from "react";
import { getLocale, switchLocale } from "@/lib/shopify/locale";

interface Props {
  localeOptions: { path: string; label: string }[];
  currentPath: string;
}

export default function LocaleSelectorClient({ localeOptions, currentPath }: Props) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switchLocale(getLocale(event.target.value));
  };

  return (
    <select aria-label="Select market" defaultValue={currentPath} onChange={handleChange}>
      {localeOptions.map((option) => (
        <option key={option.path} value={option.path}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
