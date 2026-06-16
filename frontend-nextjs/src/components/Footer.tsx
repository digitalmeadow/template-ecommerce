import type { FooterFragment } from "sanity-nextjs/generated/graphql";
import { sanityClient } from "sanity-nextjs/client.server";
import { footerQuery } from "sanity-nextjs/queries/footer";
import SanityLink from "@/fields/SanityLink";
import SanityMedia from "@/fields/SanityMedia";
import PortableText from "@/fields/PortableText";

interface Props {
  footerData?: FooterFragment | null;
}

export default async function Footer({ footerData }: Props) {
  const data =
    footerData ??
    (await sanityClient.request(footerQuery).then((r) => r.allFooter[0]));

  if (!data) return null;

  return (
    <>
      <footer>
        <div className="footer-content flex flex-col text-center">
          <PortableText value={data.textRaw} />

          <div className="nav flex flex-wrap gap-[var(--s8)]">
            {data.navigationItems?.map((navigationItem, index) => {
              if (!navigationItem?.link) return null;
              return (
                <SanityLink
                  key={index}
                  linkData={navigationItem.link}
                >
                  {navigationItem.label}
                </SanityLink>
              );
            })}
          </div>
        </div>
      </footer>

      <div className="footer-media w-full h-auto overflow-hidden flex justify-center">
        <div className="footer-media-inner w-[120%]">
          <SanityMedia mediaData={data.mediaBackground} layout="width" />
        </div>
      </div>
    </>
  );
}
