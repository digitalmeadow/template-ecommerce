"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
interface NavItem {
  label: string | null | undefined;
  href: string;
  target?: string;
  rel?: string;
  isInternal: boolean;
  isCollection: boolean;
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
      {navItems.map((item, index) => (
        <div
          key={index}
          className={
            item.isCollection ? "nav-item collection" : "nav-item"
          }
        >
          {item.isInternal ? (
            <Link
              href={item.href}
              className={`text-link ${underlineStyles[index % underlineStyles.length]}`}
              data-active={pathname === item.href ? "" : undefined}
              target={item.target}
              rel={item.rel}
            >
              {item.label}
            </Link>
          ) : (
            <a
              href={item.href}
              className={`text-link ${underlineStyles[index % underlineStyles.length]}`}
              data-active={pathname === item.href ? "" : undefined}
              target={item.target}
              rel={item.rel}
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
