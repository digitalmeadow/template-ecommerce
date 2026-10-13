import type { AnnouncementBannerFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import AnnouncementDismiss from "@/blocks/AnnouncementDismiss";
import { announcementDismissedScript } from "@/lib/announcement";

interface Props {
  announcementBannerData: AnnouncementBannerFragment | null | undefined;
}

export default function AnnouncementBanner({ announcementBannerData }: Props) {
  if (!announcementBannerData?.enabled || !announcementBannerData.textRaw) {
    return null;
  }

  const version = String(announcementBannerData._updatedAt ?? "");

  return (
    <>
      <div
        className="announcement-banner flex items-center justify-center gap-4 bg-foreground px-[var(--margin)] py-2 text-center text-background"
        data-announcement-banner
      >
        <PortableText value={announcementBannerData.textRaw} />
        <AnnouncementDismiss version={version} />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: announcementDismissedScript(version),
        }}
      />
    </>
  );
}
