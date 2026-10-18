import Link from "next/link";
import type { HeaderFragment } from "sanity-nextjs/generated/graphql";
import { resolveSanityLink } from "@/lib/sanity/links";
import { anchorAttributes } from "@/lib/sanity/resolve";
import { getLocalization } from "@/lib/shopify/localization";
import { LOCALE_CONFIG, type LocaleCode } from "@/lib/shopify/locale";
import LocaleSelector from "@/blocks/LocaleSelector";
import CartButton from "@/components/cart/CartButton";
import HeaderNav from "@/components/HeaderNav";
import Logo from "@/svgs/Logo";

interface Props {
  headerData: HeaderFragment | null | undefined;
}

async function getLocaleOptions() {
  try {
    const { availableCountries } = await getLocalization();
    return Object.entries(LOCALE_CONFIG)
      .filter(([, config]) =>
        availableCountries.some(
          (country) =>
            country.isoCode === config.country && country.currency.isoCode === config.currency,
        ),
      )
      .map(([locale, config]) => ({
        locale: locale as LocaleCode,
        label: `${config.label} (${config.currency})`,
      }));
  } catch (error) {
    console.error("Failed to fetch localizations:", error);
    return [];
  }
}

export default async function Header({ headerData }: Props) {
  if (!headerData) return null;

  const localeOptions = await getLocaleOptions();

  const navItems = await Promise.all(
    (headerData.navigationItems ?? []).map(async (item) => {
      if (!item?.link) return null;
      const link = await resolveSanityLink(item.link);

      return {
        label: item.label,
        href: link?.href,
        ...(link && anchorAttributes(link)),
        isInternal: link?.kind === "internal",
      };
    }),
  );

  const filteredNavItems = navItems.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  return (
    <header className="header">
      <div className="header-background" />

      <div className="header-locale">
        <LocaleSelector localeOptions={localeOptions} />
      </div>

      <Link className="header-logo" href="/" aria-label="Home">
        <Logo />
      </Link>

      <HeaderNav navItems={filteredNavItems} />

      <div className="header-cart">
        <CartButton />
      </div>
    </header>
  );
}
