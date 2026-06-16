import Link from "next/link";
import type { HeaderFragment } from "sanity-nextjs/generated/graphql";
import { sanityClient } from "sanity-nextjs/client.server";
import { headerQuery } from "sanity-nextjs/queries/header";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { resolveLinkHref } from "@/lib/sanity/links";
import LocaleSelector from "@/blocks/LocaleSelector";
import CartButton from "@/components/cart/CartButton";
import HeaderNav from "@/components/HeaderNav";

interface Props {
  headerData?: HeaderFragment | null;
}

function linkIsInternal(href: string): boolean {
  return !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !href.startsWith("#");
}

function resolveAnchorTarget(linkData: LinkFragment): string | undefined {
  if (linkData.type === "url" && linkData.newTab) return "_blank";
  if (linkData.type === "file" && linkData.newTab) return "_blank";
  return undefined;
}

function resolveAnchorRel(linkData: LinkFragment): string | undefined {
  if (linkData.type === "url" && linkData.newTab) return "noopener noreferrer";
  if (linkData.type === "file") return "noopener noreferrer";
  if (linkData.type === "email") return "noopener noreferrer";
  if (linkData.type === "phone") return "noopener noreferrer";
  return undefined;
}

export default async function Header({ headerData }: Props) {
  const data =
    headerData ??
    (await sanityClient.request(headerQuery).then((r) => r.allHeader[0]));

  if (!data) return null;

  const navItems = await Promise.all(
    (data.navigationItems ?? []).map(async (item) => {
      if (!item?.link) return null;
      const href = (await resolveLinkHref(item.link)) ?? "";
      const target = resolveAnchorTarget(item.link);
      const rel = resolveAnchorRel(item.link);
      const internal = linkIsInternal(href);
      const isCollection =
        item.link.type === "page" &&
        item.link.page?._type === "collection";

      return {
        label: item.label,
        href,
        target,
        rel,
        isInternal: internal,
        isCollection,
      };
    }),
  );

  const filteredNavItems = navItems.filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <header>
      <div className="header-background" />

      <div className="header-locale">
        <LocaleSelector />
      </div>

      <Link className="header-logo" href="/" aria-label="Home">
        <svg viewBox="0 0 438 405" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M277.42 398.529C237.879 386.066 211.995 320.312 211.995 320.312C211.995 320.312 143.467 355.82 99.8234 345.341C33.5074 329.417 -2.30394 269.848 0.11504 201.428C2.01053 147.815 17.5732 98.2409 68.6645 82.5436C104.263 71.6063 162.141 101.315 162.141 101.315C162.141 101.315 154.512 65.616 162.141 45.0011C178.511 0.763491 227.473 -2.71054 274.313 1.20161C341.217 6.78956 403.563 52.8374 398.948 120.086C396.478 156.079 355.326 201.428 355.326 201.428C355.326 201.428 414.945 219.701 430.107 251.485C451.394 296.108 426.707 340.926 389.61 373.494C357.145 401.995 318.564 411.498 277.42 398.529Z"
            fill="currentColor" />
        </svg>
      </Link>

      <HeaderNav navItems={filteredNavItems} />

      <div className="header-cart">
        <CartButton />
      </div>
    </header>
  );
}
