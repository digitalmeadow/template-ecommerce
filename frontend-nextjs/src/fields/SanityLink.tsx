import type { ReactNode } from "react";
import Link from "next/link";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { resolveLinkHref } from "@/lib/sanity/links";

interface Props {
  linkData: LinkFragment | null | undefined;
  className?: string;
  children: ReactNode;
}

function resolveAnchorTarget(linkData: LinkFragment): string | undefined {
  if (linkData.type === "url" && linkData.newTab) return "_blank";
  if (linkData.type === "file" && linkData.newTab) return "_blank";
  return undefined;
}

function resolveAnchorRel(linkData: LinkFragment): string {
  if (linkData.type === "url" && linkData.newTab) return "noopener noreferrer";
  if (linkData.type === "file") return "noopener noreferrer";
  if (linkData.type === "email") return "noopener noreferrer";
  if (linkData.type === "phone") return "noopener noreferrer";
  return "";
}

function linkIsInternal(href: string | undefined): boolean {
  return !!(
    href &&
    !href.startsWith("http") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:") &&
    !href.startsWith("#")
  );
}

export default async function SanityLink({
  linkData,
  className,
  children,
}: Props) {
  if (!linkData) return children;

  const href = await resolveLinkHref(linkData);
  if (!href) return children;

  const target = resolveAnchorTarget(linkData);
  const rel = resolveAnchorRel(linkData);
  const download =
    linkData.type === "file"
      ? linkData.file?.asset?.originalFilename
      : undefined;

  if (linkIsInternal(href)) {
    return (
      <Link
        href={href}
        className={className}
        target={target}
        rel={rel}
        download={download}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      download={download}
    >
      {children}
    </a>
  );
}
