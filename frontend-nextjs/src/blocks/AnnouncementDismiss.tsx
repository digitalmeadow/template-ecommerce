"use client";

import { dismissAnnouncement } from "@/lib/announcement";

interface Props {
  version: string;
}

export default function AnnouncementDismiss({ version }: Props) {
  return (
    <button
      type="button"
      className="announcement-dismiss shrink-0"
      aria-label="Dismiss announcement"
      onClick={() => dismissAnnouncement(version)}
    >
      <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
        <path
          d="M2 2l12 12M14 2L2 14"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
