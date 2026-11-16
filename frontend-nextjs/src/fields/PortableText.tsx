import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import type { LinkFragment } from "sanity-nextjs/generated/graphql";
import SanityLink from "@/fields/SanityLink";
import { cn } from "@/lib/utils";

interface Props {
  value: unknown;
  className?: string;
}

// Server-only: link marks resolve references through SanityLink.
const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <SanityLink className="g-text-link" link={value as LinkFragment}>
        {children}
      </SanityLink>
    ),
  },
};

export default function PortableText({ value, className }: Props) {
  if (!value) return null;

  return (
    <div
      className={cn(
        "portable-text [&_li]:mb-[0.5em] [&_li]:pl-[2em] [&_li:last-child]:mb-0 [&_p]:mb-[0.5em] [&_p:last-child]:mb-0 [&_ul]:mb-[1em]",
        className,
      )}
    >
      {/* Codegen types Portable Text as `unknown`; Sanity's schema guarantees the shape. */}
      <PortableTextReact
        value={value as Parameters<typeof PortableTextReact>[0]["value"]}
        components={components}
      />
    </div>
  );
}
