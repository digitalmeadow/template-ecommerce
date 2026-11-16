const formatters = new Map<string, Intl.NumberFormat>();

/** Same output on the server and in the browser, so client updates never reformat a price. */
export function formatMoney(amount: string | number, currencyCode: string, lang: string): string {
  const key = `${lang}:${currencyCode}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(lang, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "code",
    });
    formatters.set(key, formatter);
  }
  return formatter.format(Number(amount));
}
