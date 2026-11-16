"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string | null | undefined;
  href: string | undefined;
  isInternal: boolean;
  target?: string;
  rel?: string;
  download?: string;
}

interface Props {
  navigationItems: NavigationItem[];
  className?: string;
}

const underlineStyles = [
  "g-underline-orange",
  "g-underline-yellow",
  "g-underline-green",
  "g-underline-blue",
  "g-underline-purple",
];

// The header persists across navigations, so the active link follows the URL on the client.
export default function HeaderNav({ navigationItems, className }: Props) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {navigationItems.map(({ label, href, isInternal, ...attributes }, index) => {
        const Anchor = isInternal ? Link : "a";
        return (
          <div key={index} className="nav-item">
            {href === undefined ? (
              label
            ) : (
              <Anchor
                className={cn("g-text-link", underlineStyles[index % underlineStyles.length])}
                href={href}
                data-active={String(pathname === href)}
                {...attributes}
              >
                {label}
              </Anchor>
            )}
          </div>
        );
      })}
    </nav>
  );
}
