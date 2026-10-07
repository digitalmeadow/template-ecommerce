import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import SanityLink from "@/fields/SanityLink";
import { cn } from "@/lib/utils";

interface Props {
  value: unknown;
  className?: string;
  style?: "default" | "large";
}

// Server-only: link marks resolve references through SanityLink.
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
    link: ({ children, value }) => (
      <SanityLink className="text-link" linkData={value as LinkFragment}>
        {children}
      </SanityLink>
    ),
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
