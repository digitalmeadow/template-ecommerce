import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { resolveSanityLink } from "@/lib/sanity/links";
import { anchorAttributes } from "@/lib/sanity/resolve";
import { localizeHref } from "@/lib/shopify/locale";
import { getRenderLocale } from "@/lib/shopify/renderLocale";

interface Props {
  link: LinkFragment | null | undefined;
  className?: string;
  children: ReactNode;
}

export default async function SanityLink({ link, className, children }: Props) {
  const resolvedLink = await resolveSanityLink(link);
  if (!resolvedLink) return children;

  const href = localizeHref(resolvedLink.href, await getRenderLocale());
  const attributes = anchorAttributes(resolvedLink);

  if (resolvedLink.kind === "internal") {
    return (
      <Link href={href} className={className} {...attributes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...attributes}>
      {children}
    </a>
  );
}
