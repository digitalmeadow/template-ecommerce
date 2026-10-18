"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string | null | undefined;
  href: string | undefined;
  target?: string;
  rel?: string;
  download?: string;
  isInternal: boolean;
}

interface Props {
  navItems: NavItem[];
}

const underlineStyles = [
  "underline-color-orange",
  "underline-color-yellow",
  "underline-color-green",
  "underline-color-blue",
  "underline-color-purple",
];

export default function HeaderNav({ navItems }: Props) {
  const pathname = usePathname();

  return (
    <nav className="header-nav">
      {navItems.map((item, index) => {
        const linkClassName = `text-link ${underlineStyles[index % underlineStyles.length]}`;
        return (
          <div key={index} className="nav-item">
            {item.href === undefined ? (
              <span className={linkClassName}>{item.label}</span>
            ) : item.isInternal ? (
              <Link
                href={item.href}
                className={linkClassName}
                data-active={pathname === item.href ? "" : undefined}
                target={item.target}
                rel={item.rel}
                download={item.download}
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                className={linkClassName}
                data-active={pathname === item.href ? "" : undefined}
                target={item.target}
                rel={item.rel}
                download={item.download}
              >
                {item.label}
              </a>
            )}
          </div>
        );
      })}
    </nav>
  );
}
