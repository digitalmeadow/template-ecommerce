## Goal
Match Next.js visual rendering to Astro reference: font, resets, body sizing. Fix `localStorage.getItem is not a function` SSR error by splitting locale/cart modules.

## Plan:
1. `frontend-nextjs/src/styles/fonts.css` (NEW) — `@font-face` for BIZ UDMincho + CSS variables
2. `frontend-nextjs/src/styles/globals.css` — import `fonts.css`, add body font-family
3. `frontend-nextjs/src/app/layout.tsx` — remove `next/font/local`, keep classname without font variable
4. `frontend-nextjs/src/styles/reset.css` — port missing resets: span inline-flex, ul/ol reset, button/a/link, number spinners, select appearance, text-rendering, text-size-adjust
5. `frontend-nextjs/src/styles/text.css` — add `.text-body`, `body` font-size 14px/line-height 18px
6. `frontend-nextjs/src/lib/shopify/locale.ts` — keep pure constants/functions only (no localStorage)
7. `frontend-nextjs/src/lib/shopify/locale.client.ts` (NEW) — localStorage functions: getStoredLocale, getStoredCountryCode, getStoredCurrency
8. `frontend-nextjs/src/lib/shopify/cart.ts` — split: keep constants, make getStorageKey take explicit locale/currency args
9. `frontend-nextjs/src/lib/shopify/cart.client.ts` (NEW) — getCartStorageKey using locale client
10. `frontend-nextjs/src/stores/cart.ts` — import from *.client.ts, move storage key init into functions
11. `frontend-nextjs/src/blocks/PriceDisplay.tsx` — import from locale.client
12. `frontend-nextjs/src/blocks/LocaleSelector.tsx` — import from locale.client
13. `frontend-nextjs/src/components/cart/CartLineItem.tsx` — import from locale.client
14. `frontend-nextjs/src/sections/product/ProductPrice.tsx` — import from locale.client
15. `frontend-nextjs/src/lib/fetches/productShopifySanity.ts` — use explicit DEFAULT_LOCALE for getCountryCode
16. `frontend-nextjs/src/lib/fetches/collectionShopifySanity.ts` — same
