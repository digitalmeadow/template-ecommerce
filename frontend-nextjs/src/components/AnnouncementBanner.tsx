import type { AnnouncementBannerFragment } from "sanity-nextjs/generated/graphql";
import AnnouncementDismiss from "@/blocks/AnnouncementDismiss";
import PortableText from "@/fields/PortableText";
import { announcementDismissedScript } from "@/lib/announcement";

interface Props {
  announcementBanner: AnnouncementBannerFragment | null | undefined;
}

export default function AnnouncementBanner({ announcementBanner }: Props) {
  if (!announcementBanner?.enabled || !announcementBanner.textRaw) return null;

  const version = String(announcementBanner._updatedAt ?? "");

  return (
    <>
      <div
        className="announcement-banner relative z-11 flex items-center justify-center gap-4 bg-inverse-background px-[var(--margin)] py-2 text-center text-inverse-text [grid-area:1/1/2/2] [html[data-announcement-dismissed]_&]:hidden"
        data-announcement-banner
        data-version={version}
      >
        <PortableText value={announcementBanner.textRaw} />
        <AnnouncementDismiss version={version} />
      </div>
      <script dangerouslySetInnerHTML={{ __html: announcementDismissedScript(version) }} />
    </>
  );
}
