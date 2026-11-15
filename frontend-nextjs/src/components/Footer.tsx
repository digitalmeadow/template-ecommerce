import type { FooterFragment } from "sanity-nextjs/generated/graphql";
import SanityLink from "@/fields/SanityLink";

interface Props {
  footerData: FooterFragment | null | undefined;
}

export default function Footer({ footerData }: Props) {
  if (!footerData) return null;

  return (
    <>
      <footer className="footer">
        <div className="footer-content flex flex-col text-center">
          <div className="nav flex flex-wrap gap-[var(--s8)]">
            {footerData.navigationItems?.map((navigationItem, index) => {
              if (!navigationItem?.link) return null;
              return (
                <SanityLink key={index} linkData={navigationItem.link}>
                  {navigationItem.label}
                </SanityLink>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}
