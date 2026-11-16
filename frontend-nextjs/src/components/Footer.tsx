import Link from "next/link";
import type { FooterFragment } from "sanity-nextjs/generated/graphql";
import LocaleSelector from "@/blocks/LocaleSelector";
import SanityLink from "@/fields/SanityLink";
import { localizeHref } from "@/lib/shopify/locale";
import { getRenderLocale } from "@/lib/shopify/renderLocale";
import { getShopPolicies } from "@/lib/shopify/shop";

interface Props {
  footer: FooterFragment | null | undefined;
}

export default async function Footer({ footer }: Props) {
  const locale = await getRenderLocale();
  const policies = await getShopPolicies(locale);

  return (
    <footer className="footer mt-[var(--section-space-lg)] flex flex-wrap items-center justify-between gap-x-[var(--gutter)] gap-y-3 g-page-margin py-5">
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {footer?.navigationItems?.map((navigationItem, index) => {
            if (!navigationItem?.link) return null;
            return (
              <li key={index}>
                <SanityLink link={navigationItem.link} className="g-text-link-hover">
                  {navigationItem.label}
                </SanityLink>
              </li>
            );
          })}
          {policies.map((policy) => (
            <li key={policy.handle}>
              <Link
                href={localizeHref(`/policies/${policy.handle}`, locale)}
                className="g-text-link-hover"
              >
                {policy.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <LocaleSelector />
    </footer>
  );
}
