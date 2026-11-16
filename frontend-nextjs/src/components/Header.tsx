import Link from "next/link";
import type { HeaderFragment } from "sanity-nextjs/generated/graphql";
import LocaleSelector from "@/blocks/LocaleSelector";
import SearchForm from "@/blocks/SearchForm";
import CartButton from "@/components/cart/CartButton";
import HeaderNav from "@/components/HeaderNav";
import { resolveSanityLink } from "@/lib/sanity/links";
import { anchorAttributes } from "@/lib/sanity/resolve";
import { localizeHref } from "@/lib/shopify/locale";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { getCustomerAccountUrl } from "@/lib/shopify/shop";
import Logo from "@/svgs/Logo";

interface Props {
  header: HeaderFragment | null | undefined;
}

// One row height (a form control's), so search, links and cart line up.
const ROW_CLASS_NAME =
  "pointer-events-auto sticky top-[var(--margin)] flex min-h-10 items-center gap-4";

export default async function Header({ header }: Props) {
  const [locale, accountUrl] = await Promise.all([getRenderLocale(), getCustomerAccountUrl()]);

  const navigationItems = await Promise.all(
    (header?.navigationItems ?? []).flatMap((navigationItem) => {
      if (!navigationItem?.link) return [];
      return resolveSanityLink(navigationItem.link).then((link) => ({
        label: navigationItem.label,
        href: link ? localizeHref(link.href, locale) : undefined,
        isInternal: link?.kind === "internal",
        ...(link && anchorAttributes(link)),
      }));
    }),
  );

  return (
    <header className="header pointer-events-none relative z-10 grid h-full grid-cols-[1fr_auto_1fr] items-start g-page-margin pt-[var(--margin)] pb-[var(--section-space-lg)] mobile:grid-cols-[1fr_auto]">
      <div
        className="background fixed top-0 left-0 h-16 w-full bg-background mobile:h-10"
        data-header
      />

      {/* Phones search from /search and switch market from the footer. */}
      <div className={`tools ${ROW_CLASS_NAME} mobile:hidden`}>
        <SearchForm />
        <LocaleSelector />
      </div>

      <Link
        className="logo pointer-events-auto relative mb-6 aspect-[438/405] w-12 justify-self-center [grid-area:1/2/2/3] mobile:justify-self-start mobile:[grid-area:1/1/2/2]"
        href={localizeHref("/", locale)}
        aria-label="Home"
      >
        <Logo />
      </Link>

      <HeaderNav
        className={`${ROW_CLASS_NAME} mt-20 flex-wrap justify-self-center [grid-area:1/2/2/3] mobile:justify-self-start mobile:[grid-area:1/1/2/2]`}
        navigationItems={navigationItems}
      />

      <div className={`shop-links ${ROW_CLASS_NAME} justify-self-end mobile:[grid-area:1/2/2/3]`}>
        <Link className="search-link hidden mobile:inline" href={localizeHref("/search", locale)}>
          Search
        </Link>
        <a className="account-link" href={accountUrl}>
          Account
        </a>
        <CartButton />
      </div>
    </header>
  );
}
