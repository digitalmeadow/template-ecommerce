import type { ReactNode } from "react";
import Link from "next/link";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { resolveSanityLink } from "@/lib/sanity/links";
import { anchorAttributes } from "@/lib/sanity/resolve";

interface Props {
  linkData: LinkFragment | null | undefined;
  className?: string;
  children: ReactNode;
}

export default async function SanityLink({
  linkData,
  className,
  children,
}: Props) {
  const link = await resolveSanityLink(linkData);
  if (!link) return children;

  const attributes = anchorAttributes(link);

  if (link.kind === "internal") {
    return (
      <Link href={link.href} className={className} {...attributes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className} {...attributes}>
      {children}
    </a>
  );
}
