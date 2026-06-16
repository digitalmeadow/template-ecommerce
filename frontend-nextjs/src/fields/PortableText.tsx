import Link from "next/link";
import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import { SANITY_DOCUMENT_ROUTE_PATTERNS } from "@/config";
import { cn } from "@/lib/utils";

interface Props {
  value: unknown;
  className?: string;
  style?: "default" | "large";
}

function computeLinkHref(linkData: LinkFragment): string | undefined {
  if (linkData.type === "section") return linkData.section ?? undefined;
  if (linkData.type === "url") return linkData.url ?? undefined;
  if (linkData.type === "email")
    return linkData.email ? `mailto:${linkData.email}` : undefined;
  if (linkData.type === "phone")
    return linkData.phone ? `tel:${linkData.phone}` : undefined;

  if (linkData.type === "page") {
    const page = linkData.page;
    if (!page?._type) return undefined;
    const pattern = SANITY_DOCUMENT_ROUTE_PATTERNS[page._type];
    if (!pattern) return undefined;

    let slug: string | undefined;
    if ("slug" in page && page.slug) slug = page.slug.current ?? undefined;
    else if ("shopify" in page && page.shopify?.handle)
      slug = page.shopify.handle.current ?? undefined;

    return slug
      ? pattern.replace("[slug]", slug)
      : pattern.replace("[slug]", "");
  }

  if (linkData.type === "file") {
    if (linkData.file?.asset?.url) return linkData.file.asset.url;
    return undefined;
  }

  return undefined;
}

function linkIsInternal(href: string): boolean {
  return (
    !href.startsWith("http") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:") &&
    !href.startsWith("#")
  );
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="portable-text-h1 mb-[0.5em] text-3xl leading-tight font-normal">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="portable-text-h2 mb-[0.5em] text-2xl leading-tight font-normal">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="portable-text-h3 mb-[0.5em] text-xl leading-snug font-normal">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="portable-text-h4 mb-[0.5em] text-lg leading-snug font-normal">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="portable-text-p mb-[0.5em] last:mb-0">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="portable-text-blockquote border-border border-l-2 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="portable-text-ul mb-[1em] list-disc pl-[2em]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="portable-text-ol mb-[1em] list-decimal pl-[2em]">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => (
    <li className="portable-text-li mb-[0.5em] last:mb-0">{children}</li>
  ),
  marks: {
    link: ({ children, value }) => {
      const linkData = value as unknown as LinkFragment;
      if (!linkData) return <span>{children}</span>;

      const href = computeLinkHref(linkData);
      if (!href) return <span>{children}</span>;

      const target =
        linkData.type === "url" && linkData.newTab ? "_blank" : undefined;
      const rel = target ? "noopener noreferrer" : undefined;

      if (linkIsInternal(href)) {
        return (
          <Link href={href} className="text-link" target={target} rel={rel}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} className="text-link" target={target} rel={rel}>
          {children}
        </a>
      );
    },
  },
};

export default function PortableText({
  value,
  className,
  style = "default",
}: Props) {
  if (!value) return null;

  return (
    <div className={cn("portable-text", style, className)}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
